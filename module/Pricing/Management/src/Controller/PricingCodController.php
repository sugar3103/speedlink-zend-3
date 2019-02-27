<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingCodManager;
use Management\Service\PricingCodMinManager;
use Management\Entity\PricingCod;

class PricingCodController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingCod Manager.
     * @var PricingCodManager
     */
    protected $pricingCodManager;
    /**
     * PricingCod Manager.
     * @var PricingCodMinManager
     */
    protected $pricingCodMinManager;

    /**
     * PricingCodController constructor.
     * @param $entityManager
     * @param $pricingCodManager
     * @param $pricingCodMinManager
     */

    public function __construct($entityManager, $pricingCodManager, $pricingCodMinManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingCodManager = $pricingCodManager;
        $this->pricingCodMinManager = $pricingCodMinManager;
    }

    public function indexAction()
    {
        $result = [
            'data' => [
                'list' => [],
                'min' => []
            ]
        ];

        $fieldsMap = [];
        $param = $this->getRequestData($fieldsMap);
        $dataCod = $this->pricingCodManager->getListCodByCondition($param);
        $dataCodMin = $this->pricingCodMinManager->getListCodMinByCondition($param);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result['data']['list'] = !empty($dataCod) ? $dataCod : [];
        $result['data']['min'] = !empty($dataCodMin) ? $dataCodMin : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

    public function addAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        try {
            // add new pricingCod
            $this->pricingCodManager->addPricingCod($data['list'], $user);
            $this->pricingCodMinManager->addPricingCodMin($data['min'], $user);
            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have added a pricingCod!";
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

        //Create New Form PricingCod
        $pricingCod = $this->entityManager->getRepository(PricingCod::class)->find($data['id']);

        try {
            // add new pricingCod
            $this->pricingCodManager->updatePricingCod($pricingCod, $data, $user);
            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have edited a pricingCod!";
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
        //Create New Form PricingCod
        $pricingCod = $this->entityManager->getRepository(PricingCod::class)->find($data['id']);

        //validate form
        if(!empty($pricingCod)) {
            try {
                $this->pricingCodManager->deletePricingCod($pricingCod, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted pricingCod!";
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