<?php
namespace RangeWeight\Form;

use RangeWeight\Entity\RangeWeight;
use RangeWeight\Validator\RangeWeightExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Filter\ToFloat;
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
     * Current RangeWeight.
     * @var RangeWeight
     */
    private $rangeweight = null;

    public function __construct($scenario = 'create', $entityManager = null, $rangeweight = null)
    {
        // Define form name.
        parent::__construct('rangeweight-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->rangeweight = $rangeweight;

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
            'name' => 'code',
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
                    'name' => RangeWeightExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'rangeweight' => $this->rangeweight
                    ]
                ]
            ]
        ]);
 
        $inputFilter->add([
            'name' => 'category',
            'required'  => true,
            'filters' => [
                [
                  'name' => StringTrim::class
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
            'name' => 'calculate_unit',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToInt::class
                ]
            ]           
        ]);
                    
        $inputFilter->add([
            'name' => 'unit',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToFloat::class
                ]
            ]           
        ]);

        $inputFilter->add([
            'name' => 'round_up',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToFloat::class
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
            'name' => 'from',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToFloat::class
                ]
            ]           
        ]);

        $inputFilter->add([
            'name' => 'to',
            'required'  => true,
            'filters' => [
                [
                  'name' => ToFloat::class
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
        
    }
}