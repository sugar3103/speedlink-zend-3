<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticAreaManager;
use PricingDomestic\Form\AreaCityForm;
use PricingDomestic\Entity\DomesticAreaCity;

class DomesticAreaCityController extends CoreController {
        /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var DomesticAreaCityManager
         */
        protected $domesticAreaCityManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticAreaCityManager
         */

    public function __construct($entityManager,$domesticAreaCityManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->domesticAreaCityManager = $domesticAreaCityManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [0 => 'id', 1 => 'name', 2 => 'name_en', 2 => 'created_at'];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataArea = $this->domesticAreaCityManager->getListDomesticAreaCityByCondition($start, $limit, $sortField, $sortDirection,$filters); 
            
            $result = $this->filterByField($dataArea['listAreaCity'], $fields);     
            
            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataArea['totalAreaCity']
            );                        
        } 
        return $this->createResponse();
    }

    public function addAction()
    {   
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();            
             //Create New Form Domestic Area
             $form = new AreaCityForm('create', $this->entityManager);

             $form->setData($this->getRequestData());            
             //validate form
             if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                
                $this->domesticAreaCityManager->deleteAreaCity($data['area_id']);             
                foreach ($data['cities'] as $id) {
                    $this->domesticAreaCityManager->updateAreaCity($data['area_id'], $id, $user);
                }
                try { 
                   
                    
                    $this->apiResponse['message'] = "ADD_SUCCESS_DOMESTIC_AREA_CITY";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "DOMESTIC_AREA_ERROR";
                }                    
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages(); 
            }   
        }
        return $this->createResponse();
    }

    // public function editAction() 
    // {
    //     if ($this->getRequest()->isPost()) {
    //         $user = $this->tokenPayload;
    //         $data = $this->getRequestData();
    //         if(isset($data['id'])) {
    //             // Find existing Domestic Area in the database.
    //             $area = $this->entityManager->getRepository(DomesticArea::class)->findOneBy(array('id' => $data['id']));    
    //             if ($area) {
    //                 //Create Form Area
    //                 $form = new AreaForm('update', $this->entityManager, $area);
    //                 $form->setData($data);
    //                 //validate form
    //                 if ($form->isValid()) {
    //                     // get filtered and validated data
    //                     $data = $form->getData();
    //                     // update Domestic Area.
    //                     $this->domesticAreaCityManager->updateArea($area, $data,$user);
    //                     $this->apiResponse['message'] = "MODIFIED_SUCCESS_DOMESTIC_AREA";
    //                 } else {
    //                     $this->error_code = 0;
    //                     $this->apiResponse['data'] = $form->getMessages(); 
    //                 }      
    //             } else {
    //                 $this->error_code = 0;
    //                 $this->apiResponse['message'] = "NOT_FOUND";
    //             }
    //         } else {
    //             $this->error_code = 0;
    //             $this->apiResponse['message'] = "DOMESTIC_AREA_REQUEST_ID";
    //         }
    //     }

    //     return $this->createResponse();
    // }

    // public function deleteAction()
    // {
    //     if ($this->getRequest()->isPost()) {
    //         $data = $this->getRequestData();
            
    //         if(isset($data['ids']) && count($data['ids']) > 0) {
               
    //             try { 
    //                 foreach ($data['ids'] as $id) {
    //                     $area = $this->entityManager->getRepository(DomesticArea::class)->findOneBy(array('id' => $id));    
    //                     if ($area == null) {
    //                         $this->error_code = 0;
    //                         $this->apiResponse['message'] = "NOT_FOUND";                        
    //                     } else {
    //                         $this->domesticAreaCityManager->deleteArea($area);
    //                     }  
    //                 }
                    
    //                 $this->apiResponse['message'] = "DELETE_SUCCESS_DOMESTIC_AREA";
    //             } catch (\Throwable $th) {
    //                 $this->error_code = 0;
    //                 $this->apiResponse['message'] = "DOMESTIC_AREA_REQUEST_ID";
    //             }
    //         } else {
    //             $this->error_code = 0;
    //             $this->apiResponse['message'] = "DOMESTIC_AREA_REQUEST_ID";
    //         }
    //     }
    //     return $this->createResponse();
    // }

    public function cityAction(Type $var = null)
    {
        $cities = $this->domesticAreaCityManager->getCities();
        $this->apiResponse =  array(
            'data'      => $cities['listCity'],
            'total'     => $cities['totalCity']
        );  
        
        return $this->createResponse();
    }
}