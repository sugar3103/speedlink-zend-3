<?php
namespace RangeWeight\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use RangeWeight\Entity\RangeWeight;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
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
              2 => 'code',
              3 => 'carrier_id',
              4 => 'category',
              5 => 'service_id',
              6 => 'shipmenttype',
              7 => 'status',
              8 => 'from',
              9 => 'to',
              10 => 'calculate_unit',
              11 => 'round_up',
              12 => 'created_at',
              13 => 'customer'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataRangeWeight = $this->rangeweightManager->getListRangeWeightByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = ($dataRangeWeight['listRangeWeight']) ? $dataRangeWeight['listRangeWeight'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Success",
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

      $check_exits = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category' => $data['category'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'], 'code' => $data['code'], 'from' => $data['from'], 'to' => $data['to']));    
        if($check_exits)
        {
          $this->error_code = 0;
          $this->apiResponse['message'] = "Already have this Range Weight!";
          return $this->createResponse();
        }

      $form = new RangeWeightForm('create', $this->entityManager);
      $form->setData($data);
        //validate form
      if ($form->isValid()) {
        $data = $form->getData();
        $data['created_by'] = $user->id;
        // var_dump($data);die();
        $result = $this->rangeweightManager->addRangeWeight($data);                
        // Check result
        $this->error_code = 1;
        $this->apiResponse['message'] = "Success: You have added a RangeWeight!";
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

      $check_exits = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category' => $data['category'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'], 'code' => $data['code'], 'from' => $data['from'], 'to' => $data['to']));    
      if($check_exits)
      {
        $rangeweight_id = $check_exits->getId();
        if($rangeweight_id != $data['id']) {
        $this->error_code = 0;
        $this->apiResponse['data'] = "Already have this Range Weight!";
        return $this->createResponse();
        }
      }

      $data['updated_by'] = $user->id;
      $rangeweight = $this->entityManager->getRepository(RangeWeight::class)->find($data['id']);
      if ($rangeweight) {
        $form = new RangeWeightForm('update', $this->entityManager, $rangeweight);
        $form->setData($data);
        if ($form->isValid()) {
          $result = $this->rangeweightManager->updateRangeWeight($rangeweight, $data);                
        // Check result
          $this->error_code = 1;
          $this->apiResponse['message'] = "You have modified RangeWeight!";
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] = "Errors";
          $this->apiResponse['data'] = $form->getMessages();
        }
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = 'RangeWeight Not Found';
      }
    }
    return $this->createResponse();
  }

    public function deleteAction()
    {
        $data = $this->getRequestData();
        if(isset($data['id'])  && count($data['id']) > 0) {
          try {
            foreach ($data['id'] as $id) {
            // Find existing rangeweight in the database.
            $rangeweight = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('id' => $data['id']));    
            if ($rangeweight == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "RangeWeight Not Found";
                exit();
            } else {
                //remove rangeweight
                $this->rangeweightManager->removeRangeWeight($rangeweight);
            }
          }
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted RangeWeight!";
            }     
          catch (\Throwable $th) {
            $this->error_code = 0;
            $this->apiResponse['message'] = "Status request Id!";
          }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "RangeWeight request Id!";
        }
        return $this->createResponse();
    }
}