<?php
namespace CustomerService\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use CustomerService\Entity\Service;
use CustomerService\Form\ServiceForm;
use Zend\View\Model\JsonModel;

class ServiceController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var ServiceManager
     */
    private $serviceManager;

    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $serviceManager
     */

    public function __construct($entityManager, $serviceManager)
    {
        $this->entityManager = $entityManager;
        $this->serviceManager = $serviceManager;
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

        $dataService = $this->serviceManager->getListServiceByCondition($currentPage, $limit, $sortField, $sortDirection, $filters);

        $result["totalRecords"] = $dataService['totalService'];
        $result["data"] = !empty($dataService['listService']) ? $dataService['listService'] : [];
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
        //Create New Form Service
        $form = new ServiceForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new service
            $this->serviceManager->addService($data, $user);

            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have added a service!";
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
        //Create New Form Service
        $service = $this->entityManager->getRepository(Service::class)->findOneBy(array('id' => $data['id']));
        $form = new ServiceForm('update', $this->entityManager, $service);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            // get filtered and validated data
            $data = $form->getData();
            // add new service
            $this->serviceManager->updateService($service, $data, $user);

            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have edited a service!";
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
        //Create New Form Service
        $service = $this->entityManager->getRepository(Service::class)->findOneBy(array('id' => $data['id']));

        //validate form
        if(!empty($service)) {
            $this->serviceManager->deleteService($service);
            $this->error_code = 0;
            $this->apiResponse['message'] = "Success: You have deleted service!";
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Service";
        }

        return $this->createResponse();
    }
}