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
                'category_code', 'carrier_id', 'effected_date', 'expired_date', 
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
                $pricing = $this->pricingManager->updatePricing($pricing, $data, $user);
                $district_id = empty($data['origin_district_id'])? null : $data['origin_district_id'];
                $ward_id = empty($data['origin_ward_id'])? null : $data['origin_ward_id'];
                if ($pricing->getCarrierId() != $data['carrier_id']
                 || $pricing->getCategoryCode()!= $data['category_code']
                 || $pricing->getOriginCountryId() != $data['origin_country_id']
                 || $pricing->getOriginCityId() != $data['origin_city_id']
                 || $pricing->getOriginDistrictId() != $district_id
                 || $pricing->getOriginWardId() != $ward_id) {
                    $this->pricingDataManager->addPricingData($pricing, $user);
                }
                $this->error_code = 1;
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
        $user = $this->tokenPayload;
        $data = $this->getRequestData();
        if (empty($data)) {
            $this->error_code = -1;
            $this->apiResponse['message'] = 'Missing data';
            return $this->createResponse();
        }
        //Create New Form Pricing
        $pricing = $this->entityManager->getRepository(Pricing::class)->find($data['id']);

        //validate form
        if(!empty($pricing)) {
            try {
                $this->pricingManager->deletePricing($pricing, $user);
                $this->error_code = 1;
                $this->apiResponse['message'] = "Success: You have deleted pricing!";
            } catch (\Exception $e) {
                $this->error_code = -1;
                $this->apiResponse['message'] = "Fail: Please contact System Admin";
            }
        } else {
            $this->httpStatusCode = 200;
            $this->error_code = -1;
            $this->apiResponse['message'] = "Not Found Pricing";
        }

        return $this->createResponse();
    }
}