<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingManager;
use Management\Entity\Pricing;

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

        $fieldsMap = ['name'];
        list($start, $limit, $sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
        $dataShipmentType = $this->pricingManager->getListPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["total"] = $dataShipmentType['totalPricing'];
        $result["data"] = !empty($dataShipmentType['listPricing']) ? $dataShipmentType['listPricing'] : [];
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
        //Create New Form Pricing
        $form = new PricingForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new pricing
                $this->pricingManager->addPricing($data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have added a pricing!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->error_code = -1;
            $this->apiResponse = $form->getMessages();
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

        //Create New Form Pricing
        $pricing = $this->entityManager->getRepository(Pricing::class)->find($data['id']);
        $form = new PricingForm('update', $this->entityManager, $pricing);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new pricing
                $this->pricingManager->updatePricing($pricing, $data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have edited a pricing!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->error_code = -1;
            $this->apiResponse = $form->getMessages();
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
        //Create New Form Pricing
        $pricing = $this->entityManager->getRepository(Pricing::class)->find($data['id']);

        //validate form
        if(!empty($pricing)) {
            try {
                $this->pricingManager->deletePricing($pricing, $user);
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