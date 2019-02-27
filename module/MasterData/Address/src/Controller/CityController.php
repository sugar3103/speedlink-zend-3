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
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'id',
                2 => 'country',
                3 => 'status',
                4 => 'name_en',
            ];

            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);                        
            
            //get list city by condition
            $dataCity = $this->cityManager->getListCityByCondition($start, $limit, $sortField, $sortDirection,$filters);            

            $result = $this->filterByField($dataCity['listCity'], $fields);            
            
            
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataCity['totalCity']
            );          
        } 

        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if city  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form City
            $form = new CityForm('create', $this->entityManager);

            $form->setData($this->getRequestData());

            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $city = $this->cityManager->addCity($data,$user);
                
                $this->apiResponse['message'] = "ADD_SUCCESS_CITIES!";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = $form->getMessages(); 
                
            }            
        } 

        return $this->createResponse();
    }

    public function editAction() {
        if ($this->getRequest()->isPost()) {
             $data = $this->getRequestData();
             $user = $this->tokenPayload;

            $city = $this->entityManager->getRepository(City::class)->findOneBy(array('id' => $data['id']));
            
            if(isset($data['id']) && $city) {
                //Create New Form City
                $form = new CityForm('update', $this->entityManager, $city);
                $form->setData($data);
                if ($form->isValid()) {
                   $data = $form->getData();
                   
                   $this->cityManager->updateCity($city, $data,$user);
                   
                   $this->apiResponse['message'] = "MODIFIED_SUCCESS_CITIES";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse['message'] = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'NOT_FOUND'; 
            }         
             
        } 
        
        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
              $data = $this->getRequestData();

              if(isset($data['ids']) && count($data['ids']) > 0) {
                try {
                    foreach ($data['ids'] as $id) {
                        $status = $this->entityManager->getRepository(City::class)->findOneBy(array('id' => $id));    
                        if ($status == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->cityManager->deleteCity($status);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETED_SUCCESS_CITY";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "CITY_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "CITY_REQUEST_ID";
            }
        } 

        return $this->createResponse();
    }

}