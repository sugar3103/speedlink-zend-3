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
            
            // get the filters
            $fieldsMap = [
                0 => 'name',                
                1 => 'id',
                2 => 'status',
            ];

            list($start, $limit, $sortField, $sortDirection, $filters, $fields) = $this->getRequestData($fieldsMap);                        

            //get list country by condition
            $dataCountry = $this->countryManager->getListCountryByCondition(
                $start, $limit, $sortField, $sortDirection,$filters);
            
            $results = $this->filterByField($dataCountry['listCountry'], $fields);
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List Success",
                'data'      => $results,
                'total'     => $dataCountry['totalCountry']
            );       
        }

        return $this->createResponse();
    }

    public function addAction() {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form Country
            $form = new CountryForm('create', $this->entityManager);
            
            $form->setData($this->getRequestData());
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add status.
                $this->countryManager->addCountry($data,$user);

                $this->error_code = 1;
                $this->apiResponse['message'] = "You have added a country!";
            } else {
                $this->error_code = 0;                
                $this->apiResponse['data'] = $form->getMessages();  
            } 
        } 

        return $this->createResponse();        
    }

    public function editAction() {

        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if(isset($data['id'])) {
            // Find existing status in the database.
            $country = $this->entityManager->getRepository(Country::class)->findOneBy(array('id' => $data['id']));    
            if ($country) {
                //Create Form Status
                $form = new CountryForm('update', $this->entityManager, $country);
                $form->setData($data);
                //validate form
                if ($form->isValid()) {
                    // get filtered and validated data
                    $data = $form->getData();
                    // update country.
                    $this->countryManager->updateCountry($country, $data,$user);

                    $this->error_code = 1;
                    $this->apiResponse['message'] = "You have modified country!";
                } else {
                    $this->error_code = 0;
                    $this->apiResponse['data'] = $form->getMessages(); 
                }      
            } else {
                $this->error_code = 0;
                $this->apiResponse['data'] = "Country Not Found";
            }
        } else {
            $this->error_code = 0;
            $this->apiResponse['data'] = "Country request Id!";
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        $data = $this->getRequestData();
        if(isset($data['id'])) {
            // Find existing country in the database.
            $country = $this->entityManager->getRepository(Country::class)->findOneBy(array('id' => $data['id']));    
            if ($country == null) {
                $this->error_code = 0;
                $this->apiResponse['data'] = "Country Not Found";
            } else {
                //remove country
                $this->countryManager->deleteCountry($country);
    
                $this->error_code = 1;
                $this->apiResponse['message'] = "You have deleted country!";
            }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['data'] = "Country request Id!";
        }
        return $this->createResponse();        
    }
}