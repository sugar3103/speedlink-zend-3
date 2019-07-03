<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingDataForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingDataManager;
use Management\Service\PricingVasManager;
use Management\Service\PricingVasSpecManager;
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
     * PricingVas Manager.
     * @var PricingVasManager
     */
    protected $pricingVasManager;

    /**
     * PricingVas Manager.
     * @var PricingVasSpecManager
     */
    protected $pricingVasSpecManager;

    /**
     * PricingDataController constructor.
     * @param $entityManager
     * @param $pricingDataManager
     * @param $pricingVasManager
     * @param $pricingVasSpecManager
     */

    public function __construct($entityManager, $pricingDataManager, $pricingVasManager, $pricingVasSpecManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingDataManager = $pricingDataManager;
        $this->pricingVasManager = $pricingVasManager;
        $this->pricingVasSpecManager = $pricingVasSpecManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            $result = [
                "total" => 0,
                "data" => []
            ];

            $fieldsMap = ['pricing_id', 'name'];
            list($start, $limit, $sortField, $sortDirection, $filters) = $this->getRequestData($fieldsMap);
            $dataShipmentType = $this->pricingDataManager->getListPricingDataByCondition($start, $limit, $sortField, $sortDirection, $filters);
            foreach ($dataShipmentType['listPricingData'] as $key => $obj) {
                $dataShipmentType['listPricingData'][$key]['pricing_data'] = json_decode($obj['pricing_data']);
                $dataShipmentType['listPricingData'][$key]['pricing_vas'] = $this->getPricingVas($obj['id']);
            }
            $result['error_code'] = 1;
            $result['message'] = 'Success';
            $result["total"] = $dataShipmentType['totalPricingData'];
            $result["data"] = !empty($dataShipmentType['listPricingData']) ? $dataShipmentType['listPricingData'] : [];
            $this->apiResponse = $result;
        }
        return $this->createResponse();
    }

    private function getPricingVas($pricing_data_id) {
        $filter = array('pricing_data_id' => $pricing_data_id);
        $dataVas = $this->pricingVasManager->getListVasByCondition(1, 0, '', 'ASC', $filter);
        foreach ($dataVas as $key => $vas) {
            if ($vas['type'] == 1) {
                $param['pricing_vas_id'] = $vas['id'];
                $dataVasSpec = $this->pricingVasSpecManager->getListVasSpecByCondition($param);
                $dataVas[$key]['spec'] = !empty($dataVasSpec) ? $dataVasSpec : [];;
            } else {
                $dataVas[$key]['spec'] = [];
            }
        }
        return $dataVas;
    }

    public function editAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        //Create New Form PricingVas
        $pricing = $this->entityManager->getRepository(PricingData::class)->find($data['id']);

        try {
            // add new pricing
            $this->pricingDataManager->updatePricingData($pricing, $data, $user);
            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have edited a pricing!";
        } catch (\Exception $e) {
            $this->error_code = -1;
            $this->apiResponse['message'] = "Fail: Please contact System Admin";
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form PricingVas
        $pricing = $this->entityManager->getRepository(PricingData::class)->find($data['id']);

        //validate form
        if(!empty($pricing)) {
            try {
                $this->pricingDataManager->deletePricingData($pricing, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted pricing!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Pricing";
        }

        return $this->createResponse();
    }
}