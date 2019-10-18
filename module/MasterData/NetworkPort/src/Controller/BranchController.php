<?php
namespace NetworkPort\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
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
  }

  public function indexAction()
  {
    if ($this->getRequest()->isPost()) {
      
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

      $this->apiResponse = array(
        'message' => 'SUCCESS',
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
           
      if ($form->isValid()) {
        $data = $form->getData();
        $this->branchManager->addBranch($data,$user);                

        $this->apiResponse['message'] = "ADD_SUCCESS";
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
      if(isset($data['id'])) {
      $branch = $this->entityManager->getRepository(Branch::class)->find($data['id']);
      if ($branch) {
        $form = new BranchForm('update', $this->entityManager, $branch);
        $form->setData($data);
        if ($form->isValid()) {
          $this->branchManager->updateBranch($branch, $data, $user);                
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
        $this->apiResponse['message'] = "BRANCH_REQUEST_ID";
      }
    }
    return $this->createResponse();
  }

  public function deleteAction()
  {
    $data = $this->getRequestData();
    if (isset($data['ids']) && count($data['ids']) > 0 ) {
      try {
        foreach ($data['ids'] as $id) {
            
          $branch = $this->entityManager->getRepository(Branch::class)->findOneBy(array('id' => $id));
            if ($branch == null) {
              $this->error_code = 0;
              $this->apiResponse['message'] = "NOT_FOUND";
            } else {
              $this->branchManager->deleteBranch($branch);
            }
        }

        $this->apiResponse['message'] = "DELETE_SUCCESS_BRANCH";
      }
      catch (\Throwable $th) {
        $this->error_code = 0;
        $this->apiResponse['message'] = "BRANCH_REQUEST_ID";
      }
    } else {
      $this->error_code = 0;
      $this->apiResponse['message'] = "BRANCH_REQUEST_ID";
    }
    return $this->createResponse();
  }

}