<?php
namespace ZoneCode\Controller;

use Core\Controller\CoreController;
use ZoneCode\Form\ZoneCodeForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use ZoneCode\Entity\ZoneCode;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class ZoneCodeController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * ZoneCode Manager.
     * @var ZoneCodeManager
     */
    protected $zonecodeManager;

    /**
     * ZondeCodeController constructor.
     * @param $entityManager
     * @param $zonecodeManager
     */

    public function __construct($entityManager, $zonecodeManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->zonecodeManager = $zonecodeManager;
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
            8 => 'origin_country',
            9 => 'origin_city',
            10 => 'origin_district',
            11 => 'origin_ward',
            12 => 'destination_country',
            13 => 'destination_city',
            14 => 'destination_district',
            15 => 'destination_ward',
            16 => 'created_at'
        ];
        list($start, $limit, $sortField, $sortDirection, $filters, $fields) = $this->getRequestData($fieldsMap);

        $dataZoneCode = $this->zonecodeManager->getListZoneCodeByCondition(
            $start,
            $limit,
            $sortField,
            $sortDirection,
            $filters
        );
        $results = $this->filterByField($dataZoneCode['listZoneCode'], $fields);

        $this->error_code = 1;
        $this->apiResponse = array(
            'message' => 'Get list success',
            'data' => $results,
            'total' => $dataZoneCode['totalZoneCode']
        );
        }
        return $this->createResponse();
    }

    public function addAction()
    {  
      if ($this->getRequest()->isPost()) {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
 //  var_dump($result);die();
        $check_exits = $this->entityManager->getRepository(ZoneCode::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category' => $data['category'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'], 'code' => $data['code']));    
        if($check_exits)
        {
          $this->error_code = 0;
          $this->apiResponse['data'] = "Already have this Zone Code!";
          return $this->createResponse();
        }

        $form = new ZoneCodeForm('create', $this->entityManager);
        $form->setData($data);
          //validate form
        if ($form->isValid()) {
          $data = $form->getData();
          $data['created_by'] = $user->id;
          $result = $this->zonecodeManager->addZoneCode($data);                
          // Check result
          $this->error_code = 1;
          $this->apiResponse['message'] = "Success: You have added a ZoneCode!";
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] ="Error";
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

      $check_exits = $this->entityManager->getRepository(ZoneCode::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category' => $data['category'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'], 'code' => $data['code']));    
        if($check_exits)
        {
          $zonecode_id = $check_exits->getId();
          if($zonecode_id != $data['id']) {
          $this->error_code = 0;
          $this->apiResponse['data'] = "Already have this Zone Code!";
          return $this->createResponse();
          }
        }

      $data['updated_by'] = $user->id;
      $zonecode = $this->entityManager->getRepository(ZoneCode::class)->find($data['id']);
      if ($zonecode) {
        $form = new ZoneCodeForm('update', $this->entityManager, $zonecode);
        $form->setData($data);
        if ($form->isValid()) {
          $result = $this->zonecodeManager->updateZoneCode($zonecode, $data);                
        // Check result
          $this->error_code = 1;
          $this->apiResponse['message'] = "You have modified ZoneCode!";
        } else {
          $this->error_code = 0;
          $this->apiResponse['message'] ="Error";
          $this->apiResponse['data'] = $form->getMessages();
        }
      } else {
        $this->error_code = 0;
        $this->apiResponse['message'] = 'ZoneCode Not Found';
      }
    }
    return $this->createResponse();
  }

    public function deleteAction()
    {
        $data = $this->getRequestData();
        if(isset($data['id'])) {
            // Find existing zonecode in the database.
            $zonecode = $this->entityManager->getRepository(ZoneCode::class)->findOneBy(array('id' => $data['id']));    
            if ($zonecode == null) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "ZoneCode Not Found";
            } else {
                //remove zonecode
                $this->zonecodeManager->removeZoneCode($zonecode);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted ZoneCode!";
            }          
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "ZoneCode request Id!";
        }
        return $this->createResponse();
    }
}