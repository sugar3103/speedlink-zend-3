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
        if ($this->getRequest()->isPost()) {
            $fieldsMap = ['code', 'name', 'name_en', 'status'];
            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);            

            //get list User by condition
            $dataService = $this->serviceManager->getListServiceByCondition($start, $limit, $sortField, $sortDirection,$filters,$this->getDeleted());            
            
            $result = $this->filterByField($dataService['listService'], $fields);          
                        
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataService['totalService']
            );
        }


        return $this->createResponse();
    }

    public function codeAction()
    {
        if ($this->getRequest()->isPost()) {
            $dataService = $this->serviceManager->getListServiceCodeByCondition($this->getDeleted());

            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => !empty($dataService) ? $dataService : []            
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        // check if status  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            
            //Create New Form Carrier
            $form = new ServiceForm('create', $this->entityManager);
            $form->setData($data);

            //validate form
            if ($form->isValid()) {
                try {
                    // get filtered and validated data
                    $data = $form->getData();
                    // add new carrier
                    $this->serviceManager->addService($data, $user);
                    
                    $this->apiResponse['message'] = "ADDED_SUCCESS_SERVICE";
                } catch (\Exception $e) {
                    $this->error_code = -1;
                    $this->apiResponse['message'] = "ERROR_SUCCESS_SERVICE";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages(); 
            }   
        }

        return $this->createResponse();
    }

    public function editAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            if(isset($data['id'])) {
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
                        $this->apiResponse['message'] = "EDITED_SUCCESS_SERVICE";
                    } catch (\Exception $e) {
                        $this->error_code = -1;
                        $this->apiResponse['data'] = "ERROR_EDITED";
                    }
                } else {
                    $this->error_code = 0;            
                    $this->apiResponse['data'] = $form->getMessages(); 
                }  
            }
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            
            if(isset($data['ids']) && count($data['ids']) > 0) {
                try {
                    foreach ($data['ids'] as $id) {
                        $service = $this->entityManager->getRepository(Service::class)->find($id);
                        if ($service == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->serviceManager->deleteService($service,$this->tokenPayload);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETE_SUCCESS_SERVICE";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SERVICE_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SERVICE_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }
}