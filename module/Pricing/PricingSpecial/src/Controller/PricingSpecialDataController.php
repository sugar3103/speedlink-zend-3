<?php
namespace PricingSpecial\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingSpecial\Service\SpecialPricingManager;
use PricingSpecial\Service\pricingSpecialDataManager;
use PricingSpecial\Entity\SpecialPricing;
use PricingSpecial\Entity\SpecialPricingData;
use PricingSpecial\Entity\SpecialArea;
use PricingSpecial\Entity\SpecialRangeWeight;
use ServiceShipment\Entity\ShipmentType;
use PricingSpecial\Form\PricingDataForm;

class PricingSpecialDataController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Pricing Manager.
         * @var PricingSpecialManager
         */
        protected $pricingSpecialManager;

        /**
         * Pricing Data Manager.
         * @var pricingSpecialDataManager
         */
        protected $pricingSpecialDataManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $pricingSpecialDataManager
         */

    public function __construct($entityManager, $pricingSpecialManager, $pricingSpecialDataManager) {
        
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingSpecialManager = $pricingSpecialManager;
        $this->pricingSpecialDataManager = $pricingSpecialDataManager;
    }

    public function indexAction()
    {
        if($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $pricing = $this->entityManager->getRepository(SpecialPricing::class)->find($data['id']);
            if($pricing) {
                $data = [
                    'special_pricing_id' => $pricing->getId(),
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
            //Create New Form Special Pricing
            $form = new PricingDataForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Special Pricing.
                $this->pricingSpecialDataManager->addPricingData($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_DATA_PRICING";
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
        $areas = $this->entityManager->getRepository(SpecialArea::class)->findBy(['is_deleted' => 0, 'customer' => $pricing->getCustomer()]);
        foreach ($areas as $area) { 
            $data[$area->getId()]['name'] = $area->getName();
            $shipmentTypes = $this->entityManager->getRepository(ShipmentType::class)->findBy(['is_deleted' => 0, 'status' => 1, 'category' => 3]);
            foreach ($shipmentTypes as $shipmentType) {
                $data[$area->getId()]['data'][$shipmentType->getId()] = null;
                $conditions = array(
                    'service' => $pricing->getService(),
                    'shipment_type' => $shipmentType->getId(),                                    
                    'is_deleted' => 0,
                    'status' => 1,
                    'customer' => $pricing->getCustomer(),
                    'special_area' => $area->getId(),
                    'carrier' => $pricing->getCarrier()
                );
                $rangeWeights = $this->entityManager->getRepository(SpecialRangeWeight::class)->findBy($conditions);
                if($rangeWeights) {
                    foreach ($rangeWeights as $rangeWeight) {
                        $pricingData = $this->entityManager->getRepository(SpecialPricingData::class)->findOneBy([
                            'special_pricing' => $pricing->getId(),
                            'special_range_weight' => $rangeWeight->getId(),
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
                            $valueData['type']  = $pricingData->getReturnType();
                            $valueData['type_value']  = $pricingData->getReturnValue();
                            $data[$area->getId()]['data'][$shipmentType->getId()][] = $valueData;                            
                        } else {
                            $valueData['value'] = '';
                            $valueData['type'] = 0;
                            $valueData['type_value'] = 0;
                            $data[$area->getId()]['data'][$shipmentType->getId()][] = $valueData;
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