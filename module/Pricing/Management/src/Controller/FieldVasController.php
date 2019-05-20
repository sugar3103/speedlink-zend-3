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
       
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [0 => 'id', 1 => 'name'];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);          
            
            //get list User by condition
            $dataFieldVas = $this->fieldVasManager->getListFieldVasByCondition($start, $limit, $sortField, $sortDirection,$filters); 
            
            $result = $this->filterByField($dataFieldVas['listFieldVas'], $fields);     
            
            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataFieldVas['totalFieldVas']
            );                        
        } 
        return $this->createResponse();
    }
}