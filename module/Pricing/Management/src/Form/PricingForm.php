<?php
namespace Management\Form;

use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\Validator\StringLength;

class PricingForm extends Form {
    
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
     * Current Pricing.
     * @var Pricing
     */
    private $pricing = null;

    /**
     * Current Data.
     * @var $data
     */
    protected $data = null;

    public function __construct($scenario = 'create', $entityManager = null, $pricing = null, $data = null)
    {
        // Define form name.
        parent::__construct('pricing-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricing = $pricing;
        $this->data = $data;
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
            'name' => 'status',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'category_code',
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
                        'validator' => [
                            'name' => 'InArray',
                            'options' => [
                                'haystack' => ['Inbound', 'Outbound', 'Domestic']
                            ]
                        ]
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'carrier_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
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

        $inputFilter->add([
            'name' => 'saleman_id',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'is_private',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'approval_status',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'approval_by',
            'required' => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'effected_date',
            'required' => true,
            'filters' => [
                [
                    'name' => \DateTime::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'expired_date',
            'required' => true,
            'filters' => [
                [
                    'name' => \DateTime::class
                ]
            ],
            'validators' => [
                [
                    'name' => \DateTime::class,
                    'options' => [
                        'min' => $this->data['effected_date']
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'origin_country_id',
            'required' => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'origin_city_id',
            'required'  => $this->data['category_code'] == 'Domestic',
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'customer_id',
            'required' => $this->data['is_private'] == 1,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);
    }
}