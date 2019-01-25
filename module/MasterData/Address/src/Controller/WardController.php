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
        $this->apiResponse['message'] = 'Ward';

        return $this->createResponse();
    }

    public function listAction()
    {
        if ($this->getRequest()->isPost()) {
            
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'district',
                2 => 'status'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);                        
            
            //get list ward by condition
            $dataWard = $this->wardManager->getListWardByCondition(
                $start, $limit, $sortField, $sortDirection,$filters);            
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message' => 'Get list success',
                'data' => $dataWard['listWard'],
                'total' => $dataWard['totalWard']
            );

        } else {
            $this->apiResponse['message'] = 'Ward List';
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
                $this->error_code = 1;
                $this->apiResponse['message'] = "You have modified Wards!";
            } else {
                $this->error_code = 0;
                $this->apiResponse = $form->getMessages(); 
                
            }            
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";                 
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
                   $this->error_code = 1;
                   $this->apiResponse['message'] = "You have modified ward!";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'Ward Not Found'; 
            }         
             
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";
        }
        
        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
              // fill in the form with POST data.
              $payload = file_get_contents('php://input');
              $data = $this->getRequestData();
 
              $user = $this->tokenPayload;
              $ward = $this->entityManager->getRepository(Ward::class)
                 ->findOneBy(array('id' => $data['id']));
            if($ward) {
                $this->wardManager->deleteWard($ward);
                $this->error_code = 1;
                $this->apiResponse['message'] = "You have deleted ward!";
            } else {
                $this->httpStatusCode = 200;
                $this->error_code = 0;
                $this->apiResponse['message'] = "Not Found Ward";
            }
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
        }
        return $this->createResponse();
    }
}