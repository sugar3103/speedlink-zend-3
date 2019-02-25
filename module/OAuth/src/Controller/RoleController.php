<?php
namespace OAuth\Controller;

use OAuth\Entity\Permission;
use OAuth\Entity\Role;
use OAuth\Form\RolePermissionForm;
use OAuth\Form\RoleForm;
use OAuth\Service\RoleManager;
use Doctrine\ORM\EntityManager;
use Core\Controller\CoreController;

/**
 * This controller is responsible for role management (adding, editing,
 * viewing, deleting).
 * @package OAuth\Controller
 */
class RoleController extends CoreController {

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var RoleManager
     */
    private $roleManager;

    /**
     * RoleController constructor.
     * @param $entityManager
     * @param $roleManager
     */
    public function __construct($entityManager, $roleManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->roleManager = $roleManager;
    }

    /**
     * This is the default "index" action for the controller. It displays the
     * list of roles.
     *
     * @return ViewModel
     */
    public function indexAction()
    {
       if ( $this->getRequest()->isPost()) {
             // get the filters
             $fieldsMap = [
                0 => 'name'
            ];
            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);

            //get list by condition
            $dataRole = $this->roleManager->getListRoleByCondition($start, $limit, $sortField, $sortDirection,$filters);
            
            $results = $this->filterByField($dataRole['listRole'], $fields);
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List Role Success",
                'data'      => $results,
                'total'     => $dataRole['totalRole']
            );        
        }

        return $this->createResponse();
        
    }

    /**
     * Add role
     *
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addAction() {
        // check if user has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            // create form
            $form = new RoleForm('create', $this->entityManager);
            
            // fill in the form with POST data
            $data = $this->getRequestData();

            $form->setData($data);

            // validate form
            if ($form->isValid()) {

                // get filtered and validated data
                $data = $form->getData();

                // add role
                $this->roleManager->addRole($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have add new role.";
            }  else {
                $this->error_code = 0;                
                $this->apiResponse['message'] = $form->getMessages();                 
            } 
        }
        return $this->createResponse();
    }

    /**
     * This action displays a page allowing to edit existing role.
     *
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    
    public function editAction() {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            
            $user = $this->tokenPayload;
            $role = $this->entityManager->getRepository(Role::class)
            ->find($data['id']);
           
           if(isset($data['id']) && $role) {
               //Create New Form Permission
               $form = new RoleForm('update', $this->entityManager, $role);
               $form->setData($data);
               if ($form->isValid()) {
                  $data = $form->getData();                                     
                  $this->roleManager->updateRole($role, $data, $user);                                    
                  $this->error_code = 1;
                  $this->apiResponse['message'] = "You have modified Role!";
              } else {
                  $this->error_code = 0;
                  $this->apiResponse['data'] = $form->getMessages(); 
              }      
           }   else {
               $this->error_code = 0;
               $this->apiResponse['message'] = 'NOT_FOUND'; 
           }         
            
       } 
       
       return $this->createResponse();
    }


    /**
     * This action delete a permission.
     */
    public function deleteAction() {
        $id = (int) $this->params()->fromRoute('id', -1);

        if ($id < 1) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        // delete role.
        $statusDel = $this->roleManager->deleteRole($id);
        $errors = 0;
        $message = '';
        if(!$statusDel)
           $errors = 1;

        if($errors == 0){
            $message = 'Deleted the role success';
        }

        return new JsonModel([
            'error' => $errors,
            'message' => $message
        ]);
    }
}