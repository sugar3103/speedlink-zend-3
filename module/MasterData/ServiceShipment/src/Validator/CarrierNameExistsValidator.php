<?php
namespace ServiceShipment\Validator;

use Address\Entity\Country;
use ServiceShipment\Entity\Carrier;
use Zend\Validator\AbstractValidator;

class CarrierNameExistsValidator extends AbstractValidator {

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
        self::CARRIER_EXISTS => 'Name already exists'
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
        if ($this->options['language'] === NULL) {
            $carrier = $entityManager->getRepository(Carrier::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $carrier = $entityManager->getRepository(Carrier::class)->findOneBy(array('name_en' => $value));
        }

        if ($this->options['carrier'] == null) {
            $isValid = ($carrier == null);
        } else {
            if($this->options['language'] === 'en') {
                if ($this->options['carrier']->getNameEn() != $value && $carrier != null) {
                    $isValid = false;
                } else {
                    $isValid = true;
                }
            } else {
                if ($this->options['carrier']->getName() != $value && $carrier != null) {
                    $isValid = false;
                } else {
                    $isValid = true;
                }
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::CARRIER_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}