<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Zend\View\Model\ViewModel;
use Address\Entity\Ward;
use Address\Form\WardForm;

class WardController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * Ward Manager.
     * @var WardManager
     */
    protected $wardManager;

    public function __construct($entityManager, $wardManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->wardManager = $wardManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'district',
                2 => 'status',
                3 => 'name_en',
                4 => 'ras'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters,$fileds) = $this->getRequestData($fieldsMap);                        
            
            //get list ward by condition
            $dataWard = $this->wardManager->getListWardByCondition(
                $start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = $this->filterByField($dataWard['listWard'],$fileds);
            
            $this->apiResponse =  array(
                'message' => 'SUCCESS',
                'data' => $result,
                'total' => $dataWard['totalWard']
            );

        }

        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if ward  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form Ward
            $form = new WardForm('create', $this->entityManager);
            $form->setData($this->getRequestData());
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $ward = $this->wardManager->addWard($data,$user);
                
                $this->apiResponse['message'] = "ADD_SUCCESS_WARD";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = $form->getMessages(); 
                
            }            
        } 

        return $this->createResponse();
    }

    public function editAction() {
        if ($this->getRequest()->isPost()) {

             // fill in the form with POST data.             
             $data = $this->getRequestData();
             $user = $this->tokenPayload;
             $ward = $this->entityManager->getRepository(Ward::class)
                ->findOneBy(array('id' => $data['id']));
            if(isset($data['id']) && $ward) {
                //Create New Form Ward
                $form = new WardForm('update', $this->entityManager, $ward);
                $form->setData($data);
                if ($form->isValid()) {
                   $data = $form->getData();
                   
                   $this->wardManager->updateWard($ward, $data,$user);
                   
                   $this->apiResponse['message'] = "MODIFIED_SUCCESS_WARD";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse['message'] = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'NOT_FOUND'; 
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
                        $ward = $this->entityManager->getRepository(District::class)->findOneBy(array('id' => $id));    
                        if ($status == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->wardManager->deleteWard($ward);
                        }  
                    }
                                        
                    $this->apiResponse['message'] = "DELETE_SUCCESS_WARD";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "WARD_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "WARD_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}