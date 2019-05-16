<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticPricingVasManager;

class DomesticPricingDataController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var DomesticPricingVasManager
         */
        protected $domesticPricingVasManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticPricingVasManager
         */

    public function __construct($entityManager, $domesticPricingVasManager) {
        $this->entityManager = $entityManager;
        $this->domesticPricingVasManager = $domesticPricingVasManager;
    }

    public function indexAction()
    {
        
    }
}