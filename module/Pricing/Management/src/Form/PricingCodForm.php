<?php
namespace Management\Form;

use Management\Entity\PricingCod;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class PricingCodForm extends Form {
    
    /**
     * Scenario ('create' or 'update')
     * @var string
     */
    private $scenario;

    /**
     * Entity Manager
     * @var EntityManager
     */
    private $entityManager = null;

    /**
     * Current PricingCod.
     * @var PricingCod
     */
    private $pricingCod = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricingCod = null)
    {
        // Define form name.
        parent::__construct('pricing-cod-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricingCod = $pricingCod;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();
    }
}