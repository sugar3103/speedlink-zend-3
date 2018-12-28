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
use NetworkPort\Entity\Branch;

class BranchController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
    /**
     * @var BranchManager
     */
    private $branchManager;
   
    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $branchManager
     */

    public function __construct(
        $entityManager,
        $branchManager
     ) {
        $this->entityManager = $entityManager;
        $this->branchManager = $branchManager;
        // $this->cache = $cache;
    }

    public function indexAction()
    {
      if($this->getRequest()->isPost()) {
      // $data = $this->params()->fromPost();

      $payload = file_get_contents('php://input');
      $data = json_decode($payload, true);

      $currentPage = $data['page'];
      $totalPages = $data['pages'];
      $limit = $data['limit'];
      $sortField = isset($data['field']) ? $data['field'] : NULL;
      $sortDirection = isset($data['sort']) ? $data['sort'] : NULL;

      $filters = [];

      $dataBranch = $this->branchManager->getListBranchByCondition(
                $currentPage, $limit, $sortField, $sortDirection, $filters);

      return new JsonModel([
          "meta" => [
              "page" => $currentPage,
              "pages" => $totalPages,
              "perpage"=> $limit,
              "total" => $dataBranch['totalBranch'],//total all records number available in the server
          ],
          "data" => ($dataBranch['listBranch']) ? $dataBranch['listBranch'] : []
       ]);
      }
    }

    /**
    * Add Branch Action
    * @throws \Exception
    */
    public function addbranchAction() {
        
        $this->apiResponse['message'] = 'Action Add Branch';        

        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $payload = file_get_contents('php://input');
            $data = json_decode($payload, true);

            $result = $this->branchManager->addBranch($data);                
            
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

    /**
    * Update Branch Action
    * @throws \Exception
    */
    public function updatebranchAction() {
        $payload = file_get_contents('php://input');
        $data = json_decode($payload, true);
        $this->apiResponse['message'] = 'Action Update Branch';        
        if($data['id'] < 1) {
          //bao loi
          $this->apiResponse['error_code'] = '404';     
          $this->apiResponse['message'] = 'Branch_id not found!';     
          return $this->createResponse();
        }
        $branch = $this->entityManager->getRepository(Branch::class)->find($data['id']);
       // $branch = $this->entityManager->getRepository(Branch::class)->findAll();
        if ($branch == null) {
          //bao loi k tim thay branch
          $this->apiResponse['error_code'] = '404';
          $this->apiResponse['message'] = 'Branch_id not found!';     
          return $this->createResponse();
        }

        if ($this->getRequest()->isPost()) {

            $result = $this->branchManager->updateBranch($branch, $data);                

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

       public function deleteAction() {

        $payload = file_get_contents('php://input');
        $data = json_decode($payload, true);
        $this->apiResponse['message'] = 'Action Delete Branch';        
        if($data['id'] < 1) {
          //bao loi
          $this->apiResponse['error_code'] = '404';     
          $this->apiResponse['message'] = 'Branch_id not found!';     
          return $this->createResponse();
        }
        // delete hub.
        $result = $this->branchManager->deleteBranch($data['id']);

       if ($result->getCode() == Result::SUCCESS) {
                  $this->apiResponse['message']   = $result->getMessages();                        
                  $this->apiResponse['out_input'] = $result->getIdentity();                        
                } else {
                  $this->apiResponse = $result->getMessages();                        
                }
        return $this->createResponse();       
    }
   
}