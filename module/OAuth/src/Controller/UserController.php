<?php
namespace OAuth\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Zend\View\Model\ViewModel;
use OAuth\Entity\User;
use OAuth\Form\UserForm;

class UserController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * City Manager.
     * @var UserManager
     */
    protected $userManager;

    public function __construct($entityManager, $userManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->userManager = $userManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'username',                
                1 => 'status'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);                        
            
            //get list User by condition
            $dataUser = $this->userManager->getListUserByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = ($dataUser['listUser']) ? $dataUser['listUser'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List User Success",
                'data'      => $result,
                'total'     => $dataUser['totalUser']
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
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have modified Cities!";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error: You have modified Cities!";
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