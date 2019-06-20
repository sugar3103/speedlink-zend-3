<?php
namespace RangeWeight\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use RangeWeight\Entity\RangeWeight;
use RangeWeight\Form\RangeWeightForm;

class RangeWeightController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * RangeWeight Manager.
     * @var RangeWeightManager
     */
    protected $rangeweightManager;

    /**
     * RangeWeightController constructor.
     * @param $entityManager
     * @param $rangeweightManager
     */

    public function __construct($entityManager, $rangeweightManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->rangeweightManager = $rangeweightManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
              0 => 'id',
              1 => 'is_private',
              2 => 'name',
              3 => 'name_en',
              4 => 'carrier_id',
              5 => 'category_id',
              6 => 'service_id',
              7 => 'shipment_type_id',
              8 => 'status',
              9 => 'from',
              10 => 'to',
              11 => 'calculate_unit',
              12 => 'round_up',
              13 => 'created_at',
              14 => 'customer_id'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataRangeWeight = $this->rangeweightManager->getListRangeWeightByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = ($dataRangeWeight['listRangeWeight']) ? $dataRangeWeight['listRangeWeight'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataRangeWeight['totalRangeWeight']
            );                         
        } 

        return $this->createResponse();
    }

    /**
    * Add RangeWeight Action
    * @throws \Exception
    */
    public function addAction()
  {  
    if ($this->getRequest()->isPost()) {
      $user = $this->tokenPayload;
      $data = $this->getRequestData();

      $check_exits = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category_id' => $data['category_id'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'],'from' => $data['from'], 'to' => $data['to']));    
        if($check_exits)
        {
          $this->error_code = 0;
          $this->apiResponse['message'] = "ALEADY_EXISTS";
          return $this->createResponse();
        }

      $form = new RangeWeightForm('create', $this->entityManager);
      $form->setData($data);
        //validate form
      if ($form->isValid()) {
        $data = $form->getData();
       
       $this->rangeweightManager->addRangeWeight($data, $user);                
        // Check result
        $this->apiResponse['message'] = "ADD_SUCCESS";
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = "Errors";
        $this->apiResponse['data'] = $form->getMessages();
      }
    }
    return $this->createResponse();
  }

    public function editAction()
    {
    if ($this->getRequest()->isPost()) {
      $data = $this->getRequestData();
      $user = $this->tokenPayload;
      if(isset($data['id'])) {
      $check_exits = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category_id' => $data['category_id'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'], 'from' => $data['from'], 'to' => $data['to']));    
      if($check_exits)
      {
        $rangeweight_id = $check_exits->getId();
        if($rangeweight_id != $data['id']) {
        $this->error_code = 0;
        $this->apiResponse['data'] = "ALEADY_EXISTS";
        return $this->createResponse();
        }
      }

      $rangeweight = $this->entityManager->getRepository(RangeWeight::class)->find($data['id']);
      if ($rangeweight) {
        $form = new RangeWeightForm('update', $this->entityManager, $rangeweight, $user);
        $form->setData($data);
        if ($form->isValid()) {
          $result = $this->rangeweightManager->updateRangeWeight($rangeweight, $data, $user);                
        // Check result
          $this->apiResponse['message'] = "MODIFIED_SUCCESS";
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] = "Errors";
          $this->apiResponse['data'] = $form->getMessages();
        }
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = 'NOT_FOUND';
      }
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = "RANGE_WEIGHT_REQUEST_ID";
      }
    }
    return $this->createResponse();
  }

    public function deleteAction()
    {
        $data = $this->getRequestData();
        if(isset($data['ids'])  && count($data['ids']) > 0) {
          try {
            foreach ($data['ids'] as $id) {
            // Find existing rangeweight in the database.
            $rangeweight = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('id' => $id));    
            if ($rangeweight == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "NOT_FOUND";
            } else {
                //remove rangeweight
                $this->rangeweightManager->removeRangeWeight($rangeweight);
            }
          }
                $this->apiResponse['message'] = "DELETE_SUCCESS";
            }     
          catch (\Throwable $th) {
            $this->error_code = 0;
            $this->apiResponse['message'] = "RANGE_WEIGHT_REQUEST_ID";
          }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "RANGE_WEIGHT_REQUEST_ID";
        }
        return $this->createResponse();
    }
}