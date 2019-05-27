<?php
namespace Address\Form;

use Address\Entity\District;
use Address\Validator\DistrictExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class DistrictForm extends Form
{
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
     * Current District.
     * @var District
     */
    private $district = null;

    public function __construct($scenario = 'create', $entityManager = null, $district = null)
    {
        // Define form name.
        parent::__construct('district-form');

        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->district = $district;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter()
    {
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
                    'name' => DistrictExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'district' => $this->district
                    ]
                ]
            ]
        ]);

        // Add input for "username" field.
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
                    'name' => DistrictExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'district' => $this->district,
                        'language'=> 'en'
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
    }
}