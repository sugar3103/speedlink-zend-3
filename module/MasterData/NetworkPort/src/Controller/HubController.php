<?php
namespace NetworkPort\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
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
    }

    public function indexAction()
    {
      if($this->getRequest()->isPost()) {
      // get the filters
      $fieldsMap = [
          0 => 'name',
          1 => 'name_en',
          2 => 'status',
          3 => 'code',
          4 => 'city',
          5 => 'country'
      ];
      
      list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);

      $dataHub = $this->hubManager->getListHubByCondition(
                $start, $limit, $sortField, $sortDirection, $filters);

      $results = $this->filterByField($dataHub['listHub'], $fields);

      $this->apiResponse =  array(
          'message' => 'SUCCESS',
          'data' => $results,
          'total' => $dataHub['totalHub']
      );
       }
      return $this->createResponse();
    }

    /**
    * Add Hub Action
    * @throws \Exception
    */
    public function addAction() {     
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            $form = new HubForm('create', $this->entityManager);
            $form->setData($data);
           
            if ($form->isValid()) {
              $data = $form->getData();
              $this->hubManager->addHub($data,$user); 
              
              $this->apiResponse['message'] = "Success: You have added a hub!";
            }
            else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Errors";
                $this->apiResponse['data'] = $form->getMessages();
            }            
        }
        return $this->createResponse();
      }

    /**
    * Update Hub Action
    * @throws \Exception
    */
    public function editAction() {
      if ($this->getRequest()->isPost()) {
          $data = $this->getRequestData();
          $user = $this->tokenPayload;
          if(isset($data['id'])) {
            $hub = $this->entityManager->getRepository(Hub::class)->find($data['id']);
            if($hub){
              $form = new HubForm('update', $this->entityManager, $hub);
              $form->setData($data);
              if ($form->isValid()) {
               
                $this->hubManager->updateHub($hub, $data, $user);                
               
                $this->apiResponse['message'] = "MODIFIED_SUCCESS";
              } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Errors";
                $this->apiResponse['data'] = $form->getMessages();
              }   
            } else {
              $this->error_code = 0;
              $this->apiResponse['message'] = 'NOT_FOUND';   
            }
          } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "HUB_REQUEST_ID";
          }
        }
        
        return $this->createResponse();
      }

      public function deleteAction() {
        $data = $this->getRequestData();
        if(isset($data['ids']) && count($data['ids']) > 0 ) {
          try {
            foreach ($data['ids'] as $id) {
            
            $hub = $this->entityManager->getRepository(Hub::class)->findOneBy(array('id' => $id));    
            if ($hub == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "NOT_FOUND";
                exit();
            } else {
                $this->hubManager->deleteHub($hub);
            }
          }

            $this->apiResponse['message'] = "DELETE_SUCCESS_HUB";
          }
          catch (\Throwable $th) {
            $this->error_code = 0;
            $this->apiResponse['message'] = "HUB_REQUEST_ID";
          }        
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "HUB_REQUEST_ID";
        }
      return $this->createResponse();       
    }
}