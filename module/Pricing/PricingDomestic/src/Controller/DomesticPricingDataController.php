<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticPricingManager;
use PricingDomestic\Service\DomesticPricingDataManager;
use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Entity\DomesticPricingData;
use PricingDomestic\Entity\DomesticZone;
use PricingDomestic\Entity\DomesticRangeWeight;
use ServiceShipment\Entity\ShipmentType;
use PricingDomestic\Form\PricingDataForm;

class DomesticPricingDataController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Pricing Manager.
         * @var DomesticPricingManager
         */
        protected $domesticPricingManager;

        /**
         * Pricing Data Manager.
         * @var DomesticPricingManager
         */
        protected $domesticPricingDataManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticPricingDataManager
         */

    public function __construct($entityManager, $domesticPricingManager, $domesticPricingDataManager) {
        parent::__construct($entityManager);

        $this->entityManager = $entityManager;
        $this->domesticPricingManager = $domesticPricingManager;
        $this->domesticPricingDataManager = $domesticPricingDataManager;
    }

    public function indexAction()
    {
        if($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $pricing = $this->entityManager->getRepository(DomesticPricing::class)->find($data['id']);
            if($pricing) {
                $data = [
                    'pricing_id' => $pricing->getId(),
                    'name' => $pricing->getName(),
                    'service' => $pricing->getService()->getName(),
                    'service_en' => $pricing->getService()->getNameEn(),
                    'shipment_types' => $this->getShipmentTypeByService($pricing->getService()->getId()),
                    'data' => $this->createTablePricing($pricing),                    
                ];
                $this->apiResponse['data'] = $data;       
            }
        }

        return $this->createResponse();
    }

    public function addAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;            
            //Create New Form Domestic Pricing
            $form = new PricingDataForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Domestic Pricing.
                $this->domesticPricingDataManager->addPricingData($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_DOMESTIC_DATA_PRICING";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages(); 
            }      
        }
        return $this->createResponse();
    }

    private function createTablePricing($pricing) {
        $data = [];
        //Get All Zone
        $zones = $this->entityManager->getRepository(DomesticZone::class)->findBy(['is_deleted' => 0]);
        foreach ($zones as $zone) {
            $data[$zone->getId()]['name'] = $zone->getName();
            $data[$zone->getId()]['name_en'] = $zone->getNameEn();
            
            $shipmentTypes = $this->entityManager->getRepository(ShipmentType::class)->findBy(['is_deleted' => 0, 'status' => 1, 'category' => 3]);
            foreach ($shipmentTypes as $shipmentType) {
                $data[$zone->getId()]['ras'][$shipmentType->getId()] = null;
                $data[$zone->getId()]['not_ras'][$shipmentType->getId()] = null;
                //Get Range Weight
                $conditions = array(
                    'service' => $pricing->getService()->getId(),
                    'shipment_type' => $shipmentType->getId(),
                    'zone'       => $zone->getId(),
                    'is_private' => $pricing->getIsPrivate(),
                    'is_deleted' => 0,
                    'status' => 1
                );
                if (!empty($pricing->getCustomer())) {
                    $conditions['customer'] = $pricing->getCustomer();
                }
                $rangeWeights = $this->entityManager->getRepository(DomesticRangeWeight::class)->findBy($conditions);
                
                if($rangeWeights) {
                    foreach ($rangeWeights as $rangeWeight) {
                        $pricingData = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy([
                            'domestic_pricing' => $pricing->getId(),
                            'domestic_range_weight' => $rangeWeight->getId(),
                            'is_deleted' => 0
                        ]);

                        $valueData = [
                            'id'    =>$rangeWeight->getId(),
                            'name' => $rangeWeight->getName(), 
                            'name_en' => $rangeWeight->getNameEn(), 
                            'to' => $rangeWeight->getTo(),
                        ];

                        if($pricingData) {
                            $valueData['value'] = $pricingData->getValue();
                            $valueData['type']  = $pricingData->getType();
                            $valueData['type_value']  = $pricingData->getTypeValue();
                            if($rangeWeight->getIsRas()) {
                                $data[$zone->getId()]['ras'][$shipmentType->getId()][] = $valueData;
                            } else {
                                $data[$zone->getId()]['not_ras'][$shipmentType->getId()][] = $valueData;
                            }                            
                        } else {
                            $valueData['value'] = '';
                            $valueData['type'] = 0;
                            $valueData['type_value'] = 0;
                            if($rangeWeight->getIsRas()) {
                                $data[$zone->getId()]['ras'][$shipmentType->getId()][] = $valueData;
                            } else {
                                $data[$zone->getId()]['not_ras'][$shipmentType->getId()][] = $valueData;
                            }  
                        }
                    }
                } 
            }            
        }

        return $data;
    }

    private function getShipmentTypeByService($service_id) {
        $data = [];
        $shipmentTypes = $this->entityManager->getRepository(\ServiceShipment\Entity\ShipmentType::class)->findBy([
            'service' => $service_id, 
            'is_deleted' => 0,
            'status' => 1,
            'category' => 3
            ]);
        foreach ($shipmentTypes as $shipmentType) {
            $data[] = [
                'id' => $shipmentType->getId(),
                'name' => $shipmentType->getName(),
                'name_en' => $shipmentType->getNameEn(),
            ];
        }

        return $data;
    }
}