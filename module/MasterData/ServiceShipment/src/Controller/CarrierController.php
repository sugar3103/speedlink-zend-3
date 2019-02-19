<?php
namespace ServiceShipment\Controller;

use Core\Controller\CoreController;
use ServiceShipment\Service\CarrierManager;
use Doctrine\ORM\EntityManager;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Form\CarrierForm;

class CarrierController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
    /**
     * @var CarrierManager
     */
    private $carrierManager;
   
    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $carrierManager
     */

    public function __construct($entityManager, $carrierManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->carrierManager = $carrierManager;
    }

    public function indexAction()
    {
        $result = [
            "total" => 0,
            "data" => []
        ];

        $fieldsMap = ['code', 'name', 'name_en', 'status'];
        list($start, $limit, $sortField, $sortDirection, $filters) = $this->getRequestData($fieldsMap);
        $dataCarrier = $this->carrierManager->getListCarrierByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["total"] = $dataCarrier['totalCarrier'];
        $result["data"] = !empty($dataCarrier['listCarrier']) ? $dataCarrier['listCarrier'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

    public function codeAction()
    {
        $result = array("data" => []);
        $dataCarrier = $this->carrierManager->getListCarrierCodeByCondition();

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["data"] = !empty($dataCarrier['listCarrier']) ? $dataCarrier['listCarrier'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

    public function addAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            // TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form Carrier
        $form = new CarrierForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new carrier
            $this->carrierManager->addCarrier($data, $user);

            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have added a carrier!";
        } else {
            //TODO: Check error_code
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
            // TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        //Create New Form Carrier
        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['id']);
        $form = new CarrierForm('update', $this->entityManager, $carrier);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new carrier
            $this->carrierManager->updateCarrier($carrier, $data, $user);

            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have edited a carrier!";
        } else {
            //TODO: Check error_code
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
            // TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form Carrier
        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['id']);

        //validate form
        if(!empty($carrier)) {
            $this->carrierManager->deleteCarrier($carrier, $user);
            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have deleted carrier!";
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Carrier";
        }

        return $this->createResponse();
    }
}