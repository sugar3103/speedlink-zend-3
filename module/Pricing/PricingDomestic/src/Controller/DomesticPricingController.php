<?php
namespace PricingDomestic\Controller;

use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
use Core\Controller\CoreController;
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

    const NOI_TINH = 5;
    const NOI_MIEN = 6;
    const LIEN_MIEN = 8;
    const LIEN_MIEN_DB = 7;

    /*
     * 15 => Đà Nẵng
     * 24 => Hà Nội
     * 29 => Hồ Chí Minh
     */
    const CITY_DB = [15, 24, 29];

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

    public function getPricingOldAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();

            // Check shipment id V2
            $shipmentType = $data['shipmentType'];
            switch ($shipmentType) {
                case 'd0ee2e12-87da-536c-0014-5cf5fa5fe86e': // 4Hrs1
                case '9b4247a7-bb65-dbd5-5322-5ce9e8b6b0bd': // 4Hrs2
                    $data['shipmentType'] = 35;
                    break;
                case '70e9c16a-a37b-6619-47c4-5cf5fae8524e': // SDay1
                case '8a46755c-6aae-31e4-18bc-5ce9e34c1e56': // SDay2
                    $data['shipmentType'] = 36;
                    break;
                case '8d80fd7b-0430-cb11-8e5f-5ce9e8aff4a9': // Expr1
                case '8dde0ffb-3587-6056-fb3e-5cf5fb98c335': // Expr2
                    $data['shipmentType'] = 37;
                    break;
                case '88110327-4529-d804-bf6c-5ce9e81c0c66': // Stan1
                case '5695b752-5849-8193-86d8-5cf5fb64eaeb': // Stan2
                    $data['shipmentType'] = 38;
                    break;
                case '14046694-8fe2-547b-9983-5ce9e872df65': // Econ1
                case 'be621fa0-cd57-7bc4-0e60-5cf5fb03e541': // Econ2
                    $data['shipmentType'] = 39;
                    break;
                default:
                    $data['shipmentType'] = 0;
                    break;
            }
            /*$paramList = [
                'pickupCity',   'pickupDistrict',   'pickupWard',   'rasPickup',
                'deliveryCity', 'deliveryDistrict', 'deliveryWard', 'rasDelivery',
                'shipmentType', 'weight'
            ];
            $result = self::checkParamPost($data, $paramList);
            if ($result === false) {
                return;
            }*/
            $result = self::calculatePricing($data);
            $this->apiResponse['data'] = $result;
        }
        return $this->createResponse();;
    }

    public function getPricingNewAction()
    {
        //$weight = ($dataList['width'] * $dataList['height'] * $dataList['length']) / $shipmentType->getVolumetricNumber();
    }

    public function calculatePricing($dataList)
    {
        // Init
        $where = ['is_deleted' => 0, 'status' => 1];

        // Get Shipment Info
        if ($dataList['shipmentType'] === 0)
            return ['error' => true, 'msg' => 'Shipment Type is wrong'];
        $whereMerge = array_merge($where, ['id' => $dataList['shipmentType']]);
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->findOneBy($whereMerge);
        $carrierI = $shipmentType->getCarrier()->getId();
        $serviceId = $shipmentType->getService()->getId();
        $categoryId = $shipmentType->getCategory()->getId();

        // Get pickup City, District, Ward
        $whereMerge = array_merge($where, ['name' => $dataList['pickupCity']]);
        $pickupCity = $this->entityManager->getRepository(City::class)->findOneBy($whereMerge);
        $whereMerge = array_merge($where, ['name' => $dataList['pickupDistrict'], 'city_id' => $pickupCity->getId()]);
        $pickupDistrict = $this->entityManager->getRepository(District::class)->findOneBy($whereMerge);
        $pickupRas = $pickupDistrict->getRas();
        if (!empty($dataList['pickupWard'])) {
            $whereMerge = array_merge($where, ['name' => $dataList['pickupWard'], 'district_id' => $pickupDistrict->getId()]);
            $pickupWard = $this->entityManager->getRepository(Ward::class)->findOneBy($whereMerge);
            $pickupRas = $pickupWard->getRas();
        }

        // Get delivery City, District, Ward
        $whereMerge = array_merge($where, ['name' => $dataList['deliveryCity']]);
        $deliveryCity = $this->entityManager->getRepository(City::class)->findOneBy($whereMerge);
        $whereMerge = array_merge($where, ['name' => $dataList['deliveryDistrict'], 'city_id' => $deliveryCity->getId()]);
        $deliveryDistrict = $this->entityManager->getRepository(District::class)->findOneBy($whereMerge);
        $deliveryRas = $deliveryDistrict->getRas();
        if (!empty($dataList['deliveryWard'])) {
            $whereMerge = array_merge($where, ['name' => $dataList['deliveryWard'], 'district_id' => $deliveryDistrict->getId()]);
            $deliveryWard = $this->entityManager->getRepository(Ward::class)->findOneBy($whereMerge);
            $deliveryRas = $deliveryWard->getRas();
        }

        // Check Area Type shipment
        if ($pickupCity->getId() === $deliveryCity->getId()) {
            $areaType = self::NOI_TINH;
        } elseif (in_array($pickupCity->getId(), self::CITY_DB) && in_array($deliveryCity->getId(), self::CITY_DB)) {
            $areaType = self::LIEN_MIEN_DB;
        } else {
            $pickupArea = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy(['is_deleted' => 0, 'city_id' => $pickupCity->getId()]);
            $deliveryArea = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy(['is_deleted' => 0, 'city_id' => $deliveryCity->getId()]);
            if ($pickupArea->getId() === $deliveryArea->getId()) {
                $areaType = self::NOI_MIEN;
            } else {
                $areaType = self::LIEN_MIEN;
            }
        }

        // Get Price
        $wherePrice = [
            'carrier_id' => $carrierI,
            'category_id' => $categoryId,
            'service_id' => $serviceId,
            'today' => date('Y-m-d H:i:s'),
        ];
        if (!empty($dataList['customer_id'])) {
            $wherePrice['customer_id'] = $dataList['customer_id'];
        }
        $pricing = $this->entityManager->getRepository(DomesticPricing::class)->getPriceId($wherePrice);

        // Get Range Weight info
        $whereRange = [
            'weight' => $dataList['weight'],
            'carrier_id' => $carrierI,
            'category_id' => $categoryId,
            'service_id' => $serviceId,
            'zone_id' => $areaType,
            'shipment_type_id' => $shipmentType->getId(),
            'is_ras' => $deliveryRas
        ];
        $wherePriceDetail = [
            'is_deleted' => 0,
            'domestic_pricing' => $pricing[0]['id']
        ];

        // Price Over
        $priceOver = $this->entityManager->getRepository(DomesticRangeWeight::class)->getRangeWeightOver($whereRange);
        if (!empty($priceOver)) {
            if (count($priceOver) != 1)
                return ['error' => true, 'msg' => 'Price over have more than 2 record'];
            $whereRange['weight'] = $priceOver[0]['from'] - 0.01;

            $wherePriceDetail['domestic_range_weight'] = $priceOver[0]['id'];
            $priceDataOver = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy($wherePriceDetail);
            $over = [
                'where' => $wherePriceDetail,
                'data' => $priceDataOver->getValue(),
            ];
        }

        // Price Normal
        $priceNormal = $this->entityManager->getRepository(DomesticRangeWeight::class)->getRangeWeightNormal($whereRange);
        if (count($priceNormal) != 1)
            return ['error' => true, 'msg' => 'Price normal have more than 2 record'];
        if (count($priceNormal) <= 0 && count($priceOver) <= 0)
            return ['error' => true, 'msg' => "Range weight not found"];

        $wherePriceDetail['domestic_range_weight'] = $priceNormal[0]['id'];
        $priceDataNormal = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy($wherePriceDetail);
        $normal = [
            'where' => $wherePriceDetail,
            'data' => $priceDataNormal->getValue(),
        ];
        // Calculate Price
        // Case Over
        $feeOver = 0;
        if (!empty($priceDataOver)) {
            $weightOver = $dataList['weight'] - $priceOver[0]['from'];
            $dataList['weight'] = $priceOver[0]['from'];
            if ($priceOver[0]['calculate_unit'] === 1 && $priceOver[0]['unit'] > 0) {
                $feeOver = ($weightOver / $priceOver[0]['unit']) * $priceDataOver->getValue();
            } else {
                $feeOver = $priceDataOver->getValue();
            }
        }

        // Case Normal
        if ($priceNormal[0]['calculate_unit'] === 1) {
            $feeNormal = $feeOver = ($dataList['weight'] / $priceNormal[0]['unit']) * $priceDataNormal->getValue();
        } else {
            $feeNormal = $priceDataNormal->getValue();
        }

        // Pick RAS
        if ($pickupRas === 1) {
            $feePickUp = 15000;
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

        $feeService = $feePickUp + $feeOver + $feeNormal + $feeVas;
        $total = $feeService * 1.1;

        return [
            'total' => $total,
            'fee_vas' => $feeVas,
            'fee_over' => $feeOver,
            'fee_normal' => $feeNormal,
            'fee_pickup_ras' => $feePickUp,
        ];
    }

    private function checkParamPost($dataPost,$fieldRequire)
    {
        $flag = true;
        $field = [];
        foreach ($fieldRequire as $obj) {
            if (!(array_key_exists($obj, $dataPost))) {
                $flag = false;
                $field[] = $obj;
            }
        }
        return ['status' => $flag, 'field' => $field ];
    }
}