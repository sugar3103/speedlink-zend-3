<?php
namespace PricingSpecial\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingSpecial\Service\SpecialRangeWeightManager;
use PricingSpecial\Form\RangeWeightForm;
use PricingSpecial\Entity\SpecialRangeWeight;

class SpecialRangeWeightController extends CoreController {
        /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var SpecialRangeWeightManager
         */
        protected $SpecialRangeWeightManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $SpecialRangeWeightManager
         */

    public function __construct($entityManager,$SpecialRangeWeightManager) {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->SpecialRangeWeightManager = $SpecialRangeWeightManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'id', 
                1 => 'name', 
                2 => 'name_en', 
                3 => 'category_id',
                4 => 'carrier_id',
                5 => 'service_id',
                6 => 'shipment_type_id',
                7 => 'status',
                8 => 'calculate_unit',
                9 => 'round_up',
                10 => 'zone_id',
                12 => 'from',
                13 => 'to',
                15 => 'customer_id',
                16 => 'special_area_id'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataRangeWeight = $this->SpecialRangeWeightManager->getListSpecialRangeWeightByCondition($start, $limit, $sortField, $sortDirection,$filters); 
            
            $result = $this->filterByField($dataRangeWeight['listRangeWeight'], $fields);     
            
            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataRangeWeight['totalRangeWeight']
            );                        
        } 
        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if Special RangeWeight  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            
            //Create New Form Special RangeWeight
            $form = new RangeWeightForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Special RangeWeight.
                $this->SpecialRangeWeightManager->addRangeWeight($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_RANGEWEIGHT";
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
                // Find existing Special RangeWeight in the database.
                $area = $this->entityManager->getRepository(SpecialRangeWeight::class)->findOneBy(array('id' => $data['id']));    
                if ($area) {
                    //Create Form RangeWeight
                    $form = new RangeWeightForm('update', $this->entityManager, $area);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Special RangeWeight.
                        $this->SpecialRangeWeightManager->updateRangeWeight($area, $data,$user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_SPECIAL_RANGEWEIGHT";
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
                $this->apiResponse['message'] = "SPECIAL_RANGEWEIGHT_REQUEST_ID";
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
                        $rangeWeight = $this->entityManager->getRepository(SpecialRangeWeight::class)->findOneBy(array('id' => $id, 'is_deleted' => 0));    
                        if ($rangeWeight == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->SpecialRangeWeightManager->deleteRangeWeight($rangeWeight, $user);
                            $this->apiResponse['message'] = "DELETE_SUCCESS_SPECIAL_RANGEWEIGHT";
                        }  
                    }
                    
                    
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_RANGEWEIGHT_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_RANGEWEIGHT_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}