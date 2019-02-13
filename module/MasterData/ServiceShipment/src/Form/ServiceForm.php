<?php
namespace ServiceShipment\Form;

use ServiceShipment\Entity\Service;
use Doctrine\ORM\EntityManager;
use ServiceShipment\Validator\ServiceCodeExistsValidator;
use ServiceShipment\Validator\ServiceNameExistsValidator;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class ServiceForm extends Form {
    
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
     * Current Service.
     * @var Service
     */
    private $service = null;

    public function __construct($scenario = 'create', $entityManager = null, $service = null)
    {
        // Define form name.
        parent::__construct('service-form');
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->service = $service;

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
                    'name' => ServiceNameExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'service' => $this->service
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
                    'name' => ServiceNameExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'service' => $this->service
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
                    'name' => ServiceCodeExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'service' => $this->service
                    ]
                ]
            ]
        ]);
        
    }
}