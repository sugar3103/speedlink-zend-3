<?php
namespace OAuth\Validator;

use OAuth\Entity\User;
use Zend\Validator\AbstractValidator;

class UserExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'user' => null,
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const USER_EXISTS = 'userExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The username must be a scalar value',
        self::USER_EXISTS => 'Another user with such an username already exists'
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

        if (is_array($options) && isset($options['user']))
            $this->options['user'] = $options['user'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if user exists.
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

        $user = $entityManager->getRepository(User::class)
            ->findOneByUsername($value);

        if ($this->options['user'] == null)
            $isValid = ($user == null);
        elseif ($this->options['user']->getUsername() != $value && $user != null)
            $isValid = false;
        else
            $isValid = true;

        // if there were an error, set error message.
        if (!$isValid)
            $this->error(self::USER_EXISTS);

        // return validation result
        return $isValid;
    }
}