<?php
namespace RangeWeight\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Pricing\Entity\RangeWeight;
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
              12 => 'created_at'
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

    public function addAction()
  {  
    if ($this->getRequest()->isPost()) {
      $user = $this->tokenPayload;
      $form = new RangeWeightForm('create', $this->entityManager);
      $form->setData($this->getRequestData());
        //validate form
      if ($form->isValid()) {
        $data = $form->getData();
        $data['created_by'] = $user->id;
        $result = $this->rangeweightManager->addRangeWeight($data);                
        // Check result
        $this->error_code = 1;
        $this->apiResponse['message'] = "Success: You have added a RangeWeight!";
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = $form->getMessages();
      }
    }
    return $this->createResponse();
  }

    public function editAction()
    {
    if ($this->getRequest()->isPost()) {
      $data = $this->getRequestData();
      $user = $this->tokenPayload;
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
          $this->apiResponse['message'] = $form->getMessages();
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
        if(isset($data['id'])) {
            // Find existing rangeweight in the database.
            $rangeweight = $this->entityManager->getRepository(RangeWeight::class)->findOneBy(array('id' => $data['id']));    
            if ($rangeweight == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "RangeWeight Not Found";
            } else {
                //remove rangeweight
                $this->rangeweightManager->removeRangeWeight($rangeweight);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted RangeWeight!";
            }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "RangeWeight request Id!";
        }
        return $this->createResponse();
    }
}