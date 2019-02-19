<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\Pricing;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * Pricing Manager.
     * @var PricingManager
     */
    protected $pricingManager;

    /**
     * PricingController constructor.
     * @param $entityManager
     * @param $pricingManager
     */

    public function __construct($entityManager, $pricingManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingManager = $pricingManager;
    }

    public function indexAction()
    {
        $result = [
            "total" => 0,
            "data" => []
        ];

        $fieldsMap = ['code', 'name', 'name_en', 'status'];
        list($start, $limit, $sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
        $dataShipmentType = $this->pricingManager->getListPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["total"] = $dataShipmentType['totalShipmentType'];
        $result["data"] = !empty($dataShipmentType['listShipmentType']) ? $dataShipmentType['listShipmentType'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }
}