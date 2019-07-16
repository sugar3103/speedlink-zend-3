<?php
namespace ZoneCode\Validator;

use ZoneCode\Entity\ZoneCode;
use Zend\Validator\AbstractValidator;

class ZoneExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'zone' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const zone_EXISTS = 'zoneExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::zone_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['zone']))
            $this->options['zone'] = $options['zone'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if zone exists.
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
            $zone = $entityManager->getRepository(ZoneCode::class)->findOneBy(['name' => $value, 'is_deleted' => 0]);
        } else if($this->options['language'] === 'en') {
            $zone = $entityManager->getRepository(ZoneCode::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));       
        }

        //English
        if ($this->options['zone'] == null)
            $isValid = ($zone == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['zone']->getNameEn() != $value && $zone != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['zone']->getName() != $value && $zone != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }
        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::zone_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}