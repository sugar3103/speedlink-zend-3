<?php
namespace PricingDomestic\Validator;

use Zend\Validator\AbstractValidator;
use PricingDomestic\Entity\DomesticZone;

class DomesticZoneExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'domesticZone' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_ZONE_EXISTS = 'domesticZoneExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::DOMESTIC_ZONE_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['domesticZone']))
            $this->options['domesticZone'] = $options['domesticZone'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if domesticZone exists.
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
        if($this->options['language'] === NULL) {
            $domesticZone = $entityManager->getRepository(DomesticZone::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $domesticZone = $entityManager->getRepository(DomesticZone::class)->findOneBy(array('name_en' => $value));       
        }

        //English
        if ($this->options['domesticZone'] == null)
            $isValid = ($domesticZone == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['domesticZone']->getNameEn() != $value && $domesticZone != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['domesticZone']->getName() != $value && $domesticZone != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::DOMESTIC_ZONE_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}