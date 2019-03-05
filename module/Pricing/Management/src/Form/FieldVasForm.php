<?php
namespace Management\Form;

use Management\Entity\FieldVas;
use Doctrine\ORM\EntityManager;
use Zend\Form\Form;

class FieldVasForm extends Form {
    
    /**
     * Scenario ('create' or 'update')
     * @var string
     */
    private $scenario;

    /**
     * Entity Manager
     * @var EntityManager
     */
    private $entityManager = null;

    /**
     * Current FieldVas.
     * @var FieldVas
     */
    private $fieldVas = null;

    public function __construct($scenario = 'create', $entityManager = null, $fieldVas = null)
    {
        // Define form name.
        parent::__construct('field-vas-form');
        
        // Save parameters for internal use.
        $this->scenario = $scenario;
        $this->entityManager = $entityManager;
        $this->fieldVas = $fieldVas;

        $this->addInputFilter();
    }

     /**
     * This method creates input filter (used for form filtering/validation).
     */
    private function addInputFilter() {
        // Create main input filter.
        $inputFilter = $this->getInputFilter();
    }
}