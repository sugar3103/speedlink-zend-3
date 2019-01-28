<?php
namespace NetworkPort\Form;

use NetworkPort\Entity\Hub;
use NetworkPort\Validator\HubExistsValidator;
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

class HubForm extends Form {
    
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
     * Current Branch.
     * @var Branch
     */
    private $hub = null;

    public function __construct($scenario = 'create', $entityManager = null, $hub = null)
    {
        // Define form name.
        parent::__construct('hub-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->hub = $hub;

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
                    'name' => HubExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'hub' => $this->hub
                    ]
                ]
            ]
        ]);

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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => HubExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'hub' => $this->hub
                    ]
                ]
            ]
        ]);
        
        $inputFilter->add([
            'name' => 'city_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
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
        
    }
}