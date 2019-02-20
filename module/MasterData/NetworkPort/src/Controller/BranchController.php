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

class BranchController extends CoreController
{
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
    if ($this->getRequest()->isPost()) {
      
      // get the filters
      $fieldsMap = [
        0 => 'code',
        1 => 'name',
        2 => 'name_en',
        3 => 'hub',
        4 => 'district',
        5 => 'ward',
        6 => 'city',
        7 => 'country',
        8 => 'status',
        9 => 'id'
      ];

      list($start, $limit, $sortField, $sortDirection, $filters, $fields) = $this->getRequestData($fieldsMap);

      $dataBranch = $this->branchManager->getListBranchByCondition(
        $start,
        $limit,
        $sortField,
        $sortDirection,
        $filters
      );

      $results = $this->filterByField($dataBranch['listBranch'], $fields);

      $this->error_code = 1;
      $this->apiResponse = array(
        'message' => 'Get list success',
        'data' => $results,
        'total' => $dataBranch['totalBranch']
      );
    }
    return $this->createResponse();
  }

  public function addAction()
  {  
    if ($this->getRequest()->isPost()) {
      $user = $this->tokenPayload;
      $form = new BranchForm('create', $this->entityManager);
      $form->setData($this->getRequestData());
            //validate form
      if ($form->isValid()) {
        $data = $form->getData();
        $data['created_by'] = $user->id;
        $result = $this->branchManager->addBranch($data);                
              // Check result

        $this->error_code = 1;
        $this->apiResponse['message'] = "Success: You have added a branch!";
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = "Errors";
        $this->apiResponse['data'] = $form->getMessages();
      }
    }
    return $this->createResponse();
  }

  /**
   * Update Branch Action
   * @throws \Exception
   */
  public function editAction()
  {
    if ($this->getRequest()->isPost()) {
      $data = $this->getRequestData();
      $user = $this->tokenPayload;
      $data['updated_by'] = $user->id;
      $branch = $this->entityManager->getRepository(Branch::class)->find($data['id']);
      if ($branch) {
        $form = new BranchForm('update', $this->entityManager, $branch);
        $form->setData($data);
        if ($form->isValid()) {
          $result = $this->branchManager->updateBranch($branch, $data);                
                // Check result
          $this->error_code = 1;
          $this->apiResponse['message'] = "You have modified branch!";
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] = "Errors";
          $this->apiResponse['data'] = $form->getMessages();
        }
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = 'Branch Not Found';
      }
    }
    return $this->createResponse();
  }

  public function deleteAction()
  {
    $data = $this->getRequestData();
    if (isset($data['id'])) {
            // Find existing status in the database.
      $branch = $this->entityManager->getRepository(Branch::class)->findOneBy(array('id' => $data['id']));
      if ($branch == null) {
        $this->error_code = 0;
        $this->apiResponse['message'] = "Branch Not Found";
      } else {
                //remove status
        $this->branchManager->deleteBranch($branch);

        $this->error_code = 1;
        $this->apiResponse['message'] = "Success: You have deleted branch!";
      }
    } else {
      $this->error_code = 0;
      $this->apiResponse['message'] = "Branch request id !";
    }
    return $this->createResponse();
  }

}