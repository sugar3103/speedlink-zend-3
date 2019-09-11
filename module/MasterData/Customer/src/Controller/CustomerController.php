<?php
namespace Customer\Controller;

use Core\Controller\CoreController;
use Customer\Form\CustomerForm;
use Doctrine\ORM\EntityManager;
use Customer\Entity\Customer;

class CustomerController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * Customer Manager.
     * @var CustomerManager
     */
    protected $customerManager;

    /**
     * CustomerController constructor.
     * @param $entityManager
     * @param $customerManager
     */

    public function __construct($entityManager, $customerManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->customerManager = $customerManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'name',
                1 => 'status',
                2 => 'customer_no',
                3 => 'tax_no',
                4 => 'ref_id',
            ];

            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);                        
            
            //get list User by condition
            $dataCustomer = $this->customerManager->getListCustomerByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = $this->filterByField($dataCustomer['listCustomer'], $fields);          
                        
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataCustomer['totalCustomer']
            );                         
        } 

        return $this->createResponse();
    }

    public function addAction()
    {   
        // check if customer  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            
            //Create New Form Customer
            $form = new CustomerForm('create', $this->entityManager);

            $form->setData($this->getRequestData());            
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add customer.
                $this->customerManager->addCustomer($data,$user);
                $this->apiResponse['message'] = "ADD_SUCCESS_CUSTOMER";
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
                // Find existing customer in the database.
                $customer = $this->entityManager->getRepository(Customer::class)->findOneBy(array('id' => $data['id']));    
                if ($customer) {
                    //Create Form Customer
                    $form = new CustomerForm('update', $this->entityManager, $customer);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update customer.
                        $this->customerManager->updateCustomer($customer, $data,$user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_CUSTOMER";
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
                $this->apiResponse['message'] = "CUSTOMER_REQUEST_ID";
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
                        $customer = $this->entityManager->getRepository(Customer::class)->findOneBy(array('id' => $id));    
                        if ($customer == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";                        
                        } else {
                            $this->customerManager->removeCustomer($customer);
                        }  
                    }
                    
                    $this->apiResponse['message'] = "DELETE_SUCCESS_CUSTOMER";
                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "CUSTOMER_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "CUSTOMER_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }
}