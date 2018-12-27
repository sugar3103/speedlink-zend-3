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
            $params = file_get_contents('php://input');
            $params = json_decode($params, true);
            
            //the current page number.
            $currentPage = isset( $params['pagination']) ? (int) $params['pagination']['page'] : 1;

            //total number of pages available in the server.
            $totalPages = isset($params['pagination']['pages']) ? (int) $params['pagination']['pages'] : 1;
 
            //set limit
            $limit  = !empty($params['pagination']['perpage'])
                         && $params['pagination']['perpage'] > 10 ? $params['pagination']['perpage'] : 10;

            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'country_id',
                2 => 'status'
            ];

            $filters = $this->cityManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']['field']) ? $params['sort']['field'] : '';
            $sortDirection = isset($params['sort']['sort']) ? $params['sort']['sort'] : '';
            
            //get list city by condition
            $dataCity = $this->cityManager->getListCityByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            $result = [
                "meta" => [
                    "page" => $currentPage,
                    "pages" => $totalPages,
                    "perpage"=> $limit,
                    "total" => $dataCity['totalCity'],//total all records number available in the server
                ],
                "data" => ($dataCity['listCity']) ? $dataCity['listCity'] : []           
            ];
            
            $this->apiResponse['result'] = $result;
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