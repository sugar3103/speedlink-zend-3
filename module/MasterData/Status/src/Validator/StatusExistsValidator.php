<?php
namespace Status\Validator;

use Status\Entity\Status;
use Zend\Validator\AbstractValidator;

class StatusExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'status' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const STATUS_EXISTS = 'statusExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::STATUS_EXISTS => 'Another a name already exists'
    ];

    /**
     * StatusExistsValidator constructor.
     * @param null $options
     */
    public function __construct($options = null)
    {
        // set filter options if provided.
        if (is_array($options) && isset($options['entityManager']))
            $this->options['entityManager'] = $options['entityManager'];

        if (is_array($options) && isset($options['status']))
            $this->options['status'] = $options['status'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if status exists.
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
            $status = $entityManager->getRepository(Status::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $status = $entityManager->getRepository(Status::class)->findOneBy(array('name_en' => $value));       
        }

        if ($this->options['status'] == null)
            $isValid = ($status == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['status']->getNameEn() != $value && $status != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['status']->getName() != $value && $status != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }
        
      

        // if there were an error, set error message.
        if (!$isValid)
            $this->error(self::STATUS_EXISTS);

        // return validation result
        return $isValid;
    }
}