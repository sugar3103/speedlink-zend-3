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
      // $params = $this->params()->fromPost();

      $payload = file_get_contents('php://input');
      $params = json_decode($payload, true);

      //the current page number.
      $offset = isset($params['start']) ? $params['start'] : 0;
        
      //total number of pages available in the server.
      $totalPages = 1;

      //set limit
      $limit  = isset($params['length']) ? $params['length'] : 10;

      // get the filters
      $fieldsMap = [
          0 => 'name',
          1 => 'status',
      ];
      //get and set sortField,sortDirection
      $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
      $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';

      $filters = $this->hubManager->getValueFiltersSearch($params,$fieldsMap);

      $dataHub = $this->hubManager->getListHubByCondition(
                $offset, $limit, $sortField, $sortDirection, $filters);

      return new JsonModel([
          "meta" => [
              "page" => $offset,
              // "pages" => $totalPages,
              "perpage"=> $limit,
              "total" => $dataHub['totalHub'],//total all records number available in the server
          ],
          "data" => ($dataHub['listHub']) ? $dataHub['listHub'] : []
        ]);
      }
    }

    /**
    * Add Branch Action
    * @throws \Exception
    */
    public function addhubAction() {
        
        $this->apiResponse['message'] = 'Action Add Hub';        
        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $payload = file_get_contents('php://input');
            $data = json_decode($payload, true);
            $user = $this->tokenPayload;
            $data['created_by'] = $user->id;
            $form = new HubForm('create', $this->entityManager);

            $form->setData($data);
            //validate form
            if ($form->isValid()) {
              $data = $form->getData();

              $result = $this->hubManager->addHub($data); 
              $this->error_code = $result->getCode();
                // Check result
              if ($result->getCode() == Result::SUCCESS) {
                $this->apiResponse['message']   = $result->getMessages();                        
                $this->apiResponse['out_input'] = $result->getIdentity();                        
              } else {
                $this->error_code = 0;
                $this->apiResponse = $result->getMessages();                        
              }
            }
            else {
                $this->error_code = 0;
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
    public function updatehubAction() {
        $payload = file_get_contents('php://input');
        $data = json_decode($payload, true);
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
              if ($result->getCode() == Result::SUCCESS) {
                $this->error_code = 1;
                $this->apiResponse['message']   = $result->getMessages();                 
                $this->apiResponse['out_input'] = $result->getIdentity();                        
              } else {
                $this->error_code = 0;
                $this->apiResponse = $result->getMessages();                        
              }
            } else {
              $this->error_code = 0;
              $this->apiResponse = $form->getMessages(); 
            }   
          } else {
            $this->apiResponse['error_code'] = 0;
            $this->apiResponse['message'] = 'Hub Not Found';   
          }
        } else {
          $this->httpStatusCode = 404;
          $this->apiResponse['message'] = "Page Not Found";   
        }
        return $this->createResponse();
      }

      public function deleteAction() {

        if ($this->getRequest()->isPost()) {
          $payload = file_get_contents('php://input');
          $data = json_decode($payload, true);
          $this->apiResponse['message'] = 'Action Delete Hub';        
          if($data['id'] < 1) {
            //bao loi
            $this->error_code = 0;
            $this->apiResponse['message'] = 'Hub Not Found';     
            return $this->createResponse();
          }
          // delete hub.
          $result = $this->hubManager->deleteHub($data['id']);

          if ($result->getCode() == Result::SUCCESS) {
            $this->error_code = 1;
            $this->apiResponse['message']   = $result->getMessages();                        
          } else {
            $this->error_code = 0;
            $this->apiResponse = $result->getMessages();                        
          } 
        } else {
          $this->httpStatusCode = 404;
          $this->apiResponse['message'] = "Page Not Found";            
        }
      return $this->createResponse();       
    }
}