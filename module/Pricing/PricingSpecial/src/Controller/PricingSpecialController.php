<?php
namespace PricingSpecial\Controller;

use Core\Controller\CoreController;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Management\Entity\FieldVas;
use PricingSpecial\Entity\SpecialAreaCity;
use PricingSpecial\Entity\SpecialPricingData;
use PricingSpecial\Entity\SpecialPricingVas;
use PricingSpecial\Entity\SpecialPricingVasSpec;
use PricingSpecial\Entity\SpecialRangeWeight;
use PricingSpecial\Service\SpecialPricingManager;
use PricingSpecial\Form\PricingForm;
use PricingSpecial\Entity\SpecialPricing;
use ServiceShipment\Entity\ShipmentType;

class PricingSpecialController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;

        /**
         * Customer Manager.
         * @var pricingSpecialManager
         */
        protected $pricingSpecialManager;

        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $SpecialPricingManager
         */

    public function __construct($entityManager, $pricingSpecialManager) {
        parent::__construct($entityManager);

        $this->entityManager = $entityManager;
        $this->pricingSpecialManager = $pricingSpecialManager;
    }

    public function indexAction()
    {

        if ($this->getRequest()->isPost()) {

            $fieldsMap = [
                'id','name','carrier_id',
                'category_id', 'service_id','effected_date',
                'expired_date','saleman_id',
                'customer_id','status','approval_status','approved_by'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);

            //get list User by condition
            $dataPricings = $this->pricingSpecialManager->getListSpecialPricingByCondition($start, $limit, $sortField, $sortDirection,$filters);
            $result = $this->filterByField($dataPricings['listPricing'], $fields);

            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataPricings['totalPricing']
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;

            //Create New Form Special Pricing
            $form = new PricingForm('create', $this->entityManager);

            $form->setData($this->getRequestData());
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Special Pricing.
                $pricing = $this->pricingSpecialManager->addPricing($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_PRICING";
                $this->apiResponse['data'] = ['pricing_id' => $pricing->getId()];
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
                // Find existing Special Pricing in the database.
                $pricing = $this->entityManager->getRepository(SpecialPricing::class)->find($data['id']);
                if ($pricing) {
                    //Create Form Pricing
                    $form = new PricingForm('update', $this->entityManager, $pricing);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Special Pricing.
                        $this->pricingSpecialManager->updatePricing($pricing, $data,$user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_SPECIAL_PRICING";
                        $this->apiResponse['data'] = ['pricing_id' => $pricing->getId()];
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
                $this->apiResponse['message'] = "SPECIAL_PRICING_REQUEST_ID";
            }
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
                        $pricing = $this->entityManager->getRepository(SpecialPricing::class)->find($id);
                        if ($pricing == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";
                        } else {
                            $this->SpecialPricingManager->deletePricing($pricing, $user);
                        }
                    }

                    $this->apiResponse['message'] = "DELETE_SUCCESS_SPECIAL_PRICING";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_PRICING_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_PRICING_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }
}