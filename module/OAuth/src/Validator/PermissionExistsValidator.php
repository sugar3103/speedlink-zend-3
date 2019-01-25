<?php
namespace OAuth\Validator;

use OAuth\Entity\Permission;
use Zend\Validator\AbstractValidator;

/**
 * This validator class is designed for checking if there is an existing permission
 * with such a name.
 * @package OAuth\Validator
 */
class PermissionExistsValidator extends AbstractValidator {

    /**
     * Available validator options
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'permission' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const PERMISSION_EXISTS = 'permissionExists';

    /**
     * Validation failure messages.
     * @var array
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => "The Permission must be a scalar value",
        self::PERMISSION_EXISTS => "Another permission with such nam already exists"
    ];

    /**
     * PermissionExistsValidator constructor.
     * @param null $options
     */
    public function __construct($options = null)
    {
        if (is_array($options) && isset($options['entityManager']))
            $this->options['entityManager'] = $options['entityManager'];
        if (is_array($options) && isset($options['permission']))
            $this->options['permission'] = $options['permission'];
        // call the parent class constructor.
        parent::__construct($options);
    }

    /**
     * Check if permission exists.
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

        $permission = $entityManager->getRepository(Permission::class)
            ->findOneByName($value);

        if ($this->options['permission'] == null)
            $isValid = ($permission == null);
        elseif ($this->options['permission']->getName() != $value && $permission != null)
            $isValid = false;
        else
            $isValid = true;

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::PERMISSION_EXISTS);
        }

        // return validation result.
        return $isValid;
    }
}