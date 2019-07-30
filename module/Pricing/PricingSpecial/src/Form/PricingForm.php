<?php
namespace PricingSpecial\Form;

use PricingSpecial\Entity\PricingSpecial;
use PricingSpecial\Validator\PricingSpecialExistsValidator;
use PricingSpecial\Validator\PricingSpecialCustomerExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\ToInt;
use Zend\Filter\StringTrim;
use Zend\Validator\StringLength;
use Zend\Validator\Date;
use Zend\Filter\ToFloat;

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
     * Current PricingSpecial.
     * @var PricingSpecial
     */
    private $specialPricing = null;

    public function __construct($scenario = 'create', $entityManager = null, $specialPricing = null)
    {
        // Define form name.
        parent::__construct('special-pricing-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->specialPricing = $specialPricing;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();
        // Add input for "username" field.
        $inputFilter->add([
            'name' => 'name',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 2,
                        'max' => 50
                    ]
                ],
                [
                    'name' => PricingSpecialExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'specialPricing' => $this->specialPricing
                    ]
                ]
            ]
        ]);

       
        
        $inputFilter->add([
            'name' => 'total_ras',
            'required' => false,
            'filters' => [
                [ 'name' => ToFloat::class]
            ]
        ]);

        $inputFilter->add([
            'name'  => 'customer_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ],
            'validators' => [
                [
                    'name' => PricingSpecialCustomerExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,      
                        'specialPricing' => $this->specialPricing
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name'  => 'carrier_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'category_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'service_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'effected_date',
            'required'  => true            
        ]);
        $inputFilter->add([
            'name'  => 'expired_date',
            'required'  => true            
        ]);

        $inputFilter->add([
            'name'  => 'saleman_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'approval_status',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'approved_by',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);


        $inputFilter->add([
            'name'  => 'status',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
    }
}