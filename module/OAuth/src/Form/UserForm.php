<?php
namespace OAuth\Form;

use OAuth\Entity\User;
use OAuth\Validator\UserExistsValidator;
use Doctrine\ORM\EntityManager;
use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Form;
use Zend\InputFilter\ArrayInput;
use Zend\Validator\GreaterThan;
use Zend\Validator\Identical;
use Zend\Validator\InArray;
use Zend\Validator\StringLength;
use Zend\Validator\File\IsImage;
use Zend\Validator\File\Extension;
use Zend\Filter\File\RenameUpload;

class UserForm extends Form {

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
     * Current user.
     * @var User
     */
    private $user = null;

    public function __construct($scenario = 'create', $entityManager = null, $user = null)
    {
        // Define form name.
        parent::__construct('user-form');

        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->user = $user;

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
            'name' => 'username',
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
                    'name' => UserExistsValidator::class,
                    'options' => [
                        'entityManager' => $this->entityManager,
                        'user' => $this->user
                    ]
                ]
            ]
        ]);

        // Add input for "first_name" field
        $inputFilter->add([
            'name' => 'first_name',
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
                        'max' => 50
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'last_name',
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
                        'max' => 50,
                    ]
                ]
            ]
        ]);
        $inputFilter->add([
            'name' => 'email',
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
                        'max' => 50,
                    ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'avatar',
            'required'=> false,
            'validators'=> [
                [
                    'name' => Extension::class,
                    'options'=> [
                        'extension' => ['jpg','png','gif','jpeg'],
                        'case' => false
                    ],
                    [
                        'name' => IsImage::class,
                    ],
                ]
            ],
            'filters' => [
                [
                    'name' => RenameUpload::class,
                    'options' => [
                        'target' => 'data/',
                        'use_upload_name' => true,
                        'use_upload_extension' => false,
                        'overwrite' => true,
                        'randomize' => true
                    ]
                ]
            ]
        ]);
            // Add input for "password" field.
            $inputFilter->add([
                'name' => 'password',
                'required' => ($this->scenario == 'create') ? true : false,
                'filters' => [],
                'validators' => [
                    [
                        'name' => StringLength::class,
                        'options' => [
                            'min' => 2,
                            'max' => 50
                        ]
                    ]
                ]
            ]);
            // Add input for "confirm_password" field.
            $inputFilter->add([
                'name' => 'confirm_password',
                'required' => ($this->scenario == 'create') ? true : false,
                'filters' => [],
                'validators' => [
                    [
                        'name' => Identical::class,
                        'options' => [
                            'token' => 'password'
                        ]
                    ]
                ]
            ]);
        
            // Add input for "is_active" field.
            $inputFilter->add([
                'name' => 'is_active',
                'required' => true,
                'filters' => [
                    [
                        'name' => ToInt::class
                    ]
                ]                
            ]);

            // Add input for "roles" field
            $inputFilter->add([
                'class' => ArrayInput::class,
                'name' => 'roles',
                'required' => false,
                'filters' => [
                    [
                        'name' => ToInt::class
                    ]
                ],
                'validators' => [
                    [
                        'name' => GreaterThan::class,
                        'options' => [
                            'min' => 0
                        ]
                    ]
                ]
            ]);
        
    }
}