<?php
namespace Management\Form;

use Management\Entity\PricingVasSpec;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class PricingVasSpecForm extends Form {
    
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
     * Current PricingVasSpec.
     * @var PricingVasSpec
     */
    private $pricingVasSpec = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricingVasSpec = null)
    {
        // Define form name.
        parent::__construct('pricing-vas-spec-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricingVasSpec = $pricingVasSpec;

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