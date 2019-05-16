<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticPricingManager;
use PricingDomestic\Service\DomesticPricingDataManager;
use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Entity\DomesticPricingData;
use PricingDomestic\Entity\DomesticZone;
use ServiceShipment\Entity\ShipmentType;

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
                $this->createTablePricing($pricing);        
            }
        }

        return $this->createResponse();
    }

    private function createTablePricing($pricing) {
        $data = [];
        //Get All Zone
        $zones = $this->entityManager->getRepository(DomesticZone::class)->findAll([]);
        foreach ($zones as $zone) {
            $shipmentTypes = $this->entityManager->getRepository(ShipmentType::class)->findAll([]);
            foreach ($shipmentTypes as $shipmentType) {
                $data[$zone->getId()]['ras'][$shipmentType->getId()] = '';
                $data[$zone->getId()]['not_ras'][$shipmentType->getId()] = '';
            }            
        }

        //Get Range W ,
        var_dump($data);
        die;
    }
}