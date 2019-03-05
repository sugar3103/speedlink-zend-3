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
        $result = [
            "data" => []
        ];

        $fieldsMap = ['name'];
        list($start, $limit, $sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
        $dataShipmentType = $this->fieldVasManager->getListFieldVasByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["data"] = !empty($dataShipmentType['listFieldVas']) ? $dataShipmentType['listFieldVas'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }
}