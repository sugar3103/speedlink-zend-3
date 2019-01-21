<?php
namespace CustomerService\Controller;

use CustomerService\Entity\Carrier;
use CustomerService\Form\CarrierForm;
use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;

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
        // if (!$this->getRequest()->isPost()) {
        //     // TODO: Check error_code
        //     $this->httpStatusCode = 405;
        //     $this->apiResponse['message'] = 'Request not allow';
        //     return $this->createResponse();
        // }

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

        $dataCarrier = $this->carrierManager->getListCarrierByCondition($currentPage, $limit, $sortField, $sortDirection, $filters);

        $result["totalRecords"] = $dataCarrier['totalCarrier'];
        $result["data"] = !empty($dataCarrier['listCarrier']) ? $dataCarrier['listCarrier'] : [];
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
        //Create New Form Carrier
        $form = new CarrierForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new carrier
            $this->carrierManager->addCarrier($data, $user);

            $this->error_code = 0;
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
        //Create New Form Carrier
        $carrier = $this->entityManager->getRepository(Carrier::class)->findOneBy(array('id' => $data['id']));
        $form = new CarrierForm('update', $this->entityManager, $carrier);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new carrier
            $this->carrierManager->updateCarrier($carrier, $data, $user);

            $this->error_code = 0;
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
        //Create New Form Carrier
        $carrier = $this->entityManager->getRepository(Carrier::class)->findOneBy(array('id' => $data['id']));

        //validate form
        if(!empty($carrier)) {
            $this->carrierManager->deleteCarrier($carrier);
            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have deleted carrier!";
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Carrier";
        }

        return $this->createResponse();
    }
}