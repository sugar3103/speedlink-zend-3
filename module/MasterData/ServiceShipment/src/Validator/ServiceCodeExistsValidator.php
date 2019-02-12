<?php
namespace ServiceShipment\Validator;

use ServiceShipment\Entity\Service;
use Zend\Validator\AbstractValidator;

class ServiceCodeExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'service' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const SERVICE_EXISTS = 'serviceExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::SERVICE_EXISTS => 'Code already exists'
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

        if (is_array($options) && isset($options['service']))
            $this->options['service'] = $options['service'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if service exists.
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
        $service = $entityManager->getRepository(Service::class)->findOneBy(array('code' => $value));

        if ($this->options['service'] == null) {
            $isValid = ($service == null);
        } elseif ($this->options['service']->getCode() != $value && $service != null) {
            $isValid = false;
        } else {
            $isValid = true;
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::SERVICE_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}