<?php
namespace Address\Form;

use Address\Entity\City;
use Address\Validator\CityExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class CityForm extends Form
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
     * Current City.
     * @var City
     */
    private $city = null;

    public function __construct($scenario = 'create', $entityManager = null, $city = null)
    {
        // Define form name.
        parent::__construct('city-form');

        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->city = $city;

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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => CityExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'city' => $this->city
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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => CityExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'city' => $this->city,
                        'language'=> 'en'
                    ]
                ]
            ]
        ]);
        
        $inputFilter->add([
            'name' => 'country_id',
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

        $inputFilter->add([
            'name'  => 'zip_code',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
    }
}