<?php
namespace OAuth\Validator;

use OAuth\Entity\Role;
use Zend\Validator\AbstractValidator;

class RoleExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'role' => null
    ];

    // validator failure message IDs.
    const NOT_SCALAR = 'notScalar';
    const ROLE_EXISTS = 'roleExists';

    /**
     * Validation failure messages.
     * @var array
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => "The Role must be a scalar value",
        self::ROLE_EXISTS => "Another role with such name already exists"
    ];

    /**
     * RoleExistsValidator constructor.
     * @param null $options
     */
    public function __construct($options = null)
    {
        // set filter options (if provided).
        if (is_array($options) && isset($options['entityManager']))
            $this->options['entityManager'] = $options['entityManager'];
        if (is_array($options) && isset($options['role']))
            $this->options['role'] = $options['role'];
        // call the parent class constructor.
        parent::__construct($options);
    }

    /**
     * check if role exists.
     * @param mixed $value
     * @return bool
     */
    public function isValid($value)
    {
        if (!is_scalar($value)) {
            $this->error(self::NOT_SCALAR);
            return false;
        }

        // get doctrine entity manager.
        $entityManager = $this->options['entityManager'];

        $role = $entityManager->getRepository(Role::class)
            ->findOneByName($value);

        if ($this->options['role'] == null)
            $isValid = ($role == null);
        elseif ($this->options['role']->getName() != $value && $role != null)
            $isValid = false;
        else
            $isValid = true;

        // if there were an error, set error message.
        if (!$isValid)
            $this->error(self::ROLE_EXISTS);

        // Return validation result.
        return $isValid;
    }
}