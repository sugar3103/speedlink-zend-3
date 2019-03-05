<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Entity\PricingVasSpec;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingVasSpecManager;

class PricingVasSpecController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingVasSpec Manager.
     * @var PricingVasSpecManager
     */
    protected $pricingVasSpecManager;

    /**
     * PricingVasSpecController constructor.
     * @param $entityManager
     * @param $pricingVasSpecManager
     */

    public function __construct($entityManager, $pricingVasSpecManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingVasSpecManager = $pricingVasSpecManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Not Thing to see here'
      ];
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
            // add new pricing
            $this->pricingVasSpecManager->addPricingVasSpec($data, $user);
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

        //Create New Form PricingVasSpec
        $pricing = $this->entityManager->getRepository(PricingVasSpec::class)->find($data['id']);

        try {
            // add new pricing
            $this->pricingVasSpecManager->updatePricingVasSpec($pricing, $data, $user);
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
        //Create New Form PricingVasSpec
        $pricing = $this->entityManager->getRepository(PricingVasSpec::class)->find($data['id']);

        //validate form
        if(!empty($pricing)) {
            try {
                $this->pricingVasSpecManager->deletePricingVasSpec($pricing, $user);
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