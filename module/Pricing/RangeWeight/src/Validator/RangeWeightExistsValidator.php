<?php
namespace RangeWeight\Validator;

use RangeWeight\Entity\RangeWeight;
use Zend\Validator\AbstractValidator;

class RangeWeightExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'rangeweight' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const RANGEWEIGHT_EXISTS = 'rangeweightExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::RANGEWEIGHT_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['rangeweight']))
            $this->options['rangeweight'] = $options['rangeweight'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if rangeweight exists.
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
            $rangeweight = $entityManager->getRepository(RangeWeight::class)->findOneBy(array('name' => $value, 'is_deleted' => 0));
        } else if($this->options['language'] === 'en') {
            $rangeweight = $entityManager->getRepository(RangeWeight::class)->findOneBy(array('name_en' => $value, 'is_deleted' => 0));       
        }

       
        //English
        if ($this->options['rangeweight'] == null)
            $isValid = ($rangeweight == null);
        else {
           
            if($this->options['language'] === 'en') {
                if ($this->options['rangeweight']->getNameEn() != $value && $rangeweight != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['rangeweight']->getName() != $value && $rangeweight != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::RANGEWEIGHT_EXISTS);
        }
          
        // return validation result
        return $isValid;
    }
}