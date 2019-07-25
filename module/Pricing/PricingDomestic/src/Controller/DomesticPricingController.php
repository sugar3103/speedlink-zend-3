<?php
namespace PricingDomestic\Controller;

use Address\Entity\City;
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
use ServiceShipment\Entity\ShipmentType;

class DomesticPricingController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;

        /**
         * Customer Manager.
         * @var DomesticPricingManager
         */
        protected $domesticPricingManager;

        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticPricingManager
         */

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

    protected $customerId = [
        '7fd8ca33-79f5-bb42-af80-5d084da574af' => 12, // Shop phong thuy
        '2b29a565-8bf0-9ba2-2f43-58353d35278c' => 18, // ICT Accounts
        '98af7ad0-8a56-1bdb-5e3f-5bff710c6291' => 24, // Hoongvan Clothings
        'ace03c12-c387-5cdb-8845-5d1420f9b606' => 30, // Xưởng Gỗ Thanh Tâm
        '64b30e46-6f2d-e981-c14c-5d1ecd99472f' => 40, // ĐỒNG HỒ 888
        '5c356bc9-7744-b578-968d-5d233fc9fa6a' => 44, // Hàng Thùng RUBI
        '2480a95a-61b3-9f4a-9568-5d283a10bc31' => 48, // CÔNG TY CỔ PHẦN PROSHIP
        'b95865ab-cfcf-ea27-3b1c-5d367a0bef92' => 56, // Chisu Shop
        '6dec4604-86e8-9587-a0c3-5d3694734c4f' => 64, // RIO BOOK
        '98bf3ae9-d545-4ed3-9cd3-5d2ea3723d28' => 68, // TỔNG KHO QUẢNG CHÂU MAI HỨA
    ];

    public function __construct($entityManager, $domesticPricingManager) {
        parent::__construct($entityManager);

        $this->entityManager = $entityManager;
        $this->domesticPricingManager = $domesticPricingManager;
    }

    public function indexAction()
    {

        if ($this->getRequest()->isPost()) {

            $fieldsMap = [
                'id','name','carrier_id','is_private',
                'category_id', 'service_id','effected_date',
                'expired_date','saleman_id',
                'customer_id','status','approval_status','approved_by'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);

            //get list User by condition
            $dataPricings = $this->domesticPricingManager->getListDomesticPricingByCondition($start, $limit, $sortField, $sortDirection,$filters);
            $result = $this->filterByField($dataPricings['listPricing'], $fields);

            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataPricings['totalPricing']
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;

            //Create New Form Domestic Pricing
            $form = new PricingForm('create', $this->entityManager);

            $form->setData($this->getRequestData());
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Domestic Pricing.
                $pricing = $this->domesticPricingManager->addPricing($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_DOMESTIC_PRICING";
                $this->apiResponse['data'] = ['pricing_id' => $pricing->getId()];
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages();
            }
        }
        return $this->createResponse();
    }

    public function editAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            if(isset($data['id'])) {
                // Find existing Domestic Pricing in the database.
                $pricing = $this->entityManager->getRepository(DomesticPricing::class)->find($data['id']);
                if ($pricing) {
                    //Create Form Pricing
                    $form = new PricingForm('update', $this->entityManager, $pricing);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Domestic Pricing.
                        $this->domesticPricingManager->updatePricing($pricing, $data,$user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_DOMESTIC_PRICING";
                        $this->apiResponse['data'] = ['pricing_id' => $pricing->getId()];
                    } else {
                        $this->error_code = 0;
                        $this->apiResponse['data'] = $form->getMessages();
                    }
                } else {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "NOT_FOUND";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_PRICING_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $user = $this->tokenPayload;
            if(isset($data['ids']) && count($data['ids']) > 0) {

                try {
                    foreach ($data['ids'] as $id) {
                        $pricing = $this->entityManager->getRepository(DomesticPricing::class)->find($id);
                        if ($pricing == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";
                        } else {
                            $this->domesticPricingManager->deletePricing($pricing, $user);
                        }
                    }

                    $this->apiResponse['message'] = "DELETE_SUCCESS_DOMESTIC_PRICING";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "DOMESTIC_PRICING_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_PRICING_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    #region Ecos v1 calculate
    public function getPricingOldAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            if (isset($data['customerId']) && array_key_exists($data['customerId'], $this->customerId)) {
                $data['customerId'] = $this->customerId[$data['customerId']];
            } else {
                $data['customerId'] = '';
            }
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
                    if (isset($params[$i]['customerId']) && array_key_exists($params[$i]['customerId'], $this->customerId)) {
                        $params[$i]['customerId'] = $this->customerId[$params[$i]['customerId']];
                    } else {
                        $params[$i]['customerId'] = '';
                    }
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
                    if (isset($shipment['customerId']) && array_key_exists($shipment['customerId'], $this->customerId)) {
                        $shipment['customerId'] = $this->customerId[$shipment['customerId']];
                    } else {
                        $shipment['customerId'] = '';
                    }
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
        $where = ['is_deleted' => 0, 'status' => 1];

        // Get Shipment Info
        $whereMerge = array_merge($where, ['id' => $dataList['shipmentType']]);
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->findOneBy($whereMerge);
        if (empty($shipmentType))
            return ['error' => true, 'message' => 'Shipment Type is wrong'];
        $carrierI = $shipmentType->getCarrier()->getId();
        $serviceId = $shipmentType->getService()->getId();
        $categoryId = $shipmentType->getCategory()->getId();

        $volWeight = 0;
        $conWeight = $dataList['weight'];
        if (!empty($dataList['weight']) && !empty($dataList['length']) && !empty($dataList['height']) && !empty($dataList['width'])) {
            $volWeight = ($dataList['width'] * $dataList['length'] * $dataList['height']) / $shipmentType->getVolumetricNumber();
            $conWeight = $dataList['weight'];
        }
        if ($volWeight > $dataList['weight']) {
            $dataList['weight'] = $volWeight;
            $conWeight = $volWeight;
        }

        // Get City
        if (empty($dataList['pickupCity']) || empty($dataList['deliveryCity']))
            return ['error' => true, 'message' => 'Address incorrect'];
        $whereMerge = array_merge($where, ['name' => $dataList['pickupCity']]);
        $pickupCity = $this->entityManager->getRepository(City::class)->findOneBy($whereMerge);
        $whereMerge = array_merge($where, ['name' => $dataList['deliveryCity']]);
        $deliveryCity = $this->entityManager->getRepository(City::class)->findOneBy($whereMerge);

        // Check Area Type shipment
        if ($pickupCity->getId() === $deliveryCity->getId()) {
            $areaType = $this->noi_tinh;
        } elseif (in_array($pickupCity->getId(), $this->city_db) && in_array($deliveryCity->getId(), $this->city_db)) {
            $areaType = $this->lien_mien_db;
        } else {
            $pickupArea = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy(['is_deleted' => 0, 'city_id' => $pickupCity->getId()]);
            $deliveryArea = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy(['is_deleted' => 0, 'city_id' => $deliveryCity->getId()]);
            if ($pickupArea->getDomesticAreaId() === $deliveryArea->getDomesticAreaId()) {
                $areaType = $this->noi_mien;
            } else {
                $areaType = $this->lien_mien;
            }
        }

        // Get Price
        $wherePrice = [
            'carrier_id' => $carrierI,
            'category_id' => $categoryId,
            'service_id' => $serviceId,
            'today' => !empty($dataList['pickupDate']) ? $dataList['pickupDate'] : date('Y-m-d H:i:s'),
        ];
        if (!empty($dataList['customerId'])) {
            $customer = $this->entityManager->getRepository(Customer::class)->findOneBy([
                'id' => $dataList['customerId'],
                'is_deleted' => 0
            ]);
            if (!empty($customer)) {
                $wherePrice['customer_id'] = $dataList['customerId'];
            }
        }
        $pricing = $this->entityManager->getRepository(DomesticPricing::class)->getPriceId($wherePrice);
        // If private unavailable
        if (empty($pricing)) {
            $wherePrice = [
                'carrier_id' => $carrierI,
                'category_id' => $categoryId,
                'service_id' => $serviceId,
                'today' => !empty($dataList['pickupDate']) ? $dataList['pickupDate'] : date('Y-m-d H:i:s'),
            ];
            $pricing = $this->entityManager->getRepository(DomesticPricing::class)->getPriceId($wherePrice);
        }

        // Get Range Weight info
        $whereRange = [
            'weight' => $dataList['weight'],
            'carrier_id' => $carrierI,
            'category_id' => $categoryId,
            'service_id' => $serviceId,
            'zone_id' => $areaType,
            'shipment_type_id' => $shipmentType->getId(),
            'is_ras' => $dataList['deliveryRas']
        ];
        if (!empty($wherePrice['customer_id'])) {
            $whereRange['customer_id'] = $wherePrice['customer_id'];
        }
        $wherePriceDetail = [
            'is_deleted' => 0,
            'domestic_pricing' => $pricing[0]['id']
        ];

        // Price Over
        $priceOver = $this->entityManager->getRepository(DomesticRangeWeight::class)->getRangeWeightOver($whereRange);
        if (!empty($priceOver)) {
            if (count($priceOver) != 1)
                return ['error' => true, 'message' => 'Price incorrect'];
            $whereRange['weight'] = $priceOver[0]['from'];

            $wherePriceDetail['domestic_range_weight'] = $priceOver[0]['id'];
            $priceDataOver = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy($wherePriceDetail);
        }

        // Price Normal
        $priceNormal = $this->entityManager->getRepository(DomesticRangeWeight::class)->getRangeWeightNormal($whereRange);
        if (count($priceNormal) != 1)
            return ['error' => true, 'message' => 'Price incorrect'];
        if (count($priceNormal) <= 0 && count($priceOver) <= 0)
            return ['error' => true, 'message' => "Range weight not found"];

        $wherePriceDetail['domestic_range_weight'] = $priceNormal[0]['id'];
        $priceDataNormal = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy($wherePriceDetail);
        if (empty($priceDataNormal))
            return ['error' => true, 'message' => 'Pricing not found'];

        // Calculate Price
        // Case Over
        $feeOver = 0;
        if (!empty($priceDataOver)) {
            $weightOver = $dataList['weight'] - $priceOver[0]['from'];
            $dataList['weight'] = $priceOver[0]['from'];
            if ($priceOver[0]['calculate_unit'] === 1) {
                if ($priceOver[0]['round_up'] > 0) {
                    $whole = floor($weightOver);
                    $fraction = $weightOver - $whole;
                    if ($fraction > 0) {
                        if ($fraction <= $priceOver[0]['round_up']) {
                            $weightOver = $whole + $priceOver[0]['round_up'];
                        } else {
                            $weightOver = $whole + 1;
                        }
                    }
                }
                $feeOver = ($weightOver / $priceOver[0]['unit']) * $priceDataOver->getValue();
            } else {
                $feeOver = $priceDataOver->getValue();
            }
        }

        // Case Normal
        if ($priceNormal[0]['calculate_unit'] === 1) {
            if ($priceNormal[0]['round_up'] > 0) {
                $whole = floor($dataList['weight']);
                $fraction = $dataList['weight'] - $whole;
                if ($fraction > 0) {
                    if ($fraction <= $priceOver[0]['round_up']) {
                        $dataList['weight'] = $whole + $priceOver[0]['round_up'];
                    } else {
                        $dataList['weight'] = $whole + 1;
                    }
                }
            }
            $feeNormal = $feeOver = ($dataList['weight'] / $priceNormal[0]['unit']) * $priceDataNormal->getValue();
        } else {
            $feeNormal = $priceDataNormal->getValue();
        }

        //type and value bill R
        if (!empty($priceDataOver)) {
            $typeBill = $priceDataOver->getType();
            $typeValue = $priceDataOver->getTypeValue();
        } else {
            $typeBill = $priceDataNormal->getType();
            $typeValue = $priceDataNormal->getTypeValue();
        }

        // Pick RAS
        if ($dataList['pickupRas'] == 1) {
            $feePickUp = $pricing[0]['total_ras'];
        } else {
            $feePickUp = 0;
        }

        // VAS Price
        $feeVas = 0;
        if (!empty($dataList['vas'])) {
            $vasData = $this->entityManager->getRepository(DomesticPricingVas::class)->findOneBy([
                'is_deleted' => 0,
                'name' => $dataList['vas']
            ]);
            $arrayFields = explode(" ", str_replace('  ', ' ', trim($vasData->getFormula())));
            foreach ($arrayFields as $key=>$field) {
                if (strpos($field, '$') !== false) {
                    $fieldVas = $this->entityManager->getRepository(FieldVas::class)->findOneBy([
                        'is_deleted' => 0,
                        'id' => str_replace('$', '', $field)
                    ]);
                    $value = $dataList['listValue'][$fieldVas->getFunctionName()];
                    $arrayFields[$key] = $value;
                }
            }
            $stringField = implode('', $arrayFields);
            $formula = 'return ' . $stringField . ';';
            $feeVas = eval($formula);

            if ($vasData->getType() === 1) {
                $vasResult = $feeVas;
                $vasSpec = $this->entityManager->getRepository(DomesticPricingVasSpec::class)->findBy([
                    'is_deleted' => 0,
                    'domestic_pricing' => $pricing[0]['id'],
                    'domestic_pricing_vas' => $vasData->getId()
                ]);
                foreach ($vasSpec as $vas) {
                    if ($vas->getTo() > 0) {
                        if ($vas->getFrom() <= $vasResult && $vasResult < $vas->getTo()) {
                            $feeVas = $vas->getValue();
                        }
                    } else {
                        if ($vas->getFrom() <= $vasResult && $vasResult < $vas->getTo()) {
                            $feeVas = $vas->getValue();
                        }
                    }
                }
            } else {
                if ($feeVas < $vasData->getMin()) {
                    $feeVas = $vasData->getMin();
                }
            }
        }

        $feeService = $feePickUp + $feeOver + $feeNormal;
        $total = ($feeService + $feeVas) * 1.1;

        return [
            'total' => $total,
            'fee_service' => $feeService,
            'fee_vas' => $feeVas,
            'fee_over' => $feeOver,
            'fee_normal' => $feeNormal,
            'fee_pickup_ras' => $feePickUp,
            'type_bill' => $typeBill,
            'type_value' => $typeValue,
            'con_weight' => $conWeight,
            'vol_weight' => $volWeight,
        ];
    }
    #endregion
}