<?php
namespace ServiceShipment\Form;

use ServiceShipment\Validator\CarrierIdExistsValidator;
use ServiceShipment\Validator\ServiceIdExistsValidator;
use ServiceShipment\Validator\ShipmentTypeCodeExistsValidator;
use ServiceShipment\Validator\ShipmentTypeNameExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class ShipmentTypeForm extends Form {
    
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
     * Current ShipmentType.
     * @var ShipmentType
     */
    private $shipmentType = null;

    public function __construct($scenario = 'create', $entityManager = null, $shipmentType = null)
    {
        // Define form name.
        parent::__construct('shipmentType-form');

        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->shipmentType = $shipmentType;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();

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
                        'max' => 50
                    ]
                ], [
                    'name' => ShipmentTypeNameExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'shipmentType' => $this->shipmentType
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
                        'max' => 50
                    ]
                ], [
                    'name' => ShipmentTypeNameExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'shipmentType' => $this->shipmentType
                    ]
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
            'name'  => 'status',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'code',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'max' => 50
                    ]
                ], [
                    'name' => ShipmentTypeCodeExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'shipmentType' => $this->shipmentType
                    ]
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
            'name'  => 'product_type_code',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'validator' => [
                            'name' => 'InArray',
                            'options' => [
                                'haystack' => ['Dox', 'Parcel']
                            ]
                        ]
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name'  => 'volumetric_number',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
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
            'name'  => 'service_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);
    }
}