<?php
namespace PricingDomestic\Validator;

use Zend\Validator\AbstractValidator;
use PricingDomestic\Entity\DomesticPricing;

class DomesticPricingExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'domesticPricing' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_PRICING_EXISTS = 'domesticPricingExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::DOMESTIC_PRICING_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['domesticPricing']))
            $this->options['domesticPricing'] = $options['domesticPricing'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if domesticPricing exists.
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
            $domesticPricing = $entityManager->getRepository(DomesticPricing::class)->findOneBy(['name'=>$value, 'is_deleted' => 0]);
        } else if($this->options['language'] === 'en') {
            $domesticPricing = $entityManager->getRepository(DomesticPricing::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));       
        }

        //English
        if ($this->options['domesticPricing'] == null)
            $isValid = ($domesticPricing == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['domesticPricing']->getNameEn() != $value && $domesticPricing != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['domesticPricing']->getName() != $value && $domesticPricing != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::DOMESTIC_PRICING_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}