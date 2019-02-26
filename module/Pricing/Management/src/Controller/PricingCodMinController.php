<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingCodMinForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingCodMinManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingCodMin;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingCodMinController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingCodMin Manager.
     * @var PricingCodMinManager
     */
    protected $pricingCodMinManager;

    /**
     * PricingCodMinController constructor.
     * @param $entityManager
     * @param $pricingCodMinManager
     */

    public function __construct($entityManager, $pricingCodMinManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingCodMinManager = $pricingCodMinManager;
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
        $param = $this->getRequestData();
        if (empty($param)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        $form = new PricingCodMinForm('create', $this->entityManager);
        $form->setData($param);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new pricingCodMin
                $this->pricingCodMinManager->addPricingCodMin($data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have added a pricingCodMin!";
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

        //Create New Form PricingCodMin
        $pricingCodMin = $this->entityManager->getRepository(PricingCodMin::class)->find($data['id']);
        $form = new PricingCodMinForm('update', $this->entityManager, $pricingCodMin);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new pricingCodMin
                $this->pricingCodMinManager->updatePricingCodMin($pricingCodMin, $data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have edited a pricingCodMin!";
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
        //Create New Form PricingCodMin
        $pricingCodMin = $this->entityManager->getRepository(PricingCodMin::class)->find($data['id']);

        //validate form
        if(!empty($pricingCodMin)) {
            try {
                $this->pricingCodMinManager->deletePricingCodMin($pricingCodMin, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted pricingCodMin!";
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