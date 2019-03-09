<?php
namespace Customer\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Customer\Entity\Customer;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Customer\Form\CustomerForm;

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
    protected $customertManager;

    /**
     * CustomerController constructor.
     * @param $entityManager
     * @param $customertManager
     */

    public function __construct($entityManager, $customertManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->customertManager = $customertManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
              0 => 'id',
              1 => 'name',
              3 => 'created_at'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters, $fields) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataCustome = $this->customertManager->getListCustomerByCondition($start, $limit, $sortField, $sortDirection,$filters); 
            
            $result = $this->filterByField($dataCustome['listCustomer'], $fields);     
            
            $this->apiResponse =  array(
                'data'      => $result,
                'total'     => $dataCustome['totalCustomer']
            );                        
        } 

        return $this->createResponse();
    }

}