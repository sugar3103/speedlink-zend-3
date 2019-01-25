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
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'country',
                2 => 'status'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);                        
            
            //get list city by condition
            $dataCity = $this->cityManager->getListCityByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = ($dataCity['listCity']) ? $dataCity['listCity'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List Success",
                'data'      => $result,
                'total'     => $dataCity['totalCity']
            );          
        } else {
            $this->apiResponse['message'] = 'City List';
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
                $this->error_code = 1;
                $this->apiResponse['message'] = "You have modified Cities!";
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
                   $this->error_code = 1;
                   $this->apiResponse['message'] = "You have modified city!";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse['message'] = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'City Not Found'; 
            }         
             
        } 
        
        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
              $data = $this->getRequestData();

              $user = $this->tokenPayload;
              $city = $this->entityManager->getRepository(City::class)
                 ->findOneBy(array('cityId' => $data['city_id']));
            if($city) {
                $this->cityManager->deleteCity($city);
                $this->error_code = 1;
                $this->apiResponse['message'] = "You have deleted city!";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Not Found City";
            }
        } 

        return $this->createResponse();
    }
}