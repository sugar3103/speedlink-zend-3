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
                3 => 'status',              
                4 => 'name_en',
            ];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);                        
            
            //get list district by condition
            $dataDistrict = $this->districtManager->getListDistrictByCondition(
                $start, $limit, $sortField, $sortDirection,$filters); 
                
            $results = $this->filterByField($dataDistrict['listDistrict'], $fields);
            
            
            $this->apiResponse =  array(
                'message' => 'SUCCESS',
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
                
                $this->apiResponse['message'] = "ADD_SUCCESS_DISTRICT";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = $form->getMessages(); 
                
            }            
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";                 
        }

        return $this->createResponse();
    }

    public function editAction() {
        if ($this->getRequest()->isPost()) {
            $data =$this->getRequestData();             
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
                   
                   $this->apiResponse['message'] = "MODIFIED_SUCCESS_DISTRICT";
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
                        $district = $this->entityManager->getRepository(District::class)->findOneBy(array('id' => $id));    
                        if ($district == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->districtManager->deleteDistrict($district);
                        }  
                    }
                                        
                    $this->apiResponse['message'] = "DELETE_SUCCESS_DISTRICT";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "DISTRICT_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DISTRICT_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}