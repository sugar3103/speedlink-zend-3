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
        // create form
        $form = new PermissionForm('create', $this->entityManager);

        // check if user has submitted the form
        if ($this->getRequest()->isPost()) {

            // fill in the form with POST data
            $data = $this->params()->fromPost();

            $form->setData($data);

            // validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();

                // add permission.
                $this->permissionManager->addPermission($data);

                // add a flash message.
                $this->flashMessenger()->addSuccessMessage('Added new permission.');

                // Redirect to "index" page
                return $this->redirect()->toRoute('permissions', ['action' => 'index']);
            }
        }

        return new ViewModel([
            'form' => $form
        ]);
    }

    /**
     * The "view" action displays a page allowing to view permission's details.
     */
    public function viewAction() {
        $id = (int) $this->params()->fromRoute('id', -1);
        if ($id < 1) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        // find a permission with such ID
        $permission = $this->entityManager->getRepository(Permission::class)
            ->find($id);

        if ($permission == null) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        return new ViewModel([
            'permission' => $permission
        ]);
    }

    /**
     * This action displays a page allowing to edit an existing permission.
     *
     * @return \Zend\Http\Response|\Zend\Stdlib\ResponseInterface|ViewModel
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function editAction() {
        $id = (int) $this->params()->fromRoute('id', -1);
        if ($id < 1) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        // find a permission with such ID
        $permission = $this->entityManager->getRepository(Permission::class)
            ->find($id);

        if ($permission == null) {
            $this->getResponse()->setStatusCode(404);
            return $this->getResponse();
        }

        // Update form
        $form = new PermissionForm('update', $this->entityManager, $permission);

        // check if user has submmited the form
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data
            $data = $this->params()->fromPost();

            $form->setData($data);

            // validate form
            if ($form->isValid()) {

                // get filtered and validated data
                $data = $form->getData();

                // update permission
                $this->permissionManager->updatePermission($permission, $data);

                // add a flash message.
                $this->flashMessenger()->addSuccessMessage('Updated the permission.');

                // redirect to "index" page.
                return $this->redirect()->toRoute('permissions', ['action' => 'index']);
            }
        } else {
            $form->setData([
                'name' => $permission->getName(),
                'description' => $permission->getDescription()
            ]);
        }

        return new ViewModel([
            'form' => $form,
            'permission' => $permission
        ]);
    }

    /**
     * This action deletes a permission
     */
    public function deleteAction() {
        if($this->getRequest()->isXmlHttpRequest() && $this->getRequest()->isPost()) {
            $data = $this->params()->fromPost();
            $id = (int)$data['permissionId'];
            if ($id < 1) {
                $this->getResponse()->setStatusCode(404);
                return $this->getResponse();
            }

            // delete permission
            $statusDel = $this->permissionManager->deletePermission($id);
            $errors = 0;
            $message = '';

            if (!$statusDel)
                $errors = 1;

            if ($errors == 0) {
                $message = 'Deleted permission success!';
            }
            return new JsonModel([
                'error' => $errors,
                'message' => $message
            ]);
        }
    }
}