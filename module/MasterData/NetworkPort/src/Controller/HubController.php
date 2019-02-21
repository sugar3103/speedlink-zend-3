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

      $this->error_code = 1;
      $this->apiResponse =  array(
          'message' => 'Get list success',
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
        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $user = $this->tokenPayload;
            $data = $this->getRequestData();

            $form = new HubForm('create', $this->entityManager);

            $form->setData($data);
            //validate form
            if ($form->isValid()) {
              $data = $form->getData();
              $data['created_by'] = $user->id;
              $result = $this->hubManager->addHub($data,$user); 
                // Check result
              
              $this->error_code = 1;
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
        // check if user has submitted the form.
      if ($this->getRequest()->isPost()) {
          $data = $this->getRequestData();
          $user = $this->tokenPayload;
          $data['updated_by'] = $user->id;

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
              $this->apiResponse['message'] = "Errors";
              $this->apiResponse['data'] = $form->getMessages();
            }   
          } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = 'Hub Not Found';   
          }
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
}