<?php
namespace Customer\Service;

use Customer\Entity\Customer;
use OAuth\Entity\User;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;
/**
 * @package Customer\Service
 */
class CustomerManager {

     /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * CustomerManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager) {
        $this->entityManager = $entityManager;
    }

    private function getReferenced(&$customer, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $customer->setCreatedBy($user_data);
        }
        $customer->setUpdatedBy($user_data);

    }

    /**
     * Add Customer
     *
     * @param $data
     * @param $user
     * @return Customer|bool
     * @throws \Exception
     */
    public function addCustomer($data,$user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $customer = new Customer();
            $customer->setName($data['name']);
            $customer->setCustomerNo($data['customer_no']);
            $customer->setTaxNo($data['tax_no']);
            $customer->setRefId($data['ref_id']);
            $customer->setStatus($data['status']);
            

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $customer->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($customer, $data, $user, 'add');
           
            // add the entity to the entity manager.
            $this->entityManager->persist($customer);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $customer;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Update Customer
     *
     * @param $customer
     * @param $data
     * @param $user
     * @return Customer|bool
     * @throws \Exception
     */
    public function updateCustomer($customer, $data,$user) {
        // begin transaction
        
        $this->entityManager->beginTransaction();
        try {
            $customer->setName($data['name']);
            $customer->setCustomerNo($data['customer_no']);
            $customer->setTaxNo($data['tax_no']);
            $customer->setRefId($data['ref_id']);
            $customer->setStatus($data['status']);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $customer->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($customer, $data, $user);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $customer;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Remove Customer
     *
     * @param $customer
     * @return Customer|bool
     * @throws \Exception
     */
    public function removeCustomer($customer, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $customer->setIsDeleted(1);
            $customer->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $customer->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
;
        
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $customer;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Get list customer by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sort
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListCustomerByCondition($start,$limit,$sortField = '',$sortDirection = 'asc',$filters = []){
        $customers     = [];
        $totalCustomer = 0;        
        //get orm customer
        $ormCustomer = $this->entityManager->getRepository(Customer::class)
            ->getListCustomerByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormCustomer){
            $ormPaginator = new ORMPaginator($ormCustomer, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCustomer = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $customers = $ormPaginator->getIterator()->getArrayCopy();
            
            foreach ($customers as &$customer) {
                //set created_at
                $customer['created_at'] =  ($customer['created_at']) ? Utils::checkDateFormat($customer['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $customer['updated_at'] =  ($customer['updated_at']) ? Utils::checkDateFormat($customer['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                
                $customer['full_name_created'] = trim($customer['full_name_created']);
                $customer['full_name_updated'] = trim($customer['full_name_updated']);
            }           
        }

        //set data customer
        $dataCustomer = [
            'listCustomer' => $customers,
            'totalCustomer' => $totalCustomer,
        ];
        return $dataCustomer;
    }
}
