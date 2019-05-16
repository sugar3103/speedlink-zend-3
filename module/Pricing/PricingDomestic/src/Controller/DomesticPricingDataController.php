<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticPricingDataManager;

class DomesticPricingDataController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var DomesticPricingManager
         */
        protected $domesticPricingDataManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticPricingDataManager
         */

    public function __construct($entityManager, $domesticPricingDataManager) {
        $this->entityManager = $entityManager;
        $this->domesticPricingDataManager = $domesticPricingDataManager;
    }

    public function indexAction()
    {
        
    }
}