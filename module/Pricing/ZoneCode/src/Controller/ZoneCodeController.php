<?php
namespace ZoneCode\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use ZoneCode\Entity\ZoneCode;
use ZoneCode\Form\ZoneCodeForm;

class ZoneCodeController extends CoreController
{
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
                2 => 'name',
                3 => 'name_en',
                4 => 'carrier_id',
                5 => 'category_id',
                6 => 'service_id',
                7 => 'shipment_type_id',
                8 => 'status',
                9 => 'origin_country_id',
                10 => 'origin_city_id',
                11 => 'origin_district_id',
                12 => 'origin_ward_id',
                13 => 'destination_country_id',
                14 => 'destination_city_id',
                15 => 'destination_district_id',
                16 => 'destination_ward_id',
                17 => 'created_at',
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
                'data' => $results,
                'total' => $dataZoneCode['totalZoneCode'],
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            if ($data['category_id'] == 3) {
                if (($data['origin_city_id'] == null || $data['origin_city_id'] == '' || intval($data['origin_city_id']) <= 0)) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "Error";
                    $this->apiResponse['data']['origin_city_id']['missingOriginCity'] = 'Missing Origin City!';
                    return $this->createResponse();
                }
                if ($data['destination_city_id'] == null || $data['destination_city_id'] == '' || intval($data['destination_city_id']) <= 0) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "Error";
                    $this->apiResponse['data']['destination_city_id']['missingDetinationCity'] = 'Missing Destination City!';
                    return $this->createResponse();
                }
            }

            $check_exits = $this->entityManager->getRepository(ZoneCode::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category_id' => $data['category_id'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id'] ));
            if ($check_exits) {
                $this->error_code = 0;
                $this->apiResponse['data'] = "Already have this Zone Code!";
                return $this->createResponse();
            }

            $form = new ZoneCodeForm('create', $this->entityManager);
            $form->setData($data);
            //validate form
            if ($form->isValid()) {
                $data = $form->getData();
                $this->zonecodeManager->addZoneCode($data, $user);
                // Check result
                $this->apiResponse['message'] = "ADD_SUCCESS";
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
            $data = $this->getRequestData();
            $user = $this->tokenPayload;
            if (isset($data['id'])) {
                $check_exits = $this->entityManager->getRepository(ZoneCode::class)->findOneBy(array('carrier_id' => $data['carrier_id'], 'category_id' => $data['category_id'], 'service_id' => $data['service_id'], 'shipment_type_id' => $data['shipment_type_id']));
                if ($check_exits) {
                    $zonecode_id = $check_exits->getId();
                    if ($zonecode_id != $data['id']) {
                        $this->error_code = 0;
                        $this->apiResponse['message'] = "ALEADY_EXISTS";
                        return $this->createResponse();
                    }
                }

                $data['updated_by'] = $user->id;
                $zonecode = $this->entityManager->getRepository(ZoneCode::class)->find($data['id']);
                if ($zonecode) {
                    $form = new ZoneCodeForm('update', $this->entityManager, $zonecode);
                    $form->setData($data);
                    if ($form->isValid()) {
                        $this->zonecodeManager->updateZoneCode($zonecode, $data, $user);
                        // Check result
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS";
                    } else {
                        $this->error_code = 0;
                        $this->apiResponse['message'] = "Error";
                        $this->apiResponse['data'] = $form->getMessages();
                    }
                } else {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = 'NOT_FOUND';
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "ZONE_CODE_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }

    public function deleteAction()
    {
        $data = $this->getRequestData();
        
        if (isset($data['ids']) && count($data['ids']) > 0) {
            try {
             
                foreach ($data['ids'] as $id) { 
                    // Find existing zonecode in the database.
                    $zonecode = $this->entityManager->getRepository(ZoneCode::class)->findOneBy(array('id' => $id));
                    if ($zonecode == null) {
                        $this->error_code = 0;
                        $this->apiResponse['message'] = "NOT_FOUND";                        
                    } else {
                        //remove zonecode
                        $this->zonecodeManager->removeZoneCode($zonecode);
                        $this->apiResponse['message'] = "DELETE_SUCCESS";
                    }
                }                
            } catch (\Throwable $th) {
                $this->error_code = 0;
                $this->apiResponse['message'] = "ZONE_CDDE_REQUEST_ID";
            }
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = "ZONE_CDDE_REQUEST_ID";
        }
        return $this->createResponse();
    }
}
