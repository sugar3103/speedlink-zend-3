<?php
namespace Address\Validator;

use Address\Entity\City;
use Zend\Validator\AbstractValidator;

class CodeExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'city' => null,
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const CITY_EXISTS = 'cityExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::CITY_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['city']))
            $this->options['city'] = $options['city'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if city exists.
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

        $city = $entityManager->getRepository(City::class)
            ->findOneByName($value);

        if ($this->options['city'] == null)
            $isValid = ($city == null);
        elseif ($this->options['city']->getName() != $value && $city != null)
            $isValid = false;
        else
            $isValid = true;

        // if there were an error, set error message.
        if (!$isValid)
            $this->error(self::CITY_EXISTS);

        // return validation result
        return $isValid;
    }
}