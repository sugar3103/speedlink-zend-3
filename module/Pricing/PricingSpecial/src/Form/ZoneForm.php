<?php
namespace PricingSpecial\Form;

use PricingSpecial\Entity\SpecialZone;
use PricingSpecial\Validator\SpecialZoneExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\ToInt;
use Zend\Filter\StringTrim;
use Zend\Validator\StringLength;

use Zend\Form\Form;

class ZoneForm extends Form {
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
     * Current SpecialZone.
     * @var SpecialZone
     */
    private $specialZone = null;

    public function __construct($scenario = 'create', $entityManager = null, $specialZone = null)
    {
        // Define form name.
        parent::__construct('domestic-zone-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->specialZone = $specialZone;

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
                ]
                
            ]
        ]);    
        
        $inputFilter->add([
            'name'  => 'customer_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
        $inputFilter->add([
            'name'  => 'special_area_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'from_city',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        
        $inputFilter->add([
            'name'  => 'to_city',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
        $inputFilter->add([
            'name'  => 'to_district',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
        $inputFilter->add([
            'name'  => 'to_ward',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
    }
}