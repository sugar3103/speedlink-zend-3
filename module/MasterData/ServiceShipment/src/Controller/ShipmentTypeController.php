<?php
namespace ServiceShipment\Controller;

use Core\Controller\CoreController;

use Doctrine\ORM\EntityManager;
use ServiceShipment\Entity\ShipmentType;
use ServiceShipment\Form\ShipmentTypeForm;
use ServiceShipment\Service\ShipmentTypeManager;

class ShipmentTypeController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var ShipmentTypeManager
     */
    private $shipmentTypeManager;

    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $shipmentTypeManager
     */

    public function __construct($entityManager, $shipmentTypeManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->shipmentTypeManager = $shipmentTypeManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {

            $fieldsMap = ['code', 'name', 'name_en', 'status'];
            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);            
            
            
            //get list User by condition
            $dataShipmentType = $this->shipmentTypeManager->getListShipmentTypeByCondition($start, $limit, $sortField, $sortDirection,$filters,$this->getDeleted());            
            
            $result = $this->filterByField($dataShipmentType['listShipmentType'], $fields);          
                        
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataShipmentType['totalShipmentType']
            );
        }

        return $this->createResponse();
    }

    public function codeAction()
    {
        if ($this->getRequest()->isPost()) {
            $dataShipmentType = $this->shipmentTypeManager->getListShipmentTypeCodeByCondition($this->getDeleted());

            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => !empty($dataShipmentType) ? $dataShipmentType : []            
            );
        }

        return $this->createResponse();
    }

    public function addAction()
    {
         // check if status  has submitted the form
         if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            
            //Create New Form Carrier
            $form = new ShipmentTypeForm('create', $this->entityManager);
            $form->setData($data);

            //validate form
            if ($form->isValid()) {
                try {
                    // get filtered and validated data
                    $data = $form->getData();
                    // add new carrier
                    $this->shipmentTypeManager->addShipmentType($data, $user);
                    
                    $this->apiResponse['message'] = "ADDED_SUCCESS_SHIPMENT_TYPE";
                } catch (\Exception $e) {
                    $this->error_code = -1;
                    $this->apiResponse['message'] = "ERROR_SUCCESS_SHIPMENT_TYPE";
                }
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
                //Create New Form Service
                $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->find($data['id']);
                $form = new ShipmentTypeForm('update', $this->entityManager, $shipmentType);
                $form->setData($data);

                //validate form
                if ($form->isValid()) {
                    try {
                        // get filtered and validated data
                        $data = $form->getData();
                        // add new service
                        $this->shipmentTypeManager->updateShipmentType($shipmentType, $data, $user);                
                        $this->apiResponse['message'] = "EDITED_SUCCESS_SHIPMENT_TYPE";
                    } catch (\Exception $e) {
                        $this->error_code = -1;
                        $this->apiResponse['data'] = "ERROR_EDITED";
                    }
                } else {
                    $this->error_code = 0;            
                    $this->apiResponse['data'] = $form->getMessages(); 
                }  
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
                        $shipmentType = $this->entityManager->getRepository(ShipmentType::class)->find($id);
                        if ($shipmentType == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->shipmentTypeManager->deleteShipmentType($shipmentType,$this->tokenPayload);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETE_SUCCESS_SHIPMENT_TYPE";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SHIPMENT_TYPE_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SHIPMENT_TYPE_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    public function codeByConditionAction()
    {
        if ($this->getRequest()->isPost()) {
            $result = array("data" => []);
            $param = $this->getRequestData([]);
            $sortField = $param['type'];
            unset($param['type']);
            $dataShipmentType = $this->shipmentTypeManager->getListCodeByCondition($sortField, $param, $this->getDeleted());

            $result['error_code'] = 1;
            $result['message'] = 'Success';
            $result["data"] = !empty($dataShipmentType) ? $dataShipmentType : [];
            $this->apiResponse = $result;
        }
        return $this->createResponse();

    }
}