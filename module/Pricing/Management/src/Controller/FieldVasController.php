<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\FieldVasForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\FieldVas;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class FieldVasController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * FieldVas Manager.
     * @var FieldVasManager
     */
    protected $fieldVasManager;

    /**
     * FieldVasController constructor.
     * @param $entityManager
     * @param $fieldVasManager
     */

    public function __construct($entityManager, $fieldVasManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->fieldVasManager = $fieldVasManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Field Vas Index Action'
      ];
      return $this->createResponse();
    }
}