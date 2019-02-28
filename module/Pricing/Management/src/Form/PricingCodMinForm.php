<?php
namespace Management\Form;

use Management\Entity\PricingCodMin;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class PricingCodMinForm extends Form {
    
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
     * Current PricingCodMin.
     * @var PricingCodMin
     */
    private $pricingCodMin = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricingCodMin = null)
    {
        // Define form name.
        parent::__construct('pricing-cod-min-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricingCodMin = $pricingCodMin;
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