<?php
namespace ServiceShipment\Validator;

use ServiceShipment\Entity\Service;
use Zend\Validator\AbstractValidator;

class ServiceIdExistsValidator extends AbstractValidator {

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
        self::SERVICE_EXISTS => 'Code not exists'
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

        if (is_array($options) && isset($options['shipmentType']))
            $this->options['shipmentType'] = $options['shipmentType'];

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
        $service = $entityManager->getRepository(Service::class)->find($value);

        if ($this->options['shipmentType'] == null) {
            $isValid = $service;
        } elseif ($this->options['shipmentType']->getId() != $value && $service != null) {
            $isValid = true;
        } else {
            $isValid = false;
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::SERVICE_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}