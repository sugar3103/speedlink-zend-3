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
use NetworkPort\Entity\BranchArea;
use NetworkPort\Form\BranchAreaForm;

class BranchAreaController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
    /**
     * @var BranchAreaManager
     */
    private $branchareaManager;
   
    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $branchManager
     */

    public function __construct(
        $entityManager,
        $branchareaManager
     ) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->branchareaManager = $branchareaManager;
        // $this->cache = $cache;
    }

    public function indexAction()
    {
      if($this->getRequest()->isPost()) {
      
      // get the filters
      $fieldsMap = [
          0 => 'branch',        
          1 => 'hub',
          2 => 'district',
          3 => 'ward',
          4 => 'city',
          5 => 'country',
          6 => 'status',
          7 => 'code'
      ];

      list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);

      $dataBranch = $this->branchareaManager->getListBranchAreaByCondition(
                $start, $limit, $sortField, $sortDirection, $filters);

      $results = $this->filterByField($dataBranch['listBranchArea'], $fields);

      $this->error_code = 1;
      $this->apiResponse =  array(
          'message' => 'Get list success',
          'data' => $results,
          'total' => $dataBranch['totalBranchArea']
      );
      }
      return $this->createResponse();
    }

    public function addAction() {  
        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
           
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            //check Country,city,district,ward
            $check_exits = $this->entityManager->getRepository(BranchArea::class)->findOneBy(array('country_id' => $data['country_id'], 'city_id' => $data['city_id'], 'district_id' => $data['district_id'], 'ward_id' => $data['ward_id']));    
            
            if($check_exits)
            {
              $this->error_code = 0;
              $this->apiResponse['message'] = "Already have this Address!";
              return $this->createResponse();
            }

            $form = new BranchAreaForm('create', $this->entityManager);   
            $form->setData($data);
           // var_dump($this->getRequestData());die();
          
            //validate form
            if ($form->isValid()) {
              $data = $form->getData();
              $data['created_by'] = $user->id;
              $data['branch_type'] = 1;
              $result = $this->branchareaManager->addBranchArea($data);                
              // Check result

              $this->error_code = 1;
              $this->apiResponse['message'] = "Success: You have added a branch area!";
            }else {
              $this->error_code = 0;
              $this->apiResponse['message'] = $form->getMessages();      
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
    public function editAction() {
        $data = $this->getRequestData();
        $user = $this->tokenPayload;
        $data['updated_by'] = $user->id;
        $this->apiResponse['message'] = 'Action Update Branch Area';       

        if ( $data['id'] < 1 ) {
          //bao loi k tim thay branch
          $this->error_code = 0;
          $this->apiResponse['message'] = 'Branch Area Not Found';     
          return $this->createResponse();
        }
        $check_exits = $this->entityManager->getRepository(BranchArea::class)->findOneBy(array('country_id' => $data['country_id'], 'city_id' => $data['city_id'], 'district_id' => $data['district_id'], 'ward_id' => $data['ward_id']));    
            
        if($check_exits)
        {
          $brancharea_id = $check_exits->getId();
          // var_dump( $old_id); die();
          if($brancharea_id != $data['id']) {
            $this->error_code = 0;
            $this->apiResponse['message'] = "Already have this Address!";
            return $this->createResponse();
          }
        }

        if ($this->getRequest()->isPost()) {
          $branch_area = $this->entityManager->getRepository(BranchArea::class)->find($data['id']);
          if($branch_area) {
            $form = new BranchAreaForm('update', $this->entityManager, $branch_area);
            $form->setData($data);
            if ($form->isValid()) {
              $result = $this->branchareaManager->updateBranchArea($branch_area, $data);                
                // Check result
              $this->error_code = 1;
              $this->apiResponse['message'] = "You have modified branch!";
            } else {
              $this->error_code = 0;
              $this->apiResponse['message'] = $form->getMessages(); 
            }   
          } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = 'Branch Area Not Found';   
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
            $branch = $this->entityManager->getRepository(BranchArea::class)->findOneBy(array('id' => $data['id']));    
            if ($branch == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Branch Area Not Found";
            } else {
                //remove status
                $this->branchManager->deleteBranchArea($branch);
    
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted branch area!";
            }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "Branch area request id !";
        }
        return $this->createResponse();       
    }
}