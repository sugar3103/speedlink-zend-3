<?php
namespace PricingSpecial\Validator;

use Zend\Validator\AbstractValidator;
use PricingSpecial\Entity\SpecialArea;

class SpecialAreaExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'specialArea' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_AREA_EXISTS = 'specialAreaExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::DOMESTIC_AREA_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['specialArea']))
            $this->options['specialArea'] = $options['specialArea'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if specialArea exists.
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
            $specialArea = $entityManager->getRepository(SpecialArea::class)->findOneBy(['name' => $value, 'is_deleted' => 0]);
        } else if($this->options['language'] === 'en') {
            $specialArea = $entityManager->getRepository(SpecialArea::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));       
        }

        //English
        if ($this->options['specialArea'] == null)
            $isValid = ($specialArea == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['specialArea']->getNameEn() != $value && $specialArea != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['specialArea']->getName() != $value && $specialArea != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::DOMESTIC_AREA_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}