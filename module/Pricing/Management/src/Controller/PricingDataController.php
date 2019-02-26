<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingDataForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingData;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingDataController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingData Manager.
     * @var PricingDataManager
     */
    protected $pricingDataManager;

    /**
     * PricingDataController constructor.
     * @param $entityManager
     * @param $pricingDataManager
     */

    public function __construct($entityManager, $pricingDataManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingDataManager = $pricingDataManager;
    }

    public function indexAction()
    {
        $result = [
            "total" => 0,
            "data" => []
        ];

        $fieldsMap = ['pricing_id'];
        list($start, $limit, $sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
        $dataShipmentType = $this->pricingDataManager->getListPricingDataByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["total"] = $dataShipmentType['totalPricingData'];
        $result["data"] = !empty($dataShipmentType['listPricingData']) ? $dataShipmentType['listPricingData'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }
}