<?php
namespace PricingSpecial\Form;

use PricingSpecial\Entity\SpecialArea;
use PricingSpecial\Validator\SpecialAreaExistsValidator;
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
     * Current SpecialArea.
     * @var SpecialArea
     */
    private $specialArea = null;

    public function __construct($scenario = 'create', $entityManager = null, $specialArea = null)
    {
        // Define form name.
        parent::__construct('special-area-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->specialArea = $specialArea;

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
                // [
                //     'name' => SpecialAreaExistsValidator::class,
                //     'options' => [
                //         'entityManager' => $this->entityManager,
                //         'specialArea' => $this->specialArea
                //     ]
                // ]
            ]
        ]);
        
        $inputFilter->add([
            'name' => 'customer_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);
    }
}