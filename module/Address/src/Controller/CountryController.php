<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;
use Address\Entity\Country;
use Address\Form\CountryForm;

class CountryController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * Country Manager.
     * @var CountryManager
     */
    protected $countryManager;

    public function __construct($entityManager, $countryManager) {
        
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->countryManager = $countryManager;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'Country';

        return $this->createResponse();
    }

    public function listAction() {
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
                1 => 'status'
            ];

            $filters = $this->countryManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';

            //get list country by condition
            $dataCountry = $this->countryManager->getListCountryByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            
            $result = [
                "meta" => [
                    "page" => $currentPage,
                    "pages" => $totalPages,
                    "from" => ($currentPage - 1) * $limit + 1,
                    "to" => ($currentPage * $limit) > $dataCountry['totalCountry'] ? $dataCountry['totalCountry'] : ($currentPage * $limit),
                    "perpage"=> $limit,
                    "totalItems" => $dataCountry['totalCountry'],
                    "totalPage" => ceil($dataCountry['totalCountry']/$limit)
                ],
                "data" => ($dataCountry['listCountry']) ? $dataCountry['listCountry'] : []           
            ];
            
            $this->error_code = 1;
            $this->apiResponse = $result;           
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
        }
        return $this->createResponse();
    }

    public function addAction() {
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $payload = file_get_contents('php://input');
            $data = json_decode($payload, true);

            $user = $this->tokenPayload;
            //Create New Form Country
            $form = new CountryForm('create', $this->entityManager);
            

            $form->setData($data);
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add status.
                $this->countryManager->addCountry($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have added a country!";
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
             $country = $this->entityManager->getRepository(Country::class)
                ->findOneBy(array('countryId' => $data['country_id']));
             
             //Create New Form Country
             $form = new CountryForm('update', $this->entityManager, $country);
             $form->setData($data);
             if ($form->isValid()) {
                $data = $form->getData();
                
                $this->countryManager->updateCountry($country, $data,$user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified country!";
             }  else {
                $this->error_code = 0;
                $this->apiResponse = $form->getMessages(); 
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
              $country = $this->entityManager->getRepository(Country::class)
                 ->findOneBy(array('countryId' => $data['country_id']));
            if($country) {
                $this->countryManager->deleteCountry($country);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted status!";
            } else {
                $this->httpStatusCode = 200;
                $this->error_code = -1;
                $this->apiResponse['message'] = "Not Found Country";
            }
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
        }
        return $this->createResponse();
    }
}