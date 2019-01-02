<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Zend\View\Model\ViewModel;
use Address\Entity\Ward;
use Address\Form\WardForm;

class WardController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * Ward Manager.
     * @var WardManager
     */
    protected $wardManager;

    public function __construct($entityManager, $wardManager) {
            
        $this->entityManager = $entityManager;
        $this->wardManager = $wardManager;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'Ward';

        return $this->createResponse();
    }

    public function listAction()
    {
        if ($this->getRequest()->isPost()) {
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
                1 => 'district',
                2 => 'status'
            ];

            $filters = $this->wardManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';
            
            
            //get list ward by condition
            $dataWard = $this->wardManager->getListWardByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            $result = [
                "totalRecords" => $dataWard['totalWard'],
                "data" => ($dataWard['listWard']) ? $dataWard['listWard'] : []           
            ];
            
            $this->apiResponse = $result;
            return $this->createResponse();
        } else {
            $this->apiResponse['message'] = 'Ward List';

            return $this->createResponse();
        }
    }

    public function addAction()
    {   
        $user = $this->tokenPayload;
        //Create New Form Ward
        $form = new WardForm('create', $this->entityManager);

        // check if ward  has submitted the form
        if ($this->getRequest()->isPost()) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);

            $form->setData($data);
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $ward = $this->wardManager->addWard($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified Cities!";
            } else {
                $this->apiResponse = $form->getMessages(); 
            }            
        }

        return $this->createResponse();
    }
}