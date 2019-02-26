<?php
namespace OAuth\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Zend\View\Model\ViewModel;
use OAuth\Entity\User;
use OAuth\Entity\Role;
use OAuth\Form\UserForm;

class UserController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * User Manager.
     * @var UserManager
     */
    protected $userManager;

    public function __construct($entityManager, $userManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->userManager = $userManager;
    }

    public function indexAction()
    {     
        if ($this->getRequest()->isPost()) {   
            // get the filters
            $fieldsMap = [
                0 => 'username',                
                1 => 'status'
            ];
            
            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap); 
            
            //get list User by condition
            $dataUser = $this->userManager->getListUserByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $results = $this->filterByField($dataUser['listUser'], $fields);
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'data'      => $results,
                'total'     => $dataUser['totalUser']
            );                         
        } 

        return $this->createResponse();
    }
    
    public function addAction()
    {   
        // check if user  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form User
            $form = new UserForm('create', $this->entityManager);

            $form->setData($this->getRequestData());

            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $user = $this->userManager->addUser($data,$user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified Users!";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error: You have modified Users!";
                $this->apiResponse = $form->getMessages(); 
                
            }            
        } 

        return $this->createResponse();
    }

    public function editAction() {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();             
            $user = $this->tokenPayload;
            $_user = $this->entityManager->getRepository(User::class)->findOneById($data['id']);
            if(isset($data['id']) && $_user) {                
                if($this->checkAllow($user,$data['id'])) {
                    //Create New Form User
                    $form = new UserForm('update', $this->entityManager, $_user);
                    $form->setData($data);
                    if ($form->isValid()) {
                    $data = $form->getData(); 
                                        
                    $this->userManager->updateUser($_user, $data,$user);
                    $this->error_code = 1;
                    $this->apiResponse['message'] = "Success: You have modified user!";
                    }  else {
                    $this->error_code = 0;
                    $this->apiResponse = $form->getMessages(); 
                    }   
                }
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'User Not Found'; 
            }
        } 
        
        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
              $data = $this->getRequestData(); 
              $user = $this->tokenPayload;
              $_user = $this->entityManager->getRepository(User::class)
                 ->findOneById($data['id']);
            if($_user) {
                $this->userManager->deleteUser($_user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted user!";
            } else {
                $this->httpStatusCode = 200;
                $this->error_code = -1;
                $this->apiResponse['message'] = "Not Found User";
            }
        }

        return $this->createResponse();
    }

    public function infoAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $user = $this->entityManager->getRepository(User::class)->findOneById($user->id);
            
            $permissions = [];
            foreach ($user->getRoleIds() as $role_id) {
                
                $role = $this->entityManager->getRepository(Role::class)->findOneById($role_id);
                foreach ($role->getPermissions() as $key => $permission) {      
                    $module = explode('.', $permission->getName());
                    $permissions[$module[0]][] = $module[1];
                }

            }

            //Get permission
            $user_info = [
                'id'            => $user->getId(),
                'username'      => $user->getUsername(),
                'first_name'    => $user->getFirstName(),
                'last_name'     => $user->getLastName(),
                'fullname'      =>$user->getFirstName() . ' ' .$user->getLastName(),
                'email'         => $user->getEmail(),
                'roles'         => $user->getRoleIds(),
                'permissions'   => (object) ($permissions),
                'is_active'     => $user->getIsActive(),
                'is_admin'      => $user->getIsAdmin()
            ];
            
            $this->apiResponse['data'] = $user_info;            
        }

        return $this->createResponse();
    }
    private function checkAllow($user,$id)
    {
        if($user->id === $id) {
            return true;
        } else {
            $admin = $this->entityManager->getRepository(User::class)->findOneById($user->id);
            if($admin->getIsAdmin()) {
                return true;
            }
        }
    }
}