<?php
namespace ZoneCode\Validator;

use ZoneCode\Entity\ZoneCode;
use Zend\Validator\AbstractValidator;

class ZoneCodeExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'zonecode' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const ZONECODE_EXISTS = 'zonecodeExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::ZONECODE_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['zonecode']))
            $this->options['zonecode'] = $options['zonecode'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if zonecode exists.
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

        $zonecode = $entityManager->getRepository(ZoneCode::class)->findOneBy(array('code' => $value));  
        //English
        if ($this->options['zonecode'] == null)
            $isValid = ($zonecode == null);
        else {
            if ($this->options['zonecode']->getCode() != $value && $zonecode != null)
                    $isValid = false;
                else
                    $isValid = true;
        }
        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::ZONECODE_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}