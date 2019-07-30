<?php
namespace PricingSpecial\Form;

use PricingSpecial\Entity\PricingSpecial;
use PricingSpecial\Validator\PricingSpecialExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\ToInt;
use Zend\Filter\StringTrim;
use Zend\Validator\StringLength;
use Zend\Validator\Date;
use Zend\Validator\InArray;

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
     * Current PricingSpecial.
     * @var PricingSpecial
     */
    private $specialPricing = null;

    public function __construct($scenario = 'create', $entityManager = null, $specialPricing = null)
    {
        // Define form name.
        parent::__construct('special-pricing-data-form');
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->specialPricing = $specialPricing;

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
