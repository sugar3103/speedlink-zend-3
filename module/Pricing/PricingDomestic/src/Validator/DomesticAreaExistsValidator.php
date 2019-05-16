<?php
namespace PricingDomestic\Validator;

use Zend\Validator\AbstractValidator;
use PricingDomestic\Entity\DomesticArea;

class DomesticAreaExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'domesticArea' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_AREA_EXISTS = 'domesticAreaExists';

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

        if (is_array($options) && isset($options['domesticArea']))
            $this->options['domesticArea'] = $options['domesticArea'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if domesticArea exists.
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
            $domesticArea = $entityManager->getRepository(DomesticArea::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $domesticArea = $entityManager->getRepository(DomesticArea::class)->findOneBy(array('name_en' => $value));       
        }

        //English
        if ($this->options['domesticArea'] == null)
            $isValid = ($domesticArea == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['domesticArea']->getNameEn() != $value && $domesticArea != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['domesticArea']->getName() != $value && $domesticArea != null)
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