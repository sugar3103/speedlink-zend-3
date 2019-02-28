<?php
namespace Management\Form;

use Management\Entity\PricingData;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class PricingDataForm extends Form {
    
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
     * Current PricingData.
     * @var PricingData
     */
    private $pricingData = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricingData = null)
    {
        // Define form name.
        parent::__construct('pricing-data-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricingData = $pricingData;
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