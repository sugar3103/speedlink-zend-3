<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticZoneManager;
use PricingDomestic\Form\ZoneForm;
use PricingDomestic\Entity\DomesticZone;

class DomesticZoneController extends CoreController {
        /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var DomesticZoneManager
         */
        protected $domesticZoneManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticZoneManager
         */

    public function __construct($entityManager,$domesticZoneManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->domesticZoneManager = $domesticZoneManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [0 => 'id', 1 => 'name', 2 => 'name_en', 3 => 'created_at'];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataZone = $this->domesticZoneManager->getListDomesticZoneByCondition($start, $limit, $sortField, $sortDirection,$filters); 
            
            $result = $this->filterByField($dataZone['listZone'], $fields);     
            
            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataZone['totalZone']
            );                        
        } 
        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if Domestic Zone  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            
            //Create New Form Domestic Zone
            $form = new ZoneForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Domestic Zone.
                $this->domesticZoneManager->addZone($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_DOMESTIC_ZONE";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages(); 
            }            
        }

        return $this->createResponse();
    }

    public function editAction() 
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            if(isset($data['id'])) {
                // Find existing Domestic Zone in the database.
                $area = $this->entityManager->getRepository(DomesticZone::class)->findOneBy(array('id' => $data['id']));    
                if ($area) {
                    //Create Form Zone
                    $form = new ZoneForm('update', $this->entityManager, $area);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Domestic Zone.
                        $this->domesticZoneManager->updateZone($area, $data, $user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_DOMESTIC_ZONE";
                    } else {
                        $this->error_code = 0;
                        $this->apiResponse['data'] = $form->getMessages(); 
                    }      
                } else {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "NOT_FOUND";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_ZONE_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $user = $this->tokenPayload;
            if(isset($data['ids']) && count($data['ids']) > 0) {
               
                try { 
                    foreach ($data['ids'] as $id) {
                        $zone = $this->entityManager->getRepository(DomesticZone::class)->findOneBy(array('id' => $id));    
                        if ($zone == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->domesticZoneManager->deleteZone($zone, $user);
                            $this->apiResponse['message'] = "DELETE_SUCCESS_DOMESTIC_ZONE";
                        }  
                    }                    
                    
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "DOMESTIC_ZONE_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_ZONE_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}