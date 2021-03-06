<?php
namespace PricingDomestic\Form;

use PricingDomestic\Entity\DomesticArea;
use PricingDomestic\Validator\DomesticAreaExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\ToInt;
use Zend\Filter\StringTrim;
use Zend\Validator\StringLength;

use Zend\Form\Form;

class AreaForm extends Form {
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
     * Current DomesticArea.
     * @var DomesticArea
     */
    private $domesticArea = null;

    public function __construct($scenario = 'create', $entityManager = null, $domesticArea = null)
    {
        // Define form name.
        parent::__construct('domestic-area-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->domesticArea = $domesticArea;

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
                ],
                [
                    'name' => DomesticAreaExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'domesticArea' => $this->domesticArea
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
                    'name' => DomesticAreaExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'domesticArea' => $this->domesticArea,
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
        
        $inputFilter->add([
            'name'  => 'cities',
            'required'  => false,            
        ]);
    }
}