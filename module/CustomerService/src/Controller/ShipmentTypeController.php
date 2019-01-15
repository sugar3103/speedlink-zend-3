<?php
namespace CustomerService\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use CustomerService\Entity\ShipmentType;
use Zend\View\Model\JsonModel;

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
     * @param $serviceManager
     */

    public function __construct($entityManager, $shipmentTypeManager)
    {
        $this->entityManager = $entityManager;
        $this->shipmentTypeManager = $shipmentTypeManager;
    }

        public function indexAction()
    {
        if (!$this->getRequest()->isPost()) {
            // TODO: Check error_code
            $this->httpStatusCode = 405;
            $this->apiResponse['message'] = 'Request not allow';
            return $this->createResponse();
        }

        $result = [
            "totalRecords" => 0,
            "data" => []
        ];

        $currentPage = $this->params()->fromPost('current_page','10');
        $limit = $this->params()->fromPost('limit','10');
        $sortField = $this->params()->fromPost('field',null);
        $sortDirection = $this->params()->fromPost('sort',null);
        $filters =  $this->params()->fromPost('filters','{}');
        $filters = json_decode($filters, true);

        $dataShipmentType = $this->shipmentTypeManager->getListShipmentTypeByCondition($currentPage, $limit, $sortField, $sortDirection, $filters);

        $result["totalRecords"] = $dataShipmentType['totalShipmentType'];
        $result["data"] = !empty($dataShipmentType['listShipmentType']) ? $dataShipmentType['listShipmentType'] : [];
        $result['code'] = 0;
        $result['message'] = ['Success'];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

        public function addAction()
    {
        if (!$this->getRequest()->isPost()) {
            // TODO: Check error_code
            $this->httpStatusCode = 405;
            $this->apiResponse['message'] = 'Request not allow';
            return $this->createResponse();
        }

        $user = $this->tokenPayload;
        $data = $this->params()->fromPost();
        if (empty($data)) {
            // TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form ShipmentType
        $form = new ShipmentTypeForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new Shipment Type
            $this->shipmentTypeManager->addShipmentType($data, $user);

            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have added a Shipment Type!";
        } else {
            //TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse = $form->getMessages();
        }

        return $this->createResponse();
    }

        public function editAction()
    {
        if (!$this->getRequest()->isPost()) {
            // TODO: Check error_code
            $this->httpStatusCode = 405;
            $this->apiResponse['message'] = 'Request not allow';
            return $this->createResponse();
        }

        $user = $this->tokenPayload;
        $data = $this->params()->fromPost();
        if (empty($data)) {
            // TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form ShipmentType
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->findOneBy(array('id' => $data['id']));
        $form = new ShipmentTypeForm('update', $this->entityManager, $shipmentType);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new Shipment Type
            $this->shipmentTypeManager->updateShipmentType($shipmentType, $data, $user);

            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have edited a Shipment Type!";
        } else {
            //TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse = $form->getMessages();
        }

        return $this->createResponse();
    }

        public function deleteAction()
    {
        if (!$this->getRequest()->isPost()) {
            // TODO: Check error_code
            $this->httpStatusCode = 405;
            $this->apiResponse['message'] = 'Request not allow';
            return $this->createResponse();
        }

        $user = $this->tokenPayload;
        $data = $this->params()->fromPost();
        if (empty($data)) {
            // TODO: Check error_code
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form ShipmentType
        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->findOneBy(array('id' => $data['id']));

        //validate form
        if(!empty($shipmentType)) {
            $this->shipmentTypeManager->deleteShipmentType($shipmentType);
            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have deleted Shipment Type!";
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Shipment Type";
        }

        return $this->createResponse();
    }
}