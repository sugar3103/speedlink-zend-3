<?php
namespace PricingDomestic\Form;

use PricingDomestic\Entity\DomesticZone;
use PricingDomestic\Validator\DomesticZoneExistsValidator;
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
     * Current DomesticZone.
     * @var DomesticZone
     */
    private $domesticZone = null;

    public function __construct($scenario = 'create', $entityManager = null, $domesticZone = null)
    {
        // Define form name.
        parent::__construct('domestic-zone-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->domesticZone = $domesticZone;

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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => DomesticZoneExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'domesticZone' => $this->domesticZone
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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => DomesticZoneExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'domesticZone' => $this->domesticZone,
                        'language' => 'en'
                    ]
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
        ]);
        
        $inputFilter->add([
            'name'  => 'updated_by',
            'required'  => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);    
        
    }
}