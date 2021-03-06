<?php
namespace NetworkPort\Validator;

use NetworkPort\Entity\Hub;
use Zend\Validator\AbstractValidator;

class HubExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'hub' => null,
        'language' => null
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const HUB_EXISTS = 'hubExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::HUB_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['hub']))
            $this->options['hub'] = $options['hub'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if hub exists.
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
            $hub = $entityManager->getRepository(Hub::class)->findOneByName($value);
        } else if($this->options['language'] === 'en') {
            $hub = $entityManager->getRepository(Hub::class)->findOneBy(array('name_en' => $value));       
        }

        //English
        if ($this->options['hub'] == null)
            $isValid = ($hub == null);
        else {
            if($this->options['language'] === 'en') {
                if ($this->options['hub']->getNameEn() != $value && $hub != null)
                    $isValid = false;
                else
                    $isValid = true;
            } else {
                if ($this->options['hub']->getName() != $value && $hub != null)
                    $isValid = false;
                else
                    $isValid = true;
            }
        }

        // if there were an error, set error message.
        if (!$isValid) {
            $this->error(self::HUB_EXISTS);
        }

        // return validation result
        return $isValid;
    }
}