<?php
namespace ServiceShipment\Validator;

use ServiceShipment\Entity\Carrier;
use Zend\Validator\AbstractValidator;

class CarrierCodeExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'carrier' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const CARRIER_EXISTS = 'carrierExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::CARRIER_EXISTS => 'Code already exists'
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

        if (is_array($options) && isset($options['carrier']))
            $this->options['carrier'] = $options['carrier'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if carrier exists.
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
        $carrier = $entityManager->getRepository(Carrier::class)->findOneBy(array('code' => $value, 'id_deleted' => 0));

        if ($this->options['carrier'] == null) {
            $isValid = ($carrier == null);
        } elseif ($this->options['carrier']->getCode() != $value && $carrier != null) {
            $isValid = false;
        } else {
            $isValid = true;
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::CARRIER_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}