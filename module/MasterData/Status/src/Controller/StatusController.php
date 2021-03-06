<?php
namespace Status\Controller;

use Core\Controller\CoreController;
use Status\Form\StatusForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Status\Entity\Status;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class StatusController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * Status Manager.
     * @var StatusManager
     */
    protected $statusManager;

    /**
     * StatusController constructor.
     * @param $entityManager
     * @param $statusManager
     */

    public function __construct($entityManager, $statusManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->statusManager = $statusManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name',
                2 => 'name_en',                
                1 => 'status'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);                        
            
            //get list User by condition
            $dataStatus = $this->statusManager->getListStatusByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = $this->filterByField($dataStatus['listStatus'], $fields);          
                        
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataStatus['totalStatus']
            );                         
        } 

        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if status  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            
            //Create New Form Status
            $form = new StatusForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add status.
                $this->statusManager->addStatus($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_STATUS";
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
                // Find existing status in the database.
                $status = $this->entityManager->getRepository(Status::class)->findOneBy(array('id' => $data['id']));    
                if ($status) {
                    //Create Form Status
                    $form = new StatusForm('update', $this->entityManager, $status);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update status.
                        $this->statusManager->updateStatus($status, $data,$user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_STATUS";
                    } else {
                        $this->error_code = 0;
                        $this->apiResponse['data'] = $form->getMessages(); 
                    }      
                } else {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "NOT_FOUND";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "STATUS_REQUEST_ID";
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
                        $status = $this->entityManager->getRepository(Status::class)->findOneBy(array('id' => $id));    
                        if ($status == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->statusManager->removeStatus($status);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETE_SUCCESS_STATUS";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "STATUS_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "STATUS_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}