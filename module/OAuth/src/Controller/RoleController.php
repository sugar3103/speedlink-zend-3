<?php
namespace OAuth\Controller;

use OAuth\Entity\Permission;
use OAuth\Entity\Role;
use OAuth\Form\RolePermissionForm;
use OAuth\Form\RoleForm;
use OAuth\Service\RoleManager;
use Doctrine\ORM\EntityManager;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Zend\Mvc\Controller\AbstractActionController;
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
            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);

            //get list by condition
            $dataRole = $this->roleManager->getListRoleByCondition($start, $limit, $sortField, $sortDirection,$filters);

            $result = ($dataRole['listRole']) ? $dataRole['listRole'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List Role Success",
                'data'      => $result,
                'total'     => $dataRole['totalRole']
            );        
        }

        return $this->createResponse();
        
    }

    /**
     * Add role
     *
     * @return \Zend\Http\Response|ViewModel
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addAction() {

        // create form
        $form = new RoleForm('create', $this->entityManager);

        $roleList = [];
        $roles = $this->entityManager->getRepository(Role::class)
            ->findBy([], ['name' => 'ASC']);

        foreach ($roles as $role) {
            $roleList[$role->getId()] = $role->getName();
        }
        $form->get('inherit_roles')->setValueOptions($roleList);

        // check if user has submitted the form
        if ($this->getRequest()->isPost()) {

            // fill in the form with POST data
            $data = $this->getRequestData();

            $form->setData($data);

            // validate form
            if ($form->isValid()) {

                // get filtered and validated data
                $data = $form->getData();

                // add role
                $this->roleManager->addRole($data);

                // add a flash message.
                $this->flashMessenger()->addSuccessMessage('Added new role.');

                // redirect to "index" page
                return $this->redirect()->toRoute('roles', ['action' => 'index']);
            }
        }
        return new ViewModel([
            'form' => $form
        ]);
    }

    /**
     * The "view" action displays a page allowing to view role's details.
     */
    public function viewAction() {
        $id = (int) $this->params()->fromRoute('id', -1);

        if ($id < 1) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        // find a role with such ID.
        $role = $this->entityManager->getRepository(Role::class)
            ->find($id);

        if ($role == null) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        $allPermissions = $this->entityManager->getRepository(Permission::class)
            ->findBy([], ['name' => 'ASC']);

        $effectivePermissions = $this->roleManager->getEffectivePermissions($role);

        return new ViewModel(
            [
                'role' => $role,
                'allPermissions' => $allPermissions,
                'effectivePermissions' => $effectivePermissions
            ]
        );
    }

    /**
     * This action displays a page allowing to edit existing role.
     *
     * @return \Zend\Http\Response|\Zend\Stdlib\ResponseInterface|ViewModel
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function editAction() {
        $id = (int) $this->params()->fromRoute('id', -1);

        if ($id < 1) {
            $this->getResponse()->getStatusCode(404);
            return $this->getResponse();
        }

        $role = $this->entityManager->getRepository(Role::class)
            ->find($id);

        if ($role == null) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        // create form
        $form = new RoleForm('update', $this->entityManager, $role);

        $roleList = [];
        $selectedRoles = [];
        $roles = $this->entityManager->getRepository(Role::class)
            ->findBy([], ['name' => 'ASC']);

        foreach ($roles as $role2) {

            if ((int) $role2->getId() == (int) $role->getId())
                continue; // do not inherit from ourselves

            $roleList[$role2->getId()] = $role2->getName();

            if ($role->hasParent($role2))
                $selectedRoles[] = (int) $role2->getId();
        }


        $form->get('inherit_roles')->setValueOptions($roleList);

        $form->get('inherit_roles')->setValue($selectedRoles);

        // check if user has submitted the form
        if ($this->getRequest()->isPost()) {

            // fill in the form with post data
            $data = $this->params()->fromPost();

            $form->setData($data);

            // validate form
            if ($form->isValid()) {

                // get filtered and validated data
                $data = $form->getData();

                // update permission
                $this->roleManager->updateRole($role, $data);

                // add a flash message
                $this->flashMessenger()->addSuccessMessage('Update the role.');

                // redirect to "index" page
                return $this->redirect()->toRoute('roles', ['action' => 'index']);
            }
        } else {
            $form->setData([
                'name' => $role->getName(),
                'description' => $role->getDescription()
            ]);
        }
        return new ViewModel([
            'form' => $form,
            'role' => $role
        ]);
    }


    /**
     * The "editPermissions" action allows to edit permissions assigned to the given role.
     *
     * @return \Zend\Http\Response|\Zend\Stdlib\ResponseInterface|ViewModel
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function editPermissionsAction() {
        $id = (int) $this->params()->fromRoute('id', -1);

        if ($id < 1) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        $role = $this->entityManager->getRepository(Role::class)
            ->find($id);

        if ($role == null) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        $allPermissions = $this->entityManager->getRepository(Permission::class)
            ->findBy([], ['name' => 'ASC']);

        $effectivePermissions = $this->roleManager->getEffectivePermissions($role);


        // create form
        $form = new RolePermissionForm($this->entityManager);
        foreach ($allPermissions as $permission) {
            $label = $permission->getName();
            $isDisabled = false;
            if ($effectivePermissions && isset($effectivePermissions[$permission->getName()]) && $effectivePermissions[$permission->getName()] == 'inherited') {
                $label .= ' (inherited)';
                $isDisabled = true;
            }
            $form->addPermissionField($permission->getName(), $label, $isDisabled);
        }

        // check if user has submitted the form
        if ($this->getRequest()->isPost()) {

            // fill in the form with POST data
            $data = $this->params()->fromPost();

            $form->setData($data);

            // validate form
            if ($form->isValid()) {

                // get filtered and validated data
                $data = $form->getData();

                // update permissions.
                $this->roleManager->updateRolePermissions($role, $data);

                // add a flash message.
                $this->flashMessenger()->addSuccessMessage('Updated permission for the role.');

                // redirect to "index" page
                return $this->redirect()->toRoute('roles', ['action' => 'view', 'id' => $role->getId()]);
            }
        } else {
            $data = [];
            foreach ($effectivePermissions as $name => $inherited) {
                $data['permissions'][$name] = 1;
            }

            $form->setData($data);
        }

        return new ViewModel([
            'form' => $form,
            'role' => $role,
            'allPermissions' => $allPermissions,
            'effectivePermissions' => $effectivePermissions
        ]);
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