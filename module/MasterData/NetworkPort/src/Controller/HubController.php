<?php
namespace NetworkPort\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\Uri\Uri;
use NetworkPort\Entity\Hub;
use NetworkPort\Form\HubForm;

class HubController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
    /**
     * @var HubManager
     */
    private $hubManager;
   
    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $hubManager
     */

    public function __construct(
        $entityManager,
        $hubManager
     ) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->hubManager = $hubManager;
        // $this->cache = $cache;
    }

    public function indexAction()
    {
      if($this->getRequest()->isPost()) {
      // get the filters
      $fieldsMap = [
          0 => 'name',
          1 => 'status',
          2 => 'code',
          3 => 'city'
      ];
      
      list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);

      $dataHub = $this->hubManager->getListHubByCondition(
                $start, $limit, $sortField, $sortDirection, $filters);

      $result = [
        "data" => (($dataHub['listHub']) ? $dataHub['listHub'] : [] ) ,
        "total" => $dataHub['totalHub']
      ];
        
        $this->error_code = 1;
        $this->apiResponse['message'] = 'Success';
        $this->apiResponse['total'] = $result['total'];
        $this->apiResponse['data'] = $result['data'];
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = 'Failed';
      }
      return $this->createResponse();
    }

    /**
    * Add Branch Action
    * @throws \Exception
    */
    public function addAction() {     
        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
          
            $user = $this->tokenPayload;
            
            $form = new HubForm('create', $this->entityManager);

            $form->setData($this->getRequestData());
            //validate form
            if ($form->isValid()) {
              $data = $form->getData();

              $result = $this->hubManager->addHub($data,$user); 

              $this->error_code = $result->getCode();
                // Check result
              
              $this->error_code = 1;
              $this->apiResponse['message'] = "Success: You have added a hub!";
            }
            else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse = $form->getMessages();       
            }            
        }
        else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";                 
        }
        return $this->createResponse();
      }

    /**
    * Update Hub Action
    * @throws \Exception
    */
    public function editAction() {
        $data = $this->getRequestData();
        $user = $this->tokenPayload;
        $data['updated_by'] = $user->id;
        $this->apiResponse['message'] = 'Action Update Hub'; 
 
        if ( $data['id'] < 1) {
          //bao loi k tim thay hub
          $this->error_code = 0;
          $this->apiResponse['message'] = 'Hub Not Found';
          return $this->createResponse();
        }
        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
          $hub = $this->entityManager->getRepository(Hub::class)->find($data['id']);
          if($hub){
            $form = new HubForm('update', $this->entityManager, $hub);
            $form->setData($data);
            if ($form->isValid()) {
              // fill in the form with POST data.
              $result = $this->hubManager->updateHub($hub, $data);                
                // Check result
              $this->error_code = 1;
              $this->apiResponse['message'] = "You have modified hub!";
            } else {
              $this->error_code = 0;
              $this->apiResponse = $form->getMessages(); 
            }   
          } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = 'Hub Not Found';   
          }
        } else {
          $this->httpStatusCode = 404;
          $this->apiResponse['message'] = "Page Not Found";   
        }
        return $this->createResponse();
      }

      public function deleteAction() {
        $data = $this->getRequestData();
        if(isset($data['id'])) {
            // Find existing status in the database.
            $hub = $this->entityManager->getRepository(Hub::class)->findOneBy(array('id' => $data['id']));    
            if ($hub == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Hub Not Found";
            } else {
                //remove status
                $this->hubManager->deleteHub($hub);
    
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted hub!";
            }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "Hub request id !";
        }
      return $this->createResponse();       
    }

    public function listAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'hub_id',
                1 => 'status',
                2 => 'code'
            ];

            list($sortField,$sortDirection,$filters) = $this->getRequestDataSelect($fieldsMap);

            //get list city by condition
            $dataHub = $this->hubManager->getListHubSelect(
              $sortField ,$sortDirection, $filters);
            
          $result = [
            "data" => (($dataHub['listHub']) ? $dataHub['listHub'] : [] ) ,
            "total" => $dataHub['totalHub']
          ];

        $this->error_code = 1;
        $this->apiResponse['message'] = 'Success';
        $this->apiResponse['total'] = $result['total'];
        $this->apiResponse['data'] = $result['data'];   
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] = 'Failed';
        }
        return $this->createResponse();
    }

}