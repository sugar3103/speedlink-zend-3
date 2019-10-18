<?php
namespace PricingSpecial\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PricingSpecial\Service\pricingSpecialVasManager;
use PricingSpecial\Entity\SpecialPricing;
use PricingSpecial\Form\PricingVasForm;

class PricingSpecialVasController extends CoreController {

     /**
         * EntityManager.
         * @var EntityManager
        */
        protected $entityManager;
    
        /**
         * Customer Manager.
         * @var pricingSpecialVasManager
         */
        protected $pricingSpecialVasManager;
    
        /**
         * CustomerController constructor.
         * @param $entityManager
         * @param $pricingSpecialVasManager
         */

    public function __construct($entityManager, $pricingSpecialVasManager) {
        parent::__construct($entityManager);

        $this->entityManager = $entityManager;
        $this->pricingSpecialVasManager = $pricingSpecialVasManager;
    }

    public function indexAction()
    {
        if($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            if(isset($data['id'])) {
                $pricing = $this->entityManager->getRepository(SpecialPricing::class)->find($data['id']);
                //get list User by condition
                $dataPricingVas = $this->pricingSpecialVasManager->getListSpecialPricingVas($pricing); 
                $this->apiResponse =  array(
                    'data'      => $dataPricingVas['listPricingVas'],
                    'total'     => $dataPricingVas['totalPricingVas']
                );   
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_PRICING_VAS_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }
    
    public function addAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;            
            //Create New Form Special Pricing
            $form = new PricingVasForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Special Pricing.
                $this->pricingSpecialVasManager->deletedPricingVas($this->entityManager->getRepository(SpecialPricing::class)->find($data['id']));
                
                $this->pricingSpecialVasManager->addPricingVas($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_VAS_PRICING";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages(); 
            }      
        }
        return $this->createResponse();
    }
}