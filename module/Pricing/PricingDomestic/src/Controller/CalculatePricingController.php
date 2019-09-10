<?php
namespace PricingDomestic\Controller;

use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
use Core\Controller\CoreController;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Management\Entity\FieldVas;
use PricingDomestic\Entity\DomesticAreaCity;
use PricingDomestic\Entity\DomesticPricingData;
use PricingDomestic\Entity\DomesticPricingVas;
use PricingDomestic\Entity\DomesticPricingVasSpec;
use PricingDomestic\Entity\DomesticRangeWeight;
use PricingDomestic\Service\DomesticPricingManager;
use PricingDomestic\Form\PricingForm;
use PricingDomestic\Entity\DomesticPricing;
use PricingSpecial\Entity\SpecialPricing;
use PricingSpecial\Entity\SpecialPricingData;
use PricingSpecial\Entity\SpecialRangeWeight;
use PricingSpecial\Entity\SpecialZone;
use ServiceShipment\Entity\ShipmentType;

class CalculatePricingController extends CoreController {

    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    protected $noi_tinh = 5;
    protected $noi_mien = 6;
    protected $lien_mien = 8;
    protected $lien_mien_db = 7;

    /*
     * 15 => Đà Nẵng
     * 24 => Hà Nội
     * 29 => Hồ Chí Minh
     */
    protected $city_db = [15, 24, 29];

    // Check shipment id V2
    protected $shipmentType = [
        // Non Dox
        'd0ee2e12-87da-536c-0014-5cf5fa5fe86e' => 35, '9b4247a7-bb65-dbd5-5322-5ce9e8b6b0bd' => 35,
        '70e9c16a-a37b-6619-47c4-5cf5fae8524e' => 36, '8a46755c-6aae-31e4-18bc-5ce9e34c1e56' => 36,
        '8d80fd7b-0430-cb11-8e5f-5ce9e8aff4a9' => 37, '8dde0ffb-3587-6056-fb3e-5cf5fb98c335' => 37,
        '88110327-4529-d804-bf6c-5ce9e81c0c66' => 38, '5695b752-5849-8193-86d8-5cf5fb64eaeb' => 38,
        '14046694-8fe2-547b-9983-5ce9e872df65' => 39, 'be621fa0-cd57-7bc4-0e60-5cf5fb03e541' => 39,
        // Dox
        '2f1e5bcf-b95b-cc97-8d5c-5d02015173ab' => 35, '1de8a746-64bc-58e4-4f42-5d02014ca4d8' => 35,
        '1db8e6f6-609e-80d4-f03f-5d02022fba5e' => 36, 'b185f87b-f35f-51f1-89d2-5d020282c2af' => 36,
        'eaa559bb-4953-5f6b-1c94-5d0201febfa0' => 37, '15c4126c-85f1-151b-66ea-5d0201a2d2c7' => 37,
        '587dafbf-4c7d-9930-a22e-5d0201eeb0b5' => 38, 'e28dc049-3dff-7fba-e006-5d020105d1dd' => 38,
        '55d4b595-9171-9bc9-73b5-5d020107f360' => 39, '512e2203-caa3-2b4a-49f8-5d0201dab178' => 39,
    ];

    public function __construct($entityManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
    }

    public function getPricingOldAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            if (array_key_exists($data['shipmentType'], $this->shipmentType)) {
                $data['shipmentType'] = $this->shipmentType[$data['shipmentType']];
                $result = $this->calculatePricingFromV1($data);
            } else {
                $result = ['error' => true, 'message' => 'Shipment Type is wrong'];
            }

            $this->apiResponse['data'] = $result;
        }
        return $this->createResponse();;
    }

    public function getMultiPricingOldAction() {
        if ($this->getRequest()->isPost()) {
            $params = $this->getRequestData();
            $data = array();
            if (count($params) > 0) {
                for($i = 0; $i < count($params); $i++) {
                    if (array_key_exists($params[$i]['shipmentType'], $this->shipmentType)) {
                        $params[$i]['shipmentType'] = $this->shipmentType[$params[$i]['shipmentType']];
                        $result = $this->calculatePricingFromV1($params[$i]);
                    } else {
                        $result = ['error' => true, 'message' => 'Shipment Type is wrong'];
                    }

                    $data[] = array_merge($params[$i], $result);
                }
            }
            $this->apiResponse['data'] = $data;
        }
        return $this->createResponse();
    }

    public function getMassPricingAction()
    {
        if ($this->getRequest()->isPost()) {
            $params = $this->getRequestData();
            $data = array();
            if (count($params) > 0) {
                foreach ($params as $key => $shipment) {
                    if (array_key_exists($shipment['shipmentType'], $this->shipmentType)) {
                        $shipment['shipmentType'] = $this->shipmentType[$shipment['shipmentType']];
                        $result = $this->calculatePricingFromV1($shipment);
                    } else {
                        $result = ['error' => true, 'message' => 'Shipment Type is wrong'];
                    }
                    $data[$key] = array_merge($shipment, $result);
                }
            }
            $this->apiResponse['data'] = $data;
        }
        return $this->createResponse();
    }

    private function calculatePricingFromV1($dataList)
    {
        // Init
        $volWeight = 0;
        $conWeight = $dataList['weight'];
        $pickupDate = !empty($dataList['pickupDate']) ? $dataList['pickupDate'] : date('Y-m-d H:i:s');

        // Get Shipment Info
        $shipmentType = $this->getShipmentType($dataList['shipmentType']);
        if (empty($shipmentType))
            return ['error' => true, 'message' => 'Pricing not found'];

        if (!empty($dataList['weight']) && !empty($dataList['length']) && !empty($dataList['height']) && !empty($dataList['width'])) {
            $volWeight = ($dataList['width'] * $dataList['length'] * $dataList['height']) / $shipmentType->getVolumetricNumber();
            $conWeight = $dataList['weight'];
        }
        if ($volWeight > $dataList['weight']) {
            $dataList['weight'] = $volWeight;
            $conWeight = $volWeight;
        }

        /* Get Pricing Info */
        $pricing = $this->getPricingInfo($shipmentType, $dataList['customerId'], $pickupDate);
        if (empty($pricing))
            return ['error' => true, 'message' => 'Pricing not found'];

        /* Get Area Info */
        if (empty($dataList['pickupCity']) || empty($dataList['deliveryCity']))
            return ['error' => true, 'message' => 'Address incorrect'];

        /**
         * is_private == 0 => Public normal pricing
         * is_private == 1 => Private normal pricing
         * is_private == 2 => Special pricing
         */
        if ($pricing['is_private'] === 2) {
            $areaType = $this->getAreaSpecial($dataList['pickupCity'], $dataList['deliveryCity'], $dataList['deliveryDistrict'], $dataList['deliveryWard']);
            $where = $dataList['weight'];

            // Pricing Over
            $pricingOver = $this->getOverSpecialRangeWeight($shipmentType, $pricing, $areaType, $where);
            if (!empty($pricingOver['info'])) {
                $where = $pricingOver['info']['from'];
            }

            // Pricing Normal
            $pricingNormal = $this->getNormalSpecialRangeWeight($shipmentType, $pricing, $areaType, $where);
        } else {
            $areaType = $this->getAreaStandard($dataList['pickupCity'], $dataList['deliveryCity']);

            /* Get Range Weight info and data */
            $where = [ 'weight' => $dataList['weight'], 'is_ras' => $dataList['deliveryRas'] ];

            // Pricing Over
            $pricingOver = $this->getOverRangeWeight($shipmentType, $pricing, $areaType, $where);
            if (!empty($pricingOver['info'])) {
                $where['weight'] = $pricingOver['info']['from'];
            }

            // Pricing Normal
            $pricingNormal = $this->getNormalRangeWeight($shipmentType, $pricing, $areaType, $where);
        }


        if (empty($pricingNormal['info']))
            return ['error' => true, 'message' => "Range weight not found"];
        if (empty($pricingNormal['data']))
            return ['error' => true, 'message' => 'Pricing incorrect'];

        /* Calculate Price */
        $where = [
            'weight' => $dataList['weight'],
            'pickupRas' => $dataList['pickupRas'],
            'totalRas' => $pricing['total_ras'],
            'conWeight' => $conWeight,
            'volWeight' => $volWeight,
            'isPrivate' => $pricing['is_private'],
        ];
        $result = $this->calculatePrice($pricingOver, $pricingNormal, $where);
        return $result;
    }

    private function getShipmentType($shipmentType)
    {
        $where = [
            'is_deleted' => 0,
            'status' => 1,
            'id' => $shipmentType,
        ];
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->findOneBy($where);
        return $shipmentType;
    }

    private function getAreaStandard($pickupCity, $deliveryCity)
    {
        $where = [
            'is_deleted' => 0,
            'status' => 1,
            'name' => $pickupCity,
        ];
        $pickupCity = $this->entityManager->getRepository(City::class)->findOneBy($where);

        $where['name'] = $deliveryCity;
        $deliveryCity = $this->entityManager->getRepository(City::class)->findOneBy($where);

        // Check Area Type shipment
        if ($pickupCity->getId() === $deliveryCity->getId()) {
            $areaType = $this->noi_tinh;
        } elseif (in_array($pickupCity->getId(), $this->city_db) && in_array($deliveryCity->getId(), $this->city_db)) {
            $areaType = $this->lien_mien_db;
        } else {
            $pickupArea = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy([
                'is_deleted' => 0,
                'city_id' => $pickupCity->getId(),
            ]);
            $deliveryArea = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy([
                'is_deleted' => 0,
                'city_id' => $deliveryCity->getId(),
            ]);
            if ($pickupArea->getDomesticAreaId() === $deliveryArea->getDomesticAreaId()) {
                $areaType = $this->noi_mien;
            } else {
                $areaType = $this->lien_mien;
            }
        }

        return $areaType;
    }

    private function getPricingInfo($shipmentType, $customerId, $pickupDate)
    {
        $carrierId = $shipmentType->getCarrier()->getId();
        $serviceId = $shipmentType->getService()->getId();
        $categoryId = $shipmentType->getCategory()->getId();
        $wherePrice = [
            'carrier_id' => $carrierId,
            'category_id' => $categoryId,
            'service_id' => $serviceId,
            'today' => $pickupDate,
        ];

        // Check customer status
        if (!empty($customerId)) {
            $customer = $this->entityManager->getRepository(Customer::class)->findOneBy([
                'ref_id' => $customerId,
                'status' => 1,
                'is_deleted' => 0
            ]);
            if (!empty($customer)) {
                $wherePricePrivate = $wherePrice;
                $wherePricePrivate['customer_id'] = $customer->getId();
                $pricing = $this->entityManager->getRepository(SpecialPricing::class)->getPriceId($wherePricePrivate);
                if (empty($pricing)) {
                    $pricing = $this->entityManager->getRepository(DomesticPricing::class)->getPriceId($wherePricePrivate);
                    if (!empty($pricing)) {
                        $pricing['customer_id'] = $customer->getId();
                    }
                } else {
                    $pricing['is_private'] = 2;
                    $pricing['customer_id'] = $customer->getId();
                }
            }
        }

        // Get Pricing Public if private unavailable
        if (empty($pricing)) {
            $pricing = $this->entityManager->getRepository(DomesticPricing::class)->getPriceId($wherePrice);
            $pricing['customer_id'] = null;
        }
        return $pricing;
    }

    private function getOverRangeWeight($shipmentType, $pricing, $areaType, $where)
    {
        // Get Range Weight info
        $whereRange = [
            'weight' => $where['weight'],
            'carrier_id' => $shipmentType->getCarrier()->getId(),
            'category_id' => $shipmentType->getCategory()->getId(),
            'service_id' => $shipmentType->getService()->getId(),
            'zone_id' => $areaType,
            'shipment_type_id' => $shipmentType->getId(),
            'is_ras' => $where['is_ras']
        ];
        if ($pricing['is_private'] === 1) {
            $whereRange['customer_id'] = $pricing['customer_id'];
        }

        // Price Over
        $priceOver = $this->entityManager->getRepository(DomesticRangeWeight::class)->getRangeWeightOver($whereRange);
        $priceDataOver = [];
        if (!empty($priceOver)) {
            $priceDataOver = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy([
                'is_deleted' => 0,
                'domestic_pricing' => $pricing['id'],
                'domestic_range_weight' => $priceOver['id'],
            ]);
        }
        return ['info' => $priceOver, 'data' => $priceDataOver];
    }

    private function getNormalRangeWeight($shipmentType, $pricing, $areaType, $where)
    {
        // Get Range Weight info
        $whereRange = [
            'weight' => $where['weight'],
            'carrier_id' => $shipmentType->getCarrier()->getId(),
            'category_id' => $shipmentType->getCategory()->getId(),
            'service_id' => $shipmentType->getService()->getId(),
            'zone_id' => $areaType,
            'shipment_type_id' => $shipmentType->getId(),
            'is_ras' => $where['is_ras']
        ];
        if ($pricing['is_private'] === 1) {
            $whereRange['customer_id'] = $pricing['customer_id'];
        }

        // Price Normal
        $priceNormal = $this->entityManager->getRepository(DomesticRangeWeight::class)->getRangeWeightNormal($whereRange);
        $priceDataNormal = [];
        if (!empty($priceNormal)) {
            $priceDataNormal = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy([
                'is_deleted' => 0,
                'domestic_pricing' => $pricing['id'],
                'domestic_range_weight' => $priceNormal['id']
            ]);
        }
        return ['info' => $priceNormal, 'data' => $priceDataNormal];
    }

    private function calculatePrice($pricingOver, $pricingNormal, $param)
    {
        $priceOver = $pricingOver['info'];
        $priceDataOver = $pricingOver['data'];

        $priceNormal = $pricingNormal['info'];
        $priceDataNormal = $pricingNormal['data'];

        // Case Over
        $feeOver = 0;
        var_dump($priceOver);
        if (!empty($priceDataOver)) {
            $weightOver = $param['weight'] - $priceOver['from'];
            $param['weight'] = $priceOver['from'];
            if ($priceOver['calculate_unit'] === 1) {
                if ($priceOver['round_up'] > 0) {
                    $whole = floor($weightOver);
                    $fraction = $weightOver - $whole;
                    if ($fraction > 0) {
                        if ($fraction <= $priceOver['round_up']) {
                            $weightOver = $whole + $priceOver['round_up'];
                        } else {
                            $weightOver = $whole + 1;
                        }
                    }
                }
                $feeOver = ($weightOver / $priceOver['unit']) * $priceDataOver->getValue();
            } else {
                $feeOver = $priceDataOver->getValue();
            }
        }

        // Case Normal
        if ($priceNormal['calculate_unit'] === 1) {
            if ($priceNormal['round_up'] > 0) {
                $whole = floor($param['weight']);
                $fraction = $param['weight'] - $whole;
                if ($fraction > 0) {
                    if ($fraction <= $priceNormal['round_up']) {
                        $param['weight'] = $whole + $priceNormal['round_up'];
                    } else {
                        $param['weight'] = $whole + 1;
                    }
                }
            }
            $feeNormal = ($param['weight'] / $priceNormal['unit']) * $priceDataNormal->getValue();
        } else {
            $feeNormal = $priceDataNormal->getValue();
        }

        // Type and Value bill Return
        if ($param['isPrivate'] === 2) {
            if (!empty($priceDataOver)) {
                $typeBill = $priceDataOver->getReturnType();
                $typeValue = $priceDataOver->getReturnValue();
            } else {
                $typeBill = $priceDataNormal->getReturnType();
                $typeValue = $priceDataNormal->getReturnValue();
            }
        } else {
            if (!empty($priceDataOver)) {
                $typeBill = $priceDataOver->getType();
                $typeValue = $priceDataOver->getTypeValue();
            } else {
                $typeBill = $priceDataNormal->getType();
                $typeValue = $priceDataNormal->getTypeValue();
            }
        }


        // Pick RAS
        if ($param['pickupRas'] == 1) {
            $feePickUp = $param['totalRas'];
        } else {
            $feePickUp = 0;
        }

        $feeService = $feePickUp + $feeOver + $feeNormal;
        $total = $feeService * 1.1;

        return [
            'error' => false,
            'message' => '',
            'total' => $total,
            'fee_service' => $feeService,
            'fee_over' => $feeOver,
            'fee_normal' => $feeNormal,
            'fee_pickup_ras' => $feePickUp,
            'type_bill' => $typeBill,
            'type_value' => $typeValue,
            'con_weight' => $param['conWeight'],
            'vol_weight' => $param['volWeight'],
        ];
    }

    /* Special Pricing */
    private function getAreaSpecial($pickupCity, $deliveryCity, $deliveryDistrict, $deliveryWard)
    {
        $where = [ 'is_deleted' => 0,  'status' => 1, 'name' => $pickupCity ];
        $pickupCity = $this->entityManager->getRepository(City::class)->findOneBy($where);

        $where['name'] = $deliveryCity;
        $deliveryCity = $this->entityManager->getRepository(City::class)->findOneBy($where);

        $where['name'] = $deliveryDistrict;
        $deliveryDistrict = $this->entityManager->getRepository(District::class)->findOneBy($where);

        $where['name'] = $deliveryWard;
        $deliveryWard = $this->entityManager->getRepository(Ward::class)->findOneBy($where);

        // Check Area Type shipment
        $zone = $this->entityManager->getRepository(SpecialZone::class)->findOneBy([
            'is_deleted' => 0,
            'from_city' => $pickupCity->getId(),
            'to_city' => $deliveryCity->getId(),
            'to_district' => $deliveryDistrict->getId(),
            'to_ward' => $deliveryWard->getId(),
        ]);

        return $zone->getSpecialArea()->getId();
    }

    private function getOverSpecialRangeWeight($shipmentType, $pricing, $areaType, $weight)
    {
        // Get Range Weight info
        $whereRange = [
            'weight' => $weight,
            'carrier_id' => $shipmentType->getCarrier()->getId(),
            'category_id' => $shipmentType->getCategory()->getId(),
            'service_id' => $shipmentType->getService()->getId(),
            'special_area_id' => $areaType,
            'shipment_type_id' => $shipmentType->getId(),
            'customer_id' => $pricing['customer_id'],
        ];

        // Price Over
        $priceOver = $this->entityManager->getRepository(SpecialRangeWeight::class)->getRangeWeightOver($whereRange);
        $priceDataOver = null;
        if (!empty($priceOver)) {
            $priceDataOver = $this->entityManager->getRepository(SpecialPricingData::class)->findOneBy([
                'is_deleted' => 0,
                'special_pricing' => $pricing['id'],
                'special_range_weight' => $priceOver['id'],
            ]);
        }
        return ['info' => $priceOver, 'data' => $priceDataOver];
    }

    private function getNormalSpecialRangeWeight($shipmentType, $pricing, $areaType, $weight)
    {
        // Get Range Weight info
        $whereRange = [
            'weight' => $weight,
            'carrier_id' => $shipmentType->getCarrier()->getId(),
            'category_id' => $shipmentType->getCategory()->getId(),
            'service_id' => $shipmentType->getService()->getId(),
            'special_area_id' => $areaType,
            'shipment_type_id' => $shipmentType->getId(),
            'customer_id' => $pricing['customer_id'],
        ];

        // Price Normal
        $priceNormal = $this->entityManager->getRepository(SpecialRangeWeight::class)->getRangeWeightNormal($whereRange);
        $priceDataNormal = null;
        if (!empty($priceNormal)) {
            $priceDataNormal = $this->entityManager->getRepository(SpecialPricingData::class)->findOneBy([
                'is_deleted' => 0,
                'special_pricing' => $pricing['id'],
                'special_range_weight' => $priceNormal['id']
            ]);
        }
        return ['info' => $priceNormal, 'data' => $priceDataNormal];
    }
}