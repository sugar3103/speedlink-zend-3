<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Zend\View\Model\ViewModel;
use Address\Entity\District;
use Address\Form\DistrictForm;

class DistrictController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * District Manager.
     * @var DistrictManager
     */
    protected $districtManager;

    public function __construct($entityManager, $districtManager) {
            
        $this->entityManager = $entityManager;
        $this->districtManager = $districtManager;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'District';

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
                1 => 'city',
                2 => 'status'
            ];

            $filters = $this->districtManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';            
            
            //get list district by condition
            $dataDistrict = $this->districtManager->getListDistrictByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            $result = [
                "totalRecords" => $dataDistrict['totalDistrict'],
                "data" => ($dataDistrict['listDistrict']) ? $dataDistrict['listDistrict'] : []           
            ];
            
            $this->apiResponse = $result;
            return $this->createResponse();
        } else {
            $this->apiResponse['message'] = 'District List';

            return $this->createResponse();
        }
    }

    public function addAction()
    {   
        $user = $this->tokenPayload;
        //Create New Form District
        $form = new DistrictForm('create', $this->entityManager);

        // check if district  has submitted the form
        if ($this->getRequest()->isPost()) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);

            $form->setData($data);
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $district = $this->districtManager->addDistrict($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified Districts!";
            } else {
                $this->apiResponse = $form->getMessages(); 
            }            
        }

        return $this->createResponse();
    }
}