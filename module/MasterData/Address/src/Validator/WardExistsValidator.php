<?php
namespace Address\Validator;

use Address\Entity\Ward;
use Zend\Validator\AbstractValidator;

class WardExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'ward' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const WARD_EXISTS = 'wardExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::WARD_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['ward']))
            $this->options['ward'] = $options['ward'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if ward exists.
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
            $ward = $entityManager->getRepository(Ward::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $ward = $entityManager->getRepository(Ward::class)->findOneBy(array('name_en' => $value));       
        }

        if ($this->options['ward'] == null)
            $isValid = ($ward == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['ward']->getNameEn() != $value && $ward != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['ward']->getName() != $value && $ward != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::WARD_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}