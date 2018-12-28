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
        $this->entityManager = $entityManager;
        $this->hubManager = $hubManager;
        // $this->cache = $cache;
    }

    public function indexAction()
    {
      if($this->getRequest()->isPost()) {
      // $params = $this->params()->fromPost();

      $payload = file_get_contents('php://input');
      $data = json_decode($payload, true);

      $currentPage = $data['page'];
      $totalPages = $data['pages'];
      $limit = $data['limit'];
      $sortField = isset($data['field']) ? $data['field'] : NULL;
      $sortDirection = isset($data['sort']) ? $data['sort'] : NULL;
      $filters = [];

      $dataHub = $this->hubManager->getListHubByCondition(
                $currentPage, $limit, $sortField, $sortDirection, $filters);

      return new JsonModel([
          "meta" => [
              "page" => $currentPage,
              "pages" => $totalPages,
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

            $result = $this->hubManager->addHub($data);                
            
            $this->error_code = $result->getCode();
                // Check result
            if ($result->getCode() == Result::SUCCESS) {
                  $this->apiResponse['message']   = $result->getMessages();                        
                  $this->apiResponse['out_input'] = $result->getIdentity();                        
                } else {
                  $this->apiResponse = $result->getMessages();                        
                }
        }
        return $this->createResponse();
      }

    public function updatehubAction() {
        $payload = file_get_contents('php://input');
        $data = json_decode($payload, true);
        $this->apiResponse['message'] = 'Action Update Hub';        
        if($data['id'] < 1) {
          //bao loi
          $this->apiResponse['error_code'] = '404';     
          $this->apiResponse['message'] = 'Hub_id not found!';     
          return $this->createResponse();
        }

        $hub = $this->entityManager->getRepository(Hub::class)->find($data['id']);

        if ($hub == null) {
          //bao loi k tim thay branch
          $this->apiResponse['error_code'] = '404';
          $this->apiResponse['message'] = 'Hub_id not found!';     
          return $this->createResponse();
        }

        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $result = $this->hubManager->updateHub($hub, $data);                

            // $this->error_code = $result->getCode();
                // Check result
            if ($result->getCode() == Result::SUCCESS) {
                  $this->apiResponse['message']   = $result->getMessages();                        
                  $this->apiResponse['out_input'] = $result->getIdentity();                        
                } else {
                  $this->apiResponse = $result->getMessages();                        
                }
        }
        return $this->createResponse();
      }

      public function deleteAction() {

        $payload = file_get_contents('php://input');
        $data = json_decode($payload, true);
        $this->apiResponse['message'] = 'Action Delete Hub';        
        if($data['id'] < 1) {
          //bao loi
          $this->apiResponse['error_code'] = '404';     
          $this->apiResponse['message'] = 'Hub_id not found!';     
          return $this->createResponse();
        }
        // delete hub.
        $result = $this->hubManager->deleteHub($data['id']);

       if ($result->getCode() == Result::SUCCESS) {
                  $this->apiResponse['message']   = $result->getMessages();                        
                  $this->apiResponse['out_input'] = $result->getIdentity();                        
                } else {
                  $this->apiResponse = $result->getMessages();                        
                }
        return $this->createResponse();       
    }


   
}