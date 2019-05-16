<?php
namespace PricingDomestic\Validator;

use Zend\Validator\AbstractValidator;
use PricingDomestic\Entity\DomesticRangeWeight;

class DomesticRangeWeightExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'domesticRangeWeight' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_ZONE_EXISTS = 'domesticRangeWeightExists';

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

        if (is_array($options) && isset($options['domesticRangeWeight']))
            $this->options['domesticRangeWeight'] = $options['domesticRangeWeight'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if domesticRangeWeight exists.
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
            $domesticRangeWeight = $entityManager->getRepository(DomesticRangeWeight::class)->findOneBy(['name' => $value, 'is_deleted' => 0]);
        } else if($this->options['language'] === 'en') {
            $domesticRangeWeight = $entityManager->getRepository(DomesticRangeWeight::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));       
        }

        //English
        if ($this->options['domesticRangeWeight'] == null)
            $isValid = ($domesticRangeWeight == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['domesticRangeWeight']->getNameEn() != $value && $domesticRangeWeight != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['domesticRangeWeight']->getName() != $value && $domesticRangeWeight != null)
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