<?php
namespace PricingSpecial\Validator;

use Zend\Validator\AbstractValidator;
use PricingSpecial\Entity\SpecialPricing;

class PricingSpecialExistsValidator extends AbstractValidator
{

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'specialPricing' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const SPECIAL_PRICING_EXISTS = 'specialPricingExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::SPECIAL_PRICING_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['specialPricing']))
            $this->options['specialPricing'] = $options['specialPricing'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if specialPricing exists.
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
            $specialPricing = $entityManager->getRepository(SpecialPricing::class)->findOneBy(['name' => $value, 'is_deleted' => 0]);
        } else if ($this->options['language'] === 'en') {
            $specialPricing = $entityManager->getRepository(SpecialPricing::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));
        }

        //English
        if ($this->options['specialPricing'] == null)
            $isValid = ($specialPricing == null);
        else {
            if ($this->options['specialPricing']->getName() != $value && $specialPricing != null)
                $isValid = false;
            else
                $isValid = true;
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::SPECIAL_PRICING_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}
