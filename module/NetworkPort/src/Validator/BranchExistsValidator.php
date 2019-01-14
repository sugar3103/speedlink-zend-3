<?php
namespace NetworkPort\Validator;

use NetworkPort\Entity\Branch;
use Zend\Validator\AbstractValidator;

class BranchExistsValidator extends AbstractValidator {

    /**
     * Available validator options.
     * @var array
     */
    protected $options = [
        'entityManager' => null,
        'branch' => null,
    ];

    /**
     * Validation failure message IDs.
     */
    const NOT_SCALAR = 'notScalar';
    const BRANCH_EXISTS = 'branchExists';

    /**
     * Validation failure messages.
     */
    protected $messageTemplates = [
        self::NOT_SCALAR => 'The name must be a scalar value',
        self::BRANCH_EXISTS => 'Another a name already exists'
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

        if (is_array($options) && isset($options['branch']))
            $this->options['branch'] = $options['branch'];

        // call the parent class constructor
        parent::__construct($options);
    }

    /**
     * Check if branch exists.
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
 
        $branch = $entityManager->getRepository(Branch::class)->findOneByName($value);

        if ($this->options['branch'] == null)
            $isValid = ($branch == null);
        elseif ($this->options['branch']->getName() != $value && $branch != null)
            $isValid = false;
        else
            $isValid = true;

        // if there were an error, set error message.
        if (!$isValid)
            $this->error(self::BRANCH_EXISTS);
          
        // return validation result
        return $isValid;
    }
}