<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticAreaManager;
use PricingDomestic\Form\AreaForm;
use PricingDomestic\Entity\DomesticArea;

class DomesticAreaController extends CoreController {
        /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var DomesticAreaManager
         */
        protected $domesticAreaManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticAreaManager
         */

    public function __construct($entityManager,$domesticAreaManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->domesticAreaManager = $domesticAreaManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [0 => 'id', 1 => 'name', 2 => 'name_en', 3 => 'created_at'];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);          
            
            //get list User by condition
            $dataArea = $this->domesticAreaManager->getListDomesticAreaByCondition($start, $limit, $sortField, $sortDirection,$filters); 
            
            $result = $this->filterByField($dataArea['listArea'], $fields);     
            
            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataArea['totalArea']
            );                        
        } 
        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if Domestic Area  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            
            //Create New Form Domestic Area
            $form = new AreaForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Domestic Area.
                $this->domesticAreaManager->addArea($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_DOMESTIC_AREA";
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
                // Find existing Domestic Area in the database.
                $area = $this->entityManager->getRepository(DomesticArea::class)->findOneBy(array('id' => $data['id']));    
                if ($area) {
                    //Create Form Area
                    $form = new AreaForm('update', $this->entityManager, $area);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Domestic Area.
                        $this->domesticAreaManager->updateArea($area, $data,$user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_DOMESTIC_AREA";
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
                $this->apiResponse['message'] = "DOMESTIC_AREA_REQUEST_ID";
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
                        $area = $this->entityManager->getRepository(DomesticArea::class)->findOneBy(array('id' => $id));    
                        if ($area == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->domesticAreaManager->deleteArea($area, $user);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETE_SUCCESS_DOMESTIC_AREA";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "DOMESTIC_AREA_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_AREA_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    
}