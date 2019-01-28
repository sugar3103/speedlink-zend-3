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
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->districtManager = $districtManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'id',
                2 => 'city',
                3 => 'status'                
            ];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);                        
            

            //get list district by condition
            $dataDistrict = $this->districtManager->getListDistrictByCondition(
                $start, $limit, $sortField, $sortDirection,$filters); 
                
            $results = $this->filterByField($dataDistrict['listDistrict'], $fields);
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message' => 'Get list success',
                'data' => $results,
                'total' => $dataDistrict['totalDistrict']
            );
        } 
        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if district  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            //Create New Form District
            $form = new DistrictForm('create', $this->entityManager);

            $form->setData($this->getRequestData());
            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add user.
                $district = $this->districtManager->addDistrict($data,$user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "You added new a Districts!";
            } else {
                $this->error_code = 0;
                $this->apiResponse['data'] = $form->getMessages(); 
                
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
             $district = $this->entityManager->getRepository(District::class)
                ->findOneBy(array('id' => $data['id']));
            if(isset($data['id']) && $district) {
                //Create New Form District
                $form = new DistrictForm('update', $this->entityManager, $district);
                $form->setData($data);
                if ($form->isValid()) {
                   $data = $form->getData();
                   
                   $this->districtManager->updateDistrict($district, $data,$user);
                   $this->error_code = 1;
                   $this->apiResponse['message'] = "You have modified district!";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse['data'] = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['data'] = 'District Not Found'; 
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
              $district = $this->entityManager->getRepository(District::class)
                 ->findOneBy(array('id' => $data['id']));
            if($district) {
                $this->districtManager->deleteDistrict($district);
                $this->error_code = 1;
                $this->apiResponse['message'] = "You have deleted district!";
            } else {
                $this->httpStatusCode = 200;
                $this->error_code = 0;
                $this->apiResponse['data'] = "Not Found District";
            }
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
        }
        return $this->createResponse();
    }

     public function listAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'status',
                2 => 'city_id'
            ];
// var_dump($fieldsMap);die;
            list($sortField,$sortDirection,$filters) = $this->getRequestDataSelect($fieldsMap);

            //get list city by condition
            $dataDistrict = $this->districtManager->getListDistrictSelect(
              $sortField ,$sortDirection, $filters);
            
          $result = [
            "data" => (($dataDistrict['listDistrict']) ? $dataDistrict['listDistrict'] : [] ) ,
            "total" => $dataDistrict['totalDistrict']
          ];

        $this->error_code = 1;
        $this->apiResponse['message'] = 'Success';
        $this->apiResponse['total'] = $result['total'];
        $this->apiResponse['data'] = $result['data'];   
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] = 'Failed';
        }
        return $this->createResponse();
    }

}