<?php
namespace PricingDomestic\Form;

use PricingDomestic\Entity\DomesticRangeWeight;
use PricingDomestic\Validator\DomesticRangeWeightExistsValidator;
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
     * Current DomesticRangeWeight.
     * @var DomesticRangeWeight
     */
    private $domesticRangeWeight = null;

    public function __construct($scenario = 'create', $entityManager = null, $domesticRangeWeight = null)
    {
        // Define form name.
        parent::__construct('domestic-zone-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->domesticRangeWeight = $domesticRangeWeight;

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
                // [
                //     'name' => DomesticRangeWeightExistsValidator::class,
                //     'options' => [
                //         'entityManager' => $this->entityManager,
                //         'domesticRangeWeight' => $this->domesticRangeWeight
                //     ]
                // ]
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
                // [
                //     'name' => DomesticRangeWeightExistsValidator::class,
                //     'options' => [
                //         'entityManager' => $this->entityManager,
                //         'domesticRangeWeight' => $this->domesticRangeWeight,
                //         'language' => 'en'
                //     ]
                // ]
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
            'name' => 'is_ras',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]                
        ]);

        $inputFilter->add([
            'name' => 'zone_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
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