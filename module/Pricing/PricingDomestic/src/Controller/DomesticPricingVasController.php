<?php
namespace PricingDomestic\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingDomestic\Service\DomesticPricingVasManager;
use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Form\PricingVasForm;

class DomesticPricingVasController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var DomesticPricingVasManager
         */
        protected $domesticPricingVasManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $domesticPricingVasManager
         */

    public function __construct($entityManager, $domesticPricingVasManager) {
        parent::__construct($entityManager);

        $this->entityManager = $entityManager;
        $this->domesticPricingVasManager = $domesticPricingVasManager;
    }

    public function indexAction()
    {
        if($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            if(isset($data['id'])) {
                $pricing = $this->entityManager->getRepository(DomesticPricing::class)->find($data['id']);
                //get list User by condition
                $dataPricingVas = $this->domesticPricingVasManager->getListDomesticPricingVas($pricing); 
                $this->apiResponse =  array(
                    'data'      => $dataPricingVas['listPricingVas'],
                    'total'     => $dataPricingVas['totalPricingVas']
                );   
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "DOMESTIC_PRICING_VAS_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }
    
    public function addAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;            
            //Create New Form Domestic Pricing
            $form = new PricingVasForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Domestic Pricing.
                $this->domesticPricingVasManager->deletedPricingVas($this->entityManager->getRepository(DomesticPricing::class)->find($data['id']));

                $this->domesticPricingVasManager->addPricingVas($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_DOMESTIC_VAS_PRICING";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages(); 
            }      
        }
        return $this->createResponse();
    }
}