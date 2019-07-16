<?php
namespace PricingDomestic\Validator;

use PricingDomestic\Entity\DomesticPricing;
use Zend\Validator\AbstractValidator;

class DomesticPricingCustomerExistsValidator extends AbstractValidator
{

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'domesticPricing' => null,
        'customer_id' => null,
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const DOMESTIC_PRICING_CUSTOMER_EXISTS = 'domesticPricingCustomerExists';

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

        if (is_array($options) && isset($options['domesticPricing'])) {
            $this->options['domesticPricing'] = $options['domesticPricing'];
        }

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
        $isValid = true;
        if (!is_scalar($value)) {
            $this->error(self::NOT_SCALAR);
            return false;
        }

        // Get Doctrine entity manager.
        $entityManager = $this->options['entityManager'];

        if ($this->options['domesticPricing'] == null) {
            $domesticPricing = $entityManager->getRepository(DomesticPricing::class)->findOneBy(['customer' => $value, 'is_deleted' => 0]);

            // if there were an error, set error message.
            if ($domesticPricing) {
                $this->error(self::DOMESTIC_PRICING_CUSTOMER_EXISTS);
                $isValid = false;
            }
        }
        
        // return validation result
        return $isValid;
    }
}
