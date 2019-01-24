<?php
namespace OAuth\Controller;

use OAuth\Entity\Permission;
use OAuth\Form\PermissionForm;
use OAuth\Service\PermissionManager;
use Doctrine\ORM\EntityManager;

use Core\Controller\CoreController;
/**
 * This controller is responsible for permission management (adding, editing,
 * viewing, deleting).
 * @package Core\Controller
 */
class PermissionController extends CoreController {

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var PermissionManager
     */
    private $permissionManager;

    /**
     * PermissionController constructor.
     * @param $entityManager
     * @param $permissionManager
     */
    public function __construct($entityManager, $permissionManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->permissionManager = $permissionManager;
    }

    /**
     * This is the default "index" action of the controller. It displays the
     * list of permission.
     */
    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name'                
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);                        
            
            //get list by condition
            $permissions = $this->permissionManager->getListPermissionByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = ($permissions['listPermissions']) ? $permissions['listPermissions'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List Success",
                'data'      => $result,
                'total'     => $permissions['totalRecord']
            );                         
        } 

        return $this->createResponse();
    }

    /**
     * This action displays a page allowing to add a new permission.
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addAction() {
        // check if permission  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form Permission
            $form = new PermissionForm('create', $this->entityManager);

            $form->setData($this->getRequestData());

            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $permission = $this->permissionManager->addPermission($data,$user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified Permission!";
            } else {
                $this->error_code = 0;
                $this->apiResponse['data'] = $form->getMessages(); 
                
            }            
        } 

        return $this->createResponse();
    }

    /**
     * This action displays a page allowing to edit an existing permission.
     *
     * @return \Zend\Http\Response|\Zend\Stdlib\ResponseInterface|ViewModel
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function editAction() {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            
            $user = $this->tokenPayload;
            $permission = $this->entityManager->getRepository(Permission::class)
               ->findOneById($data['id']);
           
           if(isset($data['id']) && $permission) {
               //Create New Form Permission
               $form = new PermissionForm('update', $this->entityManager, $permission);
               $form->setData($data);
               if ($form->isValid()) {
                  $data = $form->getData(); 
                                    
                  $this->permissionManager->updatePermission($permission, $data, $user);
                  $this->error_code = 1;
                  $this->apiResponse['message'] = "Success: You have modified permission!";
               }  else {
                  $this->error_code = 0;
                  $this->apiResponse['data'] = $form->getMessages(); 
               }   
           }   else {
               $this->error_code = 0;
               $this->apiResponse['message'] = 'Permission Not Found'; 
           }         
            
       } 
       
       return $this->createResponse();
    }

    /**
     * This action deletes a permission
     */
    public function deleteAction() {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $user = $this->tokenPayload;
            $permission = $this->entityManager->getRepository(Permission::class)
               ->findOneById($data['id']);
          if($permission) {
              $this->permissionManager->deletePermission($permission);
              $this->error_code = 1;
              $this->apiResponse['message'] = "Success: You have deleted permission!";
          } else {
              $this->error_code = -1;
              $this->apiResponse['message'] = "Not Found Permission";
          }
      } 

      return $this->createResponse();
    }
}