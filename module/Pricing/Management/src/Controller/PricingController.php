<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingDataManager;
use Management\Service\PricingManager;
use Management\Entity\Pricing;

class PricingController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * Pricing Manager.
     * @var PricingManager
     */
    protected $pricingManager;

    /**
     * Pricing Data Manager.
     * @var $pricingDataManager
     */
    protected $pricingDataManager;

    /**
     * PricingController constructor.
     * @param $entityManager
     * @param PricingManager $pricingManager
     * @param PricingDataManager $pricingDataManager
     */
    public function __construct($entityManager, $pricingManager, $pricingDataManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingManager = $pricingManager;
        $this->pricingDataManager = $pricingDataManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            $result = ["total" => 0, "data" => []];
            $fieldsMap = [
                'id', 'is_private', 'customer_id', 'saleman_id', 'status', 
                'category_id', 'carrier_id', 'effected_date', 'expired_date', 
                'origin_country_id', 'origin_city_id', 'origin_district_id', 'origin_ward_id', 
                'approval_status', 'approved_by'
            ];
            list($start, $limit, $sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
            $dataShipmentType = $this->pricingManager->getListPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);

            $result['error_code'] = 1;
            $result['message'] = 'Success';
            $result["total"] = $dataShipmentType['totalPricing'];
            $result["data"] = !empty($dataShipmentType['listPricing']) ? $dataShipmentType['listPricing'] : [];
            $this->apiResponse = $result;
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
            $dataShipmentType = $this->pricingManager->getListCodeByCondition($sortField, $param);

            $result['error_code'] = 1;
            $result['message'] = 'Success';
            $result["data"] = !empty($dataShipmentType) ? $dataShipmentType : [];
            $this->apiResponse = $result;
        }
        return $this->createResponse();

    }

    public function addAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        $form = new PricingForm('create', $this->entityManager, null, $data);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // add new pricing
                $pricing = $this->pricingManager->addPricing($data, $user);                
                $this->error_code = 1;
                $this->apiResponse['data'] = $pricing->getId();
                $this->apiResponse['message'] = "Success: You have added a pricing!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->error_code = -1;
            $this->apiResponse = $form->getMessages();
        }

        return $this->createResponse();
    }

    public function editAction()
    {
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }

        //Update Form Pricing
        $pricing = $pricing = $this->entityManager->getRepository(Pricing::class)->find($data['id']);

        $form = new PricingForm('update', $this->entityManager, $pricing, $data);
        $form->setData($data);

        //validate form
        if ($form->isValid()) {
            try {
                // add new pricing
                $category_id = $pricing->getCategoryId();
                $carrier_id = $pricing->getCarrierId();
                $origin_country_id = $pricing->getOriginCountryId();
                $origin_city_id = $pricing->getOriginCityId();
                $origin_district_id = $pricing->getOriginDistrictId();
                $origin_ward_id = $pricing->getOriginWardId();
                $pricing = $this->pricingManager->updatePricing($pricing, $data, $user);
                $district_id = empty($data['origin_district_id'])? null : $data['origin_district_id'];
                $ward_id = empty($data['origin_ward_id'])? null : $data['origin_ward_id'];
                if ($carrier_id != $data['carrier_id']
                 || $category_id != $data['category_id']
                 || $origin_country_id != $data['origin_country_id']
                 || $origin_city_id != $data['origin_city_id']
                 || $origin_district_id != $district_id
                 || $origin_ward_id != $ward_id) {
                    $this->pricingManager->generatePricingData($pricing, $user);
                }
                $this->error_code = 1;
                $this->apiResponse['data'] = $pricing->getId();
                $this->apiResponse['message'] = "Success: You have edited a pricing!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->error_code = -1;
            $this->apiResponse = $form->getMessages();
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
                        $pricing = $this->entityManager->getRepository(Pricing::class)->find($id);
                        if ($pricing == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";
                        } else {
                            $this->pricingManager->deletePricing($pricing, $user);
                        }
                    }

                    $this->apiResponse['message'] = "DELETE_SUCCESS_INTERNATIONAL_PRICING";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "INTERNATIONA_PRICING_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "INTERNATIONA_PRICING_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }
}