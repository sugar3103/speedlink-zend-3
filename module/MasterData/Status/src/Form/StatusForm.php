<?php
namespace Status\Form;

use Status\Entity\Status;
use Status\Validator\StatusExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class StatusForm extends Form {
    
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
     * Current Status.
     * @var Status
     */
    private $status = null;

    public function __construct($scenario = 'create', $entityManager = null, $status = null)
    {
        // Define form name.
        parent::__construct('status-form');

        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->status = $status;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => StatusExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'status' => $this->status
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
                    'name' => StatusExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'status' => $this->status
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

        if ($this->scenario == 'update') {
            $inputFilter->add([
                'name'  => 'updated_by',
                'required'  => true,
                'filters' => [
                    [
                        'name' => ToInt::class
                    ]
                ] 
            ]);
        } else {
            $inputFilter->add([
                'name'  => 'created_by',
                'required'  => true,
                'filters' => [
                    [
                        'name' => ToInt::class
                    ]
                ] 
            ]);
        }
    }
}