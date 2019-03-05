<?php
namespace Address\Form;

use Address\Entity\Country;
use Address\Validator\CountryExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class CountryForm extends Form
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
     * Current Country.
     * @var Country
     */
    private $country = null;

    public function __construct($scenario = 'create', $entityManager = null, $country = null)
    {
        // Define form name.
        parent::__construct('country-form');

        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->country = $country;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter()
    {
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
                        'min' => 4,
                        'max' => 50
                    ]
                ],
                [
                    'name' => CountryExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'country' => $this->country
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
                    'name' => CountryExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'country' => $this->country,
                        'language' => 'en'
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
            'name'  => 'iso_code',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ] 
        ]);
    }
}