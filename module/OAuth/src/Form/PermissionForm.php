<?php

namespace OAuth\Form;

use OAuth\Entity\Permission;
use OAuth\Validator\PermissionExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Form\Element\Csrf;
use Zend\Form\Element\Submit;
use Zend\Form\Element\Text;
use Zend\Form\Element\Textarea;
use Zend\Form\Form;
use Zend\Validator\StringLength;

/**
 * The form for collecting information about Permission.
 * @package OAuth\Form
 */
class PermissionForm extends Form
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
    private $entityManager;

    /**
     * Permission
     * @var Permission
     */
    private $permission;

    public function __construct($scenario = 'create', $entityManager = null, $permission = null)
    {
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->permission = $permission;

        // Define form name
        parent::__construct('permission-form');
        $this->addInputFilter();
    }


    /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter()
    {
        // Create input filter.
        $inputFilter = $this->getInputFilter();

        // Add input for "name" field
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
                        'min' => 1,
                        'max' => 128
                    ]
                ],
                [
                    'name' => PermissionExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'permission' => $this->permission
                    ]
                ]
            ]
        ]);

        // Add input for "description" field.
        $inputFilter->add([
            'name' => 'description',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 1,
                        'max' => 1024
                    ]
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
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 1,
                        'max' => 1024
                    ]
                ]
            ]
        ]);
    }
}