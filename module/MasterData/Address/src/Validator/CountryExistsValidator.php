<?php
namespace Address\Validator;

use Address\Entity\Country;
use Zend\Validator\AbstractValidator;

class CountryExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'country' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const COUNTRY_EXISTS = 'countryExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::COUNTRY_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['country']))
            $this->options['country'] = $options['country'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if country exists.
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
            $country = $entityManager->getRepository(Country::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $country = $entityManager->getRepository(Country::class)->findOneBy(array('name_en' => $value));
        }

       
        if ($this->options['country'] == null)
            $isValid = ($country == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['country']->getNameEn() != $value && $status != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['country']->getName() != $value && $status != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }
        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::COUNTRY_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}