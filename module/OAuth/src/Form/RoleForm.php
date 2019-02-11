<?php
namespace OAuth\Form;

use OAuth\Entity\Role;
use OAuth\Validator\RoleExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Form\Element\Csrf;
use Zend\Form\Element\Select;
use Zend\Form\Element\Submit;
use Zend\Form\Element\Text;
use Zend\Form\Element\Textarea;
use Zend\Form\Form;
use Zend\Validator\StringLength;

/**
 * The form for collecting information about Role.
 * @package OAuth\Role
 */
class RoleForm extends Form {

    /**
     * Scenario ('create' or 'update')
     * @var string
     */
    private $scenario;

    /**
     * Entity Manager.
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var Role
     */
    private $role;

    public function __construct($scenario = 'create', $entityManager = null, $role = null)
    {
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->role = $role;

        // define form name.
        parent::__construct('role-form');

        $this->addInputFilter();
    }

    /**
     * This method creates input filter (user for form filtering/validation).
     */
    private function addInputFilter() {
        // Create input filter.
        $inputFilter = $this->getInputFilter();

        // Add input for "name" field.
        $inputFilter->add([
            'name' => 'name',
            'required' => true,
            'filters' => [
                [
                    'name' => StringTrim::class,
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 1,
                        'max' => 128,
                    ]
                ],
                [
                    'name' => RoleExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'role' => $this->role,
                    ]
                ]
            ]
        ]);

        // Add input for "name_en" field.
        $inputFilter->add([
            'name' => 'name_en',
            'required' => true,
            'filters' => [
                [
                    'name' => StringTrim::class,
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 1,
                        'max' => 128,
                    ]
                ],
                [
                    'name' => RoleExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'role'          => $this->role,
                        'language'      => 'en'
                    ]
                ]
            ]
        ]);

        // Add input for "description" field
        $inputFilter->add([
            'name' => 'description',
            'required' => false,
        ]);

        // Add input for "description" field
        $inputFilter->add([
            'name' => 'description_en',
            'required' => false,
        ]);

        // Add input for "inherit_roles" field.
        $inputFilter->add([
            'name' => 'inherit_roles',
            'required' => false,
        ]);
    }
}