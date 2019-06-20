<?php
namespace ZoneCode\Form;

use ZoneCode\Entity\ZoneCode;
use ZoneCode\Validator\ZoneCodeExistsValidator;
use ZoneCode\Validator\ZoneExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Element\Button;
use Zend\Form\Element\Csrf;
use Zend\Form\Element\Password;
use Zend\Form\Element\Select;
use Zend\Form\Element\Submit;
use Zend\Form\Element\Text;
use Zend\Form\Form;
use Zend\InputFilter\ArrayInput;
use Zend\Validator\GreaterThan;
use Zend\Validator\Identical;
use Zend\Validator\InArray;
use Zend\Validator\StringLength;

class ZoneCodeForm extends Form {
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
     * Current ZoneCode.
     * @var ZoneCode
     */
    private $zonecode = null;

    public function __construct($scenario = 'create', $entityManager = null, $zonecode = null)
    {
        // Define form name.
        parent::__construct('zonecode-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->zonecode = $zonecode;
        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();
        // Add input for "username" field.
        // $inputFilter->add([
        //     'name' => 'code',
        //     'required' => true,
        //     'filters' => [
        //         [
        //             'name' => StringTrim::class
        //         ]
        //     ],
        //     'validators' => [
        //         [
        //             'name' => StringLength::class,
        //             'options' => [
        //                 'min' => 2,
        //                 'max' => 50
        //             ]
        //         ],
        //         [
        //             'name' => ZoneCodeExistsValidator::class,
        //             'options' => [
        //                 'entityManager' => $this->entityManager,
        //                 'zonecode' => $this->zonecode
        //             ]
        //         ]
        //     ]
        // ]);

        $inputFilter->add([
            'name' => 'name',
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
                        'min' => 2,
                        'max' => 50
                    ]
                ],
                [
                    'name' => ZoneExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'zone' => $this->zonecode
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
                        'min' => 2,
                        'max' => 50
                    ]
                ],
                [
                    'name' => ZoneExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'zone' => $this->zonecode,
                        'language' => 'en'
                    ]
                ]
            ]
        ]);
        $inputFilter->add([
            'name' => 'category_id',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);
        $inputFilter->add([
            'name' => 'carrier_id',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);
        $inputFilter->add([
            'name' => 'service_id',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);

        $inputFilter->add([
            'name' => 'shipment_type_id',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);

        $inputFilter->add([
            'name' => 'is_private',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);

        $inputFilter->add([
            'name' => 'customer_id',
            'required'  => false,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);

        $inputFilter->add([
            'name'  => 'status',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'created_by',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);$inputFilter->add([
            'name'  => 'updated_by',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'description',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name'  => 'description_en',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);
        
        $inputFilter->add([
            'name' => 'origin_country_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        $inputFilter->add([
            'name' => 'origin_city_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        $inputFilter->add([
            'name' => 'origin_district_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        $inputFilter->add([
            'name' => 'origin_ward_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]);
        
        $inputFilter->add([
            'name' => 'destination_country_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        $inputFilter->add([
            'name' => 'destination_city_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        $inputFilter->add([
            'name' => 'destination_district_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        $inputFilter->add([
            'name' => 'destination_ward_id',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]           
        ]); 
        
    }
}