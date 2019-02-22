<?php
namespace ServiceShipment\Controller;

use Core\Controller\CoreController;
use ServiceShipment\Service\ServiceManager;
use Doctrine\ORM\EntityManager;
use ServiceShipment\Entity\Service;
use ServiceShipment\Form\ServiceForm;

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
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->serviceManager = $serviceManager;
    }

    public function indexAction()
    {
        $result = [
            "total" => 0,
            "data" => []
        ];

        $fieldsMap = ['code', 'name', 'name_en', 'status'];
        list($start, $limit, $sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
        $dataService = $this->serviceManager->getListServiceByCondition($start, $limit, $sortField, $sortDirection, $filters);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["total"] = $dataService['totalService'];
        $result["data"] = !empty($dataService['listService']) ? $dataService['listService'] : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }

    public function codeAction()
    {
        $result = array("data" => []);
        $dataService = $this->serviceManager->getListServiceCodeByCondition();

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result["data"] = !empty($dataService) ? $dataService : [];
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
        //Create New Form Service
        $form = new ServiceForm('create', $this->entityManager);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new service
                $this->serviceManager->addService($data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have added a service!";
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

        //Create New Form Service
        $service = $this->entityManager->getRepository(Service::class)->find($data['id']);
        $form = new ServiceForm('update', $this->entityManager, $service);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // get filtered and validated data
                $data = $form->getData();
                // add new service
                $this->serviceManager->updateService($service, $data, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have edited a service!";
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
        //Create New Form Service
        $service = $this->entityManager->getRepository(Service::class)->find($data['id']);

        //validate form
        if(!empty($service)) {
            try {
                $this->serviceManager->deleteService($service, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted service!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Service";
        }
        return $this->createResponse();
    }
}