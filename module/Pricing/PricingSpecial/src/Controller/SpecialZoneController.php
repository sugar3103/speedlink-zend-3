<?php
namespace PricingSpecial\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingSpecial\Entity\SpecialZone;
use PricingSpecial\Form\ZoneForm;
use PricingSpecial\Service\SpecialZoneManager;

class SpecialZoneController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * Customer Manager.
     * @var SpecialZoneManager
     */
    protected $specialZoneManager;

    /**
     * CustomerController constructor.
     * @param $entityManager
     * @param $specialZoneManager
     */

    public function __construct($entityManager, $specialZoneManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->specialZoneManager = $specialZoneManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [0 => 'id', 1 => 'name', 2 => 'name_en', 3 => 'created_at'];

            list($start, $limit, $sortField, $sortDirection, $filters, $fields) = $this->getRequestData($fieldsMap);
            //get list User by condition
            $dataZone = $this->specialZoneManager->getListSpecialZoneByCondition($start, $limit, $sortField, $sortDirection, $filters);

            $result = $this->filterByField($dataZone['listZone'], $fields);

            $this->apiResponse = array(
                'data' => $result,
                'total' => $dataZone['totalZone'],
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        // check if Special Zone  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;

            //Create New Form Special Zone
            $form = new ZoneForm('create', $this->entityManager);

            $form->setData($this->getRequestData());
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Special Zone.
                $this->specialZoneManager->addZone($data, $user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_ZONE";
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
            if (isset($data['id'])) {
                // Find existing Special Zone in the database.
                $area = $this->entityManager->getRepository(SpecialZone::class)->findOneBy(array('id' => $data['id']));
                if ($area) {
                    //Create Form Zone
                    $form = new ZoneForm('update', $this->entityManager, $area);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Special Zone.
                        $this->specialZoneManager->updateZone($area, $data, $user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_SPECIAL_ZONE";
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
                $this->apiResponse['message'] = "SPECIAL_ZONE_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $user = $this->tokenPayload;
            if (isset($data['ids']) && count($data['ids']) > 0) {

                try {
                    foreach ($data['ids'] as $id) {
                        $zone = $this->entityManager->getRepository(SpecialZone::class)->findOneBy(array('id' => $id));
                        if ($zone == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";
                        } else {
                            $this->specialZoneManager->deleteZone($zone, $user);
                            $this->apiResponse['message'] = "DELETE_SUCCESS_SPECIAL_ZONE";
                        }
                    }

                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_ZONE_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_ZONE_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}
