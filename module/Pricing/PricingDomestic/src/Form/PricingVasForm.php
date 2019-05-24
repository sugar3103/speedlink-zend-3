<?php
namespace PricingDomestic\Form;

use PricingDomestic\Entity\DomesticPricing;
use Doctrine\ORM\EntityManager;
use Zend\Filter\ToInt;

use Zend\Form\Form;

class PricingVasForm extends Form
{
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
     * Current DomesticPricing.
     * @var DomesticPricing
     */
    private $domesticPricing = null;

    public function __construct($scenario = 'create', $entityManager = null, $domesticPricing = null)
    {
        // Define form name.
        parent::__construct('domestic-pricing-vas-form');

        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->domesticPricing = $domesticPricing;

        $this->addInputFilter();
    }

    /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter()
    {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();
        // Add input for "username" field.
        $inputFilter->add([
            'name' => 'id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'data',
            'required' => true
        ]);
    }
}
