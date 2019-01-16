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
        $this->apiResponse['message'] = 'District';

        return $this->createResponse();
    }

    public function listAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'district',
                2 => 'status'                
            ];

            list($currentPage,$totalPages,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);                        
            
            //get list district by condition
            $dataDistrict = $this->districtManager->getListDistrictByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            
            $result = [
                "meta" => [
                    "page" => $currentPage,
                    "pages" => $totalPages,
                    "from" => ($currentPage - 1) * $limit + 1,
                    "to" => ($currentPage * $limit) > $dataDistrict['totalDistrict'] ? $dataDistrict['totalDistrict'] : ($currentPage * $limit),
                    "perpage"=> $limit,
                    "totalItems" => $dataDistrict['totalDistrict'],
                    "totalPage" => ceil($dataDistrict['totalDistrict']/$limit)
                ],
                "data" => ($dataDistrict['listDistrict']) ? $dataDistrict['listDistrict'] : []           
            ];

            $this->error_code = 1;
            $this->apiResponse = $result;            
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
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
                $this->apiResponse['message'] = "Success: You have modified Districts!";
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
             $district = $this->entityManager->getRepository(District::class)
                ->findOneBy(array('districtId' => $data['district_id']));
            if(isset($data['district_id']) && $district) {
                //Create New Form District
                $form = new DistrictForm('update', $this->entityManager, $district);
                $form->setData($data);
                if ($form->isValid()) {
                   $data = $form->getData();
                   
                   $this->districtManager->updateDistrict($district, $data,$user);
                   $this->error_code = 1;
                   $this->apiResponse['message'] = "Success: You have modified district!";
                }  else {
                   $this->error_code = 0;
                   $this->apiResponse = $form->getMessages(); 
                }   
            }   else {
                $this->error_code = 0;
                $this->apiResponse['message'] = 'District Not Found'; 
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
                 ->findOneBy(array('districtId' => $data['district_id']));
            if($district) {
                $this->districtManager->deleteDistrict($district);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted district!";
            } else {
                $this->httpStatusCode = 200;
                $this->error_code = -1;
                $this->apiResponse['message'] = "Not Found District";
            }
        } else {
            $this->httpStatusCode = 404;
            $this->apiResponse['message'] = "Page Not Found";            
        }
        return $this->createResponse();
    }
}