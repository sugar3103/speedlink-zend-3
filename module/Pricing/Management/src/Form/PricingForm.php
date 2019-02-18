<?php
namespace Management\Form;

use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class PricingForm extends Form {
    
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
     * Current Pricing.
     * @var Pricing
     */
    private $pricing = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricing = null)
    {
        // Define form name.
        parent::__construct('pricing-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricing = $pricing;

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