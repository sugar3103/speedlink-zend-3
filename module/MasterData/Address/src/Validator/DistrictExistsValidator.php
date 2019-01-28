<?php
namespace Address\Validator;

use Address\Entity\District;
use Zend\Validator\AbstractValidator;

class DistrictExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'district' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DISTRICT_EXISTS = 'districtExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::DISTRICT_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['district']))
            $this->options['district'] = $options['district'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if district exists.
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
            $district = $entityManager->getRepository(District::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $district = $entityManager->getRepository(District::class)->findOneBy(array('name_en' => $value));       
        }

        if ($this->options['district'] == null)
            $isValid = ($district == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['district']->getNameEn() != $value && $district != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['district']->getName() != $value && $district != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::DISTRICT_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}