<?php
namespace Status\Controller;

use Core\Controller\CoreController;
use Status\Form\StatusForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Status\Entity\Status;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class StatusController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * Status Manager.
     * @var StatusManager
     */
    protected $statusManager;

    /**
     * StatusController constructor.
     * @param $entityManager
     * @param $statusManager
     */

    public function __construct($entityManager, $statusManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->statusManager = $statusManager;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'Action List Status';
        return $this->createResponse();
    }

    public function listAction()
    {
        if ($this->getRequest()->isPost()) {
            $params = file_get_contents('php://input');
            $params = json_decode($params, true);

            //the current page number.
            $currentPage = isset( $params['pagination']) ? (int) $params['pagination']['page'] : 1;

            //total number of pages available in the server.
            $totalPages = isset($params['pagination']['pages']) ? (int) $params['pagination']['pages'] : 1;
 
            //set limit
            $limit  = !empty($params['pagination']['perpage'])
                         && $params['pagination']['perpage'] > 3 ? $params['pagination']['perpage'] : 3;

            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'status',
            ];

            $filters = $this->statusManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sort
            $sort = isset($params['sort']) ? $params['sort'] : '';
            
            //get list status by condition
            $dataStatus = $this->statusManager->getListStatusByCondition(
                $currentPage, $limit, $sort, $filters);
            
            $result = [
                "meta" => [
                    "page" => $currentPage,
                    "pages" => $totalPages,
                    "from" => ($currentPage - 1) * $limit + 1,
                    "to" => ($currentPage * $limit) > $dataStatus['totalStatus'] ? $dataStatus['totalStatus'] : ($currentPage * $limit),
                    "perpage"=> $limit,
                    "totalItems" => $dataStatus['totalStatus'],
                    "totalPage" => ceil($dataStatus['totalStatus']/$limit)
                ],
                "data" => ($dataStatus['listStatus']) ? $dataStatus['listStatus'] : []           
            ];
            
            $this->error_code = 1;
            $this->apiResponse = $result;
            return $this->createResponse();
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = 'Status List';

            return $this->createResponse();
        }
    }

    public function addAction()
    {   
        $user = $this->tokenPayload;

        //Create New Form Status
        $form = new StatusForm('create', $this->entityManager);

        // check if status  has submitted the form
        if ($this->getRequest()->isPost()) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            $data['created_by'] = $user->id;

            $form->setData($data);
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add status.
                $this->statusManager->addStatus($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "You have added a status!";
            } else {
                $this->error_code = 0;
                $this->apiResponse = $form->getMessages(); 
            }            
        }

        return $this->createResponse();
    }

    public function editAction() 
    {
        $user = $this->tokenPayload;

        //get status_id
        $status_id = $this->params()->fromRoute('id', -1);

        // Find existing status in the database.
        $status = $this->entityManager->getRepository(Status::class)->findOneBy(array('status_id' => $status_id));

        //Create Form Status
        $form = new StatusForm('update', $this->entityManager, $status);

        if ($status == null) {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";
        } else {
            // Check whether this status is a POST request.
            if ($this->getRequest()->isPost()) {
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);
                $data['status_id'] = $status_id;
                $data['updated_by'] = $user->id;

                $form->setData($data);

                //validate form
                if ($form->isValid()) {
                    // get filtered and validated data
                    $data = $form->getData();
                    // update status.
                    $this->statusManager->updateStatus($status, $data);

                    $this->error_code = 1;
                    $this->apiResponse['message'] = "You have modified status!";
                } else {
                    $this->error_code = 0;
                    $this->apiResponse = $form->getMessages(); 
                }            
            }
        }

        return $this->createResponse();

    }

    public function deleteAction()
    {
        //get status_id
        $status_id = $this->params()->fromRoute('id', -1);

        // Find existing status in the database.
        $status = $this->entityManager->getRepository(Status::class)->findOneBy(array('status_id' => $status_id));

        if ($status == null) {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";
        } else {
            //remove status
            $this->statusManager->removeStatus($status);

            $this->error_code = 1;
            $this->apiResponse['message'] = "Success: You have deleted status!";
        }

        return $this->createResponse();
    }
}