<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Zend\View\Model\ViewModel;
use Address\Entity\City;
use Address\Form\CityForm;

class CityController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * City Manager.
     * @var CityManager
     */
    protected $cityManager;

    public function __construct($entityManager, $cityManager) {
            
        $this->entityManager = $entityManager;
        $this->cityManager = $cityManager;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'City';

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
                1 => 'country',
                2 => 'status'
            ];

            $filters = $this->cityManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';
            
            //get list city by condition
            $dataCity = $this->cityManager->getListCityByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            $result = [
                "totalRecords" => $dataCity['totalCity'],
                "data" => ($dataCity['listCity']) ? $dataCity['listCity'] : []           
            ];
            
            $this->apiResponse = $result;
            return $this->createResponse();
        } else {
            $this->apiResponse['message'] = 'City List';

            return $this->createResponse();
        }
    }

    public function addAction()
    {   
        $user = $this->tokenPayload;
        //Create New Form City
        $form = new CityForm('create', $this->entityManager);

        // check if city  has submitted the form
        if ($this->getRequest()->isPost()) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);

            $form->setData($data);
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $city = $this->cityManager->addCity($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified Cities!";
            } else {
                $this->apiResponse = $form->getMessages(); 
            }            
        }

        return $this->createResponse();
    }
}