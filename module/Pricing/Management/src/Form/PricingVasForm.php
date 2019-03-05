<?php
namespace Management\Form;

use Management\Entity\PricingVas;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class PricingVasForm extends Form {
    
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
     * Current PricingVas.
     * @var PricingVas
     */
    private $pricingVas = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricingVas = null)
    {
        // Define form name.
        parent::__construct('pricing-vas-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricingVas = $pricingVas;
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