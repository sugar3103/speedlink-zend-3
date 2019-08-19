<?php
namespace PricingSpecial\Form;

use PricingSpecial\Entity\SpecialRangeWeight;
use PricingSpecial\Validator\SpecialRangeWeightExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\ToInt;
use Zend\Filter\ToFloat;
use Zend\Filter\StringTrim;
use Zend\Validator\StringLength;

use Zend\Form\Form;

class RangeWeightForm extends Form {
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
     * Current SpecialRangeWeight.
     * @var SpecialRangeWeight
     */
    private $specialRangeWeight = null;

    public function __construct($scenario = 'create', $entityManager = null, $specialRangeWeight = null)
    {
        // Define form name.
        parent::__construct('Special-zone-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->specialRangeWeight = $specialRangeWeight;

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
            'required' => true,
            'filters' => [[
                    'name' => StringTrim::class
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 3,
                        'max' => 50
                    ]
                ],
                [
                    'name' => SpecialRangeWeightExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'specialRangeWeight' => $this->specialRangeWeight
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'name_en',
            'required' => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 3,
                        'max' => 50
                    ]
                ],
                [
                    'name' => SpecialRangeWeightExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'specialRangeWeight' => $this->specialRangeWeight,
                        'language' => 'en'
                    ]
                ]
            ]
        ]);
        
     
        $inputFilter->add([
            'name' => 'customer_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);
        $inputFilter->add([
            'name' => 'special_area_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);

        // Add input for "description" field.
        $inputFilter->add([
            'name' => 'description',
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
                        'min' => 1,
                        'max' => 1024
                    ]
                ]
            ]
        ]);
        $inputFilter->add([
            'name' => 'description_en',
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
                        'min' => 1,
                        'max' => 1024
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'carrier_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);

        $inputFilter->add([
            'name' => 'category_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);

        $inputFilter->add([
            'name' => 'service_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);

        $inputFilter->add([
            'name' => 'shipment_type_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);
        
        $inputFilter->add([
            'name' => 'calculate_unit',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);
        
        $inputFilter->add([
            'name' => 'round_up',
            'required' => true,
            'filters' => [
                [
                    'name' => ToFloat::class
                ]
            ]                
        ]);
        
        $inputFilter->add([
            'name' => 'unit',
            'required' => false,
            'filters' => [
                [
                    'name' => ToFloat::class
                ]
            ]                
        ]);
        
        $inputFilter->add([
            'name' => 'from',
            'required' => true,
            'filters' => [
                [
                    'name' => ToFloat::class
                ]
            ]                
        ]);
        
        
        $inputFilter->add([
            'name' => 'to',
            'required' => true,
            'filters' => [
                [
                    'name' => ToFloat::class
                ]
            ]                
        ]);
        $inputFilter->add([
            'name' => 'status',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);
        
    }
}