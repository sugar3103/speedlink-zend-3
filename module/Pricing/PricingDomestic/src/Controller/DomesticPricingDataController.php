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
            if(isset($data['id'])) {
                $pricing = $this->entityManager->getRepository(DomesticPricing::class)->find($data['id']);
                if($pricing) {
                    $this->apiResponse['data'] = $this->createTablePricing($pricing);        
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_PRICING_DATA_REQUEST_ID";
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
        $zones = $this->entityManager->getRepository(DomesticZone::class)->findAll([]);
        foreach ($zones as $zone) {
            $data[$zone->getId()]['name'] = $zone->getName();
            $data[$zone->getId()]['name_en'] = $zone->getNameEn();
            
            $shipmentTypes = $this->entityManager->getRepository(ShipmentType::class)->findAll([]);
            foreach ($shipmentTypes as $shipmentType) {
                $data[$zone->getId()]['ras'][$shipmentType->getId()] = null;
                $data[$zone->getId()]['not_ras'][$shipmentType->getId()] = null;
                //Get Range Weight
                $rangeWeights = $this->entityManager->getRepository(DomesticRangeWeight::class)->findBy([
                    'service' => $pricing->getService()->getId(),
                    'shipment_type' => $shipmentType->getId(),
                    'zone'       => $zone->getId(),
                    'is_deleted' => 0
                ]);
                
                if($rangeWeights) {
                    foreach ($rangeWeights as $rangeWeight) {
                        $pricingData = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy([
                            'domestic_pricing' => $pricing->getId(),
                            'domestic_range_weight' => $rangeWeight->getId(),
                            'is_deleted' => 0
                        ]);
                        
                        if($pricingData) {
                            $valueData = [
                                'name' => $rangeWeight->getName(), 
                                'name_en' => $rangeWeight->getNameEn(), 
                                'from'  => $rangeWeight->getFrom(),
                                'to'  => $rangeWeight->getTo(),
                                'value' => $pricingData->getValue()
                            ];

                            if($rangeWeight->getIsRas()) {
                                $data[$zone->getId()]['ras'][$shipmentType->getId()][] = $valueData;
                            } else {
                                $data[$zone->getId()]['not_ras'][$shipmentType->getId()][] = $valueData;
                            }                            
                        } else {
                            if($rangeWeight->getIsRas()) {
                                $data[$zone->getId()]['ras'][$shipmentType->getId()][] = [];
                            } else {
                                $data[$zone->getId()]['not_ras'][$shipmentType->getId()][] = [];
                            }  
                        }
                    }
                } 
                
            }            
        }

        return $data;
    }
}