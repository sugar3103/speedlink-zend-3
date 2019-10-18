<?php
namespace ServiceShipment\Controller;

use Core\Controller\CoreController;
use ServiceShipment\Service\CarrierManager;
use Doctrine\ORM\EntityManager;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Form\CarrierForm;

class CarrierController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
    /**
     * @var CarrierManager
     */
    private $carrierManager;
   
    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $carrierManager
     */

    public function __construct($entityManager, $carrierManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->carrierManager = $carrierManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {

            $fieldsMap = ['code', 'name', 'name_en', 'status'];
            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);            
            
            
            //get list User by condition
            $dataCarrier = $this->carrierManager->getListCarrierByCondition($start, $limit, $sortField, $sortDirection,$filters,$this->getDeleted());            
            
            $result = $this->filterByField($dataCarrier['listCarrier'], $fields);          
                        
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataCarrier['totalCarrier']
            );
        }

        return $this->createResponse();
    }

    public function codeAction()
    {
        if ($this->getRequest()->isPost()) {
            $dataCarrier = $this->carrierManager->getListCarrierCodeByCondition($this->getDeleted());

            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => !empty($dataCarrier) ? $dataCarrier : []            
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
            $form = new CarrierForm('create', $this->entityManager);
            $form->setData($data);

            //validate form
            if ($form->isValid()) {
                try {
                    // get filtered and validated data
                    $data = $form->getData();
                    // add new carrier
                    $this->carrierManager->addCarrier($data, $user);
                    
                    $this->apiResponse['message'] = "ADDED_SUCCESS_CARRIER";
                } catch (\Exception $e) {
                    $this->error_code = -1;
                    $this->apiResponse['message'] = "ERROR_SUCCESS_CARRIER";
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
                //Create New Form Carrier
                $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['id']);
                $form = new CarrierForm('update', $this->entityManager, $carrier);
                $form->setData($data);

                //validate form
                if ($form->isValid()) {
                    try {
                        // get filtered and validated data
                        $data = $form->getData();
                        // add new carrier
                        $this->carrierManager->updateCarrier($carrier, $data, $user);                
                        $this->apiResponse['message'] = "EDITED_SUCCESS_CARRIER";
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
                        $carrier = $this->entityManager->getRepository(Carrier::class)->find($id);
                        if ($carrier == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->carrierManager->deleteCarrier($carrier,$this->tokenPayload);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETE_SUCCESS_CARRIER";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "CARRIER_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "CARRIER_REQUEST_IDs";
            }
        }

        return $this->createResponse();
    }

    public function removeAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            
            if(isset($data['ids']) && count($data['ids']) > 0) {
                try {
                    foreach ($data['ids'] as $id) {
                        $carrier = $this->entityManager->getRepository(Carrier::class)->find($id);
                        if ($carrier == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->carrierManager->removeCarrier($carrier);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "REMOVE_SUCCESS_CARRIER";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "CARRIER_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "CARRIER_REQUEST_IDs";
            }
        }

        return $this->createResponse();
    }
}