<?php
namespace Address\Form;

use Address\Entity\Ward;
use Address\Validator\WardExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class WardForm extends Form
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
     * Current Ward.
     * @var Ward
     */
    private $ward = null;

    public function __construct($scenario = 'create', $entityManager = null, $ward = null)
    {
        // Define form name.
        parent::__construct('ward-form');

        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->ward = $ward;

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
                    'name' => WardExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'ward' => $this->ward
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
                    'name' => WardExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'ward' => $this->ward,
                        'language'=> 'en'
                    ]
                ]
            ]
        ]);
        
        $inputFilter->add([
            'name' => 'district_id',
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
            'name'  => 'ras',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);

        $inputFilter->add([
            'name'  => 'postal_code',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ] 
        ]);
    }
}