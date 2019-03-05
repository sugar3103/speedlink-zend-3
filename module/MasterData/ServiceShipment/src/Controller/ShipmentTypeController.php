<?php
namespace ServiceShipment\Controller;

use Core\Controller\CoreController;

use Doctrine\ORM\EntityManager;
use ServiceShipment\Entity\ShipmentType;
use ServiceShipment\Form\ShipmentTypeForm;
use ServiceShipment\Service\ShipmentTypeManager;

class ShipmentTypeController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var ShipmentTypeManager
     */
    private $shipmentTypeManager;

    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $shipmentTypeManager
     */

    public function __construct($entityManager, $shipmentTypeManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->shipmentTypeManager = $shipmentTypeManager;
    }

    public function indexAction()
    {
        $result = [
            "total" => 0,
            "data" => []
        ];

        $fieldsMap = ['code', 'name', 'name_en', 'status'];
        list($start, $limit, $sortField, $sortDirection, $filters) = $this->getRequestData($fieldsMap);
        $dataShipmentType = $this->shipmentTypeManager->getListShipmentTypeByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["total"] = $dataShipmentType['totalShipmentType'];
        $result["data"] = !empty($dataShipmentType['listShipmentType']) ? $dataShipmentType['listShipmentType'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

    public function codeAction()
    {
        $result = array("data" => []);
        $dataShipmentType = $this->shipmentTypeManager->getListShipmentTypeCodeByCondition();

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["data"] = !empty($dataShipmentType) ? $dataShipmentType : [];
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
        //Create New Form ShipmentType
        $form = new ShipmentTypeForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new Shipment Type
                $this->shipmentTypeManager->addShipmentType($data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have added a Shipment Type!";
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

        //Create New Form ShipmentType
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->find($data['id']);
        $form = new ShipmentTypeForm('update', $this->entityManager, $shipmentType);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new Shipment Type
                $this->shipmentTypeManager->updateShipmentType($shipmentType, $data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have edited a Shipment Type!";
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
        //Create New Form ShipmentType
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->find($data['id']);

        //validate form
        if (!empty($shipmentType)) {
            try {
                $this->shipmentTypeManager->deleteShipmentType($shipmentType, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted Shipment Type!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Shipment Type";
        }
        return $this->createResponse();
    }

    public function codeByConditionAction()
    {
        if ($this->getRequest()->isPost()) {
            $result = array("data" => []);
            $param = $this->getRequestData([]);
            $sortField = $param['type'];
            unset($param['type']);
            $dataShipmentType = $this->shipmentTypeManager->getListCodeByCondition($sortField, $param);

            $result['error_code'] = 1;
            $result['message'] = 'Success';
            $result["data"] = !empty($dataShipmentType) ? $dataShipmentType : [];
            $this->apiResponse = $result;
        }
        return $this->createResponse();

    }
}