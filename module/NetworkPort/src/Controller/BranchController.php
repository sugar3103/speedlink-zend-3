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
use NetworkPort\Form\BranchForm;

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
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->branchManager = $branchManager;
        // $this->cache = $cache;
    }

    public function indexAction()
    {
      if($this->getRequest()->isPost()) {
      // $data = $this->params()->fromPost();

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

      $filters = $this->branchManager->getValueFiltersSearch($params,$fieldsMap);

      $dataBranch = $this->branchManager->getListBranchByCondition(
                $offset, $limit, $sortField, $sortDirection, $filters);

      return new JsonModel([
          "meta" => [
              "page" => $offset,
              "pages" => $totalPages,
              "perpage"=> $limit,
              "total" => $dataBranch['totalBranch'],//total all records number available in the server
          ],
          "data" => ($dataBranch['listBranch']) ? $dataBranch['listBranch'] : []
       ]);
      }
    }

    public function addbranchAction() {

        $form = new BranchForm('create', $this->entityManager);      
        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $payload = file_get_contents('php://input');
            $data = json_decode($payload, true);
            $user = $this->tokenPayload;
            $data['created_by'] = $user->id;

            $form->setData($data);
            //validate form
            if ($form->isValid()) {
              $data = $form->getData();

              $result = $this->branchManager->addBranch($data);                
              // Check result
              if ($result->getCode() == Result::SUCCESS) {
                $this->apiResponse['message']   = $result->getMessages();                        
                $this->apiResponse['out_input'] = $result->getIdentity();                        
              } else {
                $this->error_code = 0;
                $this->apiResponse = $result->getMessages();                        
              }
            }else {
              $this->error_code = 0;
              $this->apiResponse = $form->getMessages();      
            }     
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";                 
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
        $user = $this->tokenPayload;
        $data['updated_by'] = $user->id;
        $this->apiResponse['message'] = 'Action Update Branch';        
        
        if ( $data['id'] < 1 ) {
          //bao loi k tim thay branch
          $this->error_code = 0;
          $this->apiResponse['message'] = 'Branch Not Found';     
          return $this->createResponse();
        }
        if ($this->getRequest()->isPost()) {
          $branch = $this->entityManager->getRepository(Branch::class)->find($data['id']);
          if($branch) {
            $form = new BranchForm('update', $this->entityManager, $branch);
            $form->setData($data);
            if ($form->isValid()) {
              $result = $this->branchManager->updateBranch($branch, $data);                
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
            $this->apiResponse['message'] = 'Branch Not Found';   
          }            
        } else {
          $this->httpStatusCode = 404;
          $this->apiResponse['message'] = "Page Not Found";
        }
        return $this->createResponse();
      }

      public function deleteAction() {

        $payload = file_get_contents('php://input');
        $data = json_decode($payload, true);
        $this->apiResponse['message'] = 'Action Delete Branch';        
        if($data['id'] < 1) {
          //bao loi
          $this->apiResponse['error_code'] = 0;     
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