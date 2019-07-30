<?php
namespace PricingSpecial\Validator;

use PricingSpecial\Entity\SpecialPricing;
use Zend\Validator\AbstractValidator;

class PricingSpecialCustomerExistsValidator extends AbstractValidator
{

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'specialPricing' => null,
        'customer_id' => null,
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_PRICING_CUSTOMER_EXISTS = 'specialPricingCustomerExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::DOMESTIC_PRICING_CUSTOMER_EXISTS => 'Pricing Customer an already exists',
    ];

    /**
     * UserExistsValidator constructor.
     * @param null $options
     */
    public function __construct($options = null)
    {
        // set filter options if provided.
        if (is_array($options) && isset($options['entityManager'])) {
            $this->options['entityManager'] = $options['entityManager'];
        }

        if (is_array($options) && isset($options['specialPricing'])) {
            $this->options['specialPricing'] = $options['specialPricing'];
        }

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
        $isValid = true;
        if (!is_scalar($value)) {
            $this->error(self::NOT_SCALAR);
            return false;
        }

        // Get Doctrine entity manager.
        $entityManager = $this->options['entityManager'];

        if ($this->options['specialPricing'] == null) {
            $specialPricing = $entityManager->getRepository(SpecialPricing::class)->findOneBy(['customer' => $value, 'is_deleted' => 0]);

            // if there were an error, set error message.
            if ($specialPricing) {
                $this->error(self::DOMESTIC_PRICING_CUSTOMER_EXISTS);
                $isValid = false;
            }
        }
        
        // return validation result
        return $isValid;
    }
}
