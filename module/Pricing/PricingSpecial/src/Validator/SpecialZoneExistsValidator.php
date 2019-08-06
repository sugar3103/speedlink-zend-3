<?php
namespace PricingSpecial\Validator;

use Zend\Validator\AbstractValidator;
use PricingSpecial\Entity\SpecialZone;

class SpecialZoneExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'specialZone' => null,
        'fromCity' => null,
        'toCity' => null,
        'toDistrict' => null,
        'toWard' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const SPECIAL_ZONE_EXISTS = 'specialZoneExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::SPECIAL_ZONE_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['specialZone']))
            $this->options['specialZone'] = $options['specialZone'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if specialZone exists.
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
            $specialZone = $entityManager->getRepository(SpecialZone::class)->findOneBy(['name' => $value, 'is_deleted' => 0]);
        } else if($this->options['language'] === 'en') {
            $specialZone = $entityManager->getRepository(SpecialZone::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));       
        }         
        

        //English
        if ($this->options['specialZone'] == null)
            $isValid = ($specialZone == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['specialZone']->getNameEn() != $value && $specialZone != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['specialZone']->getName() != $value && $specialZone != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::SPECIAL_ZONE_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}