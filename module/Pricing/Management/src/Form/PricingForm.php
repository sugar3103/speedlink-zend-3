<?php
namespace Management\Form;

use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;
use Management\Validator\PricingNameExistsValidator;
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

    public function __construct($scenario = 'create', $entityManager = null, $pricing = null)
    {
        // Define form name.
        parent::__construct('pricing-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->pricing = $pricing;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();

        $inputFilter->add([
            'name' => 'description',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'description_en',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'status',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'category_code' => 'category_code',
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
            'carrier_id' => 'carrier_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'customer_id' => 'customer_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'saleman_id' => 'saleman_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'status' => 'status',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'is_private' => 'is_private',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'approval_status' => 'approval_status',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'approval_by' => 'approval_by',
            'required'  => true,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ]
        ]);

        $inputFilter->add([
            'affected_date' => 'affected_date',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'expired_date' => 'expired_date',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'origin_country_id' => 'origin_country_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'origin_city_id' => 'origin_city_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'origin_district_id' => 'origin_district_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        $inputFilter->add([
            'origin_ward_id' => 'origin_ward_id',
            'required'  => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);
    }
}