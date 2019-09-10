<?php

namespace Customer\Validator;


use Zend\Validator\AbstractValidator;

class CustomerExistsValidator extends AbstractValidator
{

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'customer' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const CUSTOMER_EXISTS = 'customerExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::CUSTOMER_EXISTS => 'Another a name already exists'
    ];

    /**
     * UserExistsValidator constructor.
     * @param null $options
     */
    public function __construct($options = null)
    {
        // set filter options if provided.
        if (is_array($options) && isset($options['entityManager']))
            $this->options['entityManager'] = $options['entityManager'];

        if (is_array($options) && isset($options['customer']))
            $this->options['customer'] = $options['customer'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if customer exists.
     * @param mixed $value
     * @return bool
     */
    public function isValid($value)
    {
        if (!is_scalar($value)) {
            $this->error(self::NOT_SCALAR);
            return false;
        }
        // Get Doctrine entity manager.
        $entityManager = $this->options['entityManager'];
        if ($this->options['language'] === NULL) {
            $customer = $entityManager->getRepository(Branch::class)->findOneBy(array('name' => $value, 'is_deleted' => 0));
        }

        //English
        if ($this->options['customer'] == null)
            $isValid = ($customer == null);
        else {
            if ($this->options['customer']->getName() != $value && $customer != null)
                $isValid = false;
            else
                $isValid = true;
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::CUSTOMER_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}
