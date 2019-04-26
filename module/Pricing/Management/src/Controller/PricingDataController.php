<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingDataForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingDataManager;
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
            }
            $result['error_code'] = 1;
            $result['message'] = 'Success';
            $result["total"] = $dataShipmentType['totalPricingData'];
            $result["data"] = !empty($dataShipmentType['listPricingData']) ? $dataShipmentType['listPricingData'] : [];
            $this->apiResponse = $result;
        }
        return $this->createResponse();
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