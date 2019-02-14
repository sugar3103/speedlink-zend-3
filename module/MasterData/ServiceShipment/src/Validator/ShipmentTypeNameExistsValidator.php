<?php
namespace ServiceShipment\Validator;

use Address\Entity\Country;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use Zend\Validator\AbstractValidator;

class ShipmentTypeNameExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'shipmentType' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const SHIPMENT_TYPE_EXISTS = 'shipmentTypeExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::SHIPMENT_TYPE_EXISTS => 'Another a name already exists'
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
     * Check if shipment type exists.
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
            $shipmentType = $entityManager->getRepository(ShipmentType::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $shipmentType = $entityManager->getRepository(ShipmentType::class)->findOneBy(array('name_en' => $value));
        }

        if ($this->options['shipmentType'] == null) {
            $isValid = ($shipmentType == null);
        } else {
            if($this->options['language'] === 'en') {
                if ($this->options['shipmentType']->getNameEn() != $value && $shipmentType != null) {
                    $isValid = false;
                } else {
                    $isValid = true;
                }
            } else {
                if ($this->options['shipmentType']->getName() != $value && $shipmentType != null) {
                    $isValid = false;
                } else {
                    $isValid = true;
                }
            }
        }

        // if there were an error, set error message.
        if (!$isValid)
            $this->error(self::SHIPMENT_TYPE_EXISTS);

        // return validation result
        return $isValid;
    }
}