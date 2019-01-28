<?php
namespace OAuth\Form;

use Zend\Filter\StringTrim;
use Zend\Filter\ToInt;
use Zend\Form\Element\Checkbox;
use Zend\Form\Element\Csrf;
use Zend\Form\Element\Hidden;
use Zend\Form\Element\Password;
use Zend\Form\Element\Select;
use Zend\Form\Element\Submit;
use Zend\Form\Element\Text;
use Zend\Form\Form;
use Zend\Validator\InArray;
use Zend\Validator\StringLength;

/**
 * This form is used to collect user's login, password and "Remember Me" flag.
 */
class LoginForm extends Form {

    /**
     * LoginForm constructor.
     * @param null $name
     * @param array $options
     */
    public function __construct($name = null, array $options = [])
    {
        // define form name.
        parent::__construct('login-form');

        // set POST method for this form.
        $this->setAttribute('method', 'post');

        $this->addElements();
        $this->addInputFilter();
    }

    public function addElements() {
        // add "username" field.
        $this->add([
            'type' => Text::class,
            'name' => 'username',
            'options' => [
                'label' => 'Username',
            ]
        ]);

        // add "password" field.
        $this->add([
            'type' => Password::class,
            'name' => 'password',
            'options' => [
                'label' => 'Password',
            ]
        ]);

        // Add "remember_me" field.
        $this->add([
            'type' => Checkbox::class,
            'name' => 'remember_me',
            'options' => [
                'label' => 'Remember Me'
            ]
        ]);

        // Add "redirect_url" field.
        $this->add([
            'type' => Hidden::class,
            'name' => 'redirect_url'
        ]);

        // Add the CSRF field.
        $this->add([
            'type' => Csrf::class,
            'name' => 'csrf',
            'options' => [
                'csrf_options' => [
                    'timeout' => 600
                ]
            ]
        ]);

        // add the "stock_id" field.
        $this->add([
            'type' => Select::class,
            'name' => 'stock_id',
            'options' => [
                'value_options' => [
                    1 => 'SGN',
                    2 => 'HAN',
                    3 => 'DAN'
                ]
            ]
        ]);

        // Add the submit button.
        $this->add([
            'type' => Submit::class,
            'name' => 'submit',
            'attributes' => [
                'value' => 'Sign In',
                'id' => 'submit'
            ]
        ]);
    }

    /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // create main input filter.
        $inputFilter = $this->getInputFilter();

        // add input for "email" field.
        $inputFilter->add([
            'name' => 'username',
            'required' => true,
            'filters' => [
                [
                    'name' => StringTrim::class
                ]
            ]
        ]);

        // add input for "remember_me" field.
        $inputFilter->add([
            'name' => 'password',
            'required' => true,
            'validator' => [
                [
                    'name' => 'password',
                    'options' => [
                        'min' => 6,
                        'max' => 64,
                    ]
                ]
            ]
        ]);

        // add input for "remember_me" field
        $inputFilter->add([
            'name' => 'remember_me',
            'required' => false,
            'validators' => [
                [
                    'name' => InArray::class,
                    'options' => [
                        'haystack' => [
                            0, 1
                        ]
                    ]
                ]
            ]
        ]);

        // add input for "redirect_url" field.
        $inputFilter->add([
            'name' => 'redirect_url',
            'required' => false,
            'filters' => [
                [
                    'name' => StringTrim::class,
                ]
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'min' => 0,
                        'max' => 2048
                    ]
                ]
            ]
        ]);

        // add input for "stock_id" field.
        $inputFilter->add([
            'name' => 'stock_id',
            'required' => false,
            'filters' => [
                [
                    'name' => ToInt::class
                ]
            ],
        ]);

        // add input for "stock_id" field.
        $inputFilter->add([
            'name' => 'csrf',
            'required' => false           
        ]);
    }
}