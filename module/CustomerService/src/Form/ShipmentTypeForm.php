<?php
namespace CustomerService\Form;

use Address\Entity\Country;
use Address\Validator\CountryExistsValidator;
use CustomerService\Validator\ShipmentTypeExistsValidator;
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
                    'name' => ShipmentTypeExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'country' => $this->shipmentType
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
                    'name' => ShipmentTypeExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'country' => $this->shipmentType
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
            'name'  => 'shipment_type_code',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'category_code',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
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