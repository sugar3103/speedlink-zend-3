<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingVasManager;
use Management\Service\PricingVasSpecManager;
use Management\Entity\PricingVas;

class PricingVasController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

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
     * PricingVasController constructor.
     * @param $entityManager
     * @param $pricingVasManager
     * @param $pricingVasSpecManager
     */

    public function __construct($entityManager, $pricingVasManager, $pricingVasSpecManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingVasManager = $pricingVasManager;
        $this->pricingVasSpecManager = $pricingVasSpecManager;
    }

    public function indexAction()
    {
        $result = [
            'data' => [
                'list' => []
            ]
        ];

        $fieldsMap = [];
        $param = $this->getRequestData($fieldsMap);
        $dataVas = $this->pricingVasManager->getListVasByCondition($param);
        foreach ($dataVas as $key => $vas) {
            if ($vas['type'] == 1) {
                $param['pricing_vas_id'] = $vas['id'];
                $dataVasSpec = $this->pricingVasSpecManager->getListVasSpecByCondition($param);
                $dataVas[$key]['spec'] = !empty($dataVasSpec) ? $dataVasSpec : [];;
            } else {
                $dataVas[$key]['spec'] = [];
            }
        }
        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result['data']['list'] = !empty($dataVas) ? $dataVas : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

    public function updateVas()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        try {
            // add new pricing
            $this->pricingVasManager->updateVas($data, $user);
            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have added a pricing!";
        } catch (\Exception $e) {
            $this->error_code = -1;
            $this->apiResponse['message'] = "Fail: Please contact System Admin";
        }

        return $this->createResponse();
    }

    /*public function addAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        try {
            // add new pricing
            $this->pricingVasManager->addPricingVas($data, $user);
            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have added a pricing!";
        } catch (\Exception $e) {
            $this->error_code = -1;
            $this->apiResponse['message'] = "Fail: Please contact System Admin";
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
        $pricing = $this->entityManager->getRepository(PricingVas::class)->find($data['id']);

        try {
            // add new pricing
            $this->pricingVasManager->updatePricingVas($pricing, $data, $user);
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
        $pricing = $this->entityManager->getRepository(PricingVas::class)->find($data['id']);

        //validate form
        if(!empty($pricing)) {
            try {
                $this->pricingVasManager->deletePricingVas($pricing, $user);
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
    }*/
}