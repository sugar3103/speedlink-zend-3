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
        parent::__construct($entityManager);
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
            $currentPage = isset($params['start']) ? $params['start'] : 0;
            
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

            $filters = $this->cityManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';
            
            //get list city by condition
            $dataCity = $this->cityManager->getListCityByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            
            $result = [
                "meta" => [
                    "page" => $currentPage,
                    "pages" => $totalPages,
                    "from" => ($currentPage - 1) * $limit + 1,
                    "to" => ($currentPage * $limit) > $dataCity['totalCity'] ? $dataCity['totalCity'] : ($currentPage * $limit),
                    "perpage"=> $limit,
                    "totalItems" => $dataCity['totalCity'],
                    "totalPage" => ceil($dataCity['totalCity']/$limit)
                ],
                "data" => ($dataCity['listCity']) ? $dataCity['listCity'] : []           
            ];
            
            $this->error_code = 1;
            $this->apiResponse = $result;
            return $this->createResponse();
        } else {
            $this->apiResponse['message'] = 'City List';

            return $this->createResponse();
        }
    }

    public function addAction()
    {   
        // check if city  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form City
            $form = new CityForm('create', $this->entityManager);

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
                $this->error_code = 0;
                $this->apiResponse = $form->getMessages(); 
                
            }            
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";                 
        }

        return $this->createResponse();
    }

    public function editAction() {
        if ($this->getRequest()->isPost()) {
             // fill in the form with POST data.
             $payload = file_get_contents('php://input');
             $data = json_decode($payload, true);
             $user = $this->tokenPayload;
             $city = $this->entityManager->getRepository(City::class)
                ->findOneBy(array('cityId' => $data['city_id']));
            if(isset($data['city_id']) && $city) {
                //Create New Form City
                $form = new CityForm('update', $this->entityManager, $city);
                $form->setData($data);
                if ($form->isValid()) {
                   $data = $form->getData();
                   
                   $this->cityManager->updateCity($city, $data,$user);
                   $this->error_code = 1;
                   $this->apiResponse['message'] = "Success: You have modified city!";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'City Not Found'; 
            }         
             
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";
        }
        
        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
              // fill in the form with POST data.
              $payload = file_get_contents('php://input');
              $data = json_decode($payload, true);
 
              $user = $this->tokenPayload;
              $city = $this->entityManager->getRepository(City::class)
                 ->findOneBy(array('cityId' => $data['city_id']));
            if($city) {
                $this->cityManager->deleteCity($city);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted city!";
            } else {
                $this->httpStatusCode = 200;
                $this->error_code = -1;
                $this->apiResponse['message'] = "Not Found City";
            }
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
        }
        return $this->createResponse();
    }
}