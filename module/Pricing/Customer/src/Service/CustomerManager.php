<?php
namespace Customer\Service;

use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Zend\Crypt\Password\Bcrypt;
use Zend\Math\Rand;
use Zend\View\Renderer\PhpRenderer;
use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;
use Zend\Mail\Message;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Zend\Authentication\Result;
use Core\Utils\Utils;
use Address\Entity\Country;
use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package Customer\Service
 */
class CustomerManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $branchManager
   
     */
    public function __construct(
        $entityManager
    )
    {
        $this->entityManager = $entityManager;
    }   

    public function addRangeWeight($data)
    {
        $this->entityManager->beginTransaction();
        try {
        $rangeweight = new RangeWeight;
        $rangeweight->setCode($data['code']);
        $rangeweight->setCarrierId($data['carrier_id']);
        $rangeweight->setCategory($data['category']);
        $rangeweight->setServiceId($data['service_id']);
        $rangeweight->setShipmentTypeId($data['shipmenttype_id']);
        $rangeweight->setCalculateUnit($data['calculate_unit']);
        $rangeweight->setUnit($data['unit']);
        $rangeweight->setRoundUp($data['round_up']);
        $rangeweight->setIsPrivate($data['is_private']);
        $rangeweight->setCustomerId($data['customer_id']);
        $rangeweight->setFrom($data['from']);
        $rangeweight->setTo($data['to']);
        $rangeweight->setStatus($data['status']);
        $rangeweight->setDescription($data['description']);
        $rangeweight->setDescriptionEn($data['description_en']);
        
        $rangeweight->setCreatedBy($data['created_by']);
        $rangeweight->setCreatedAt(date('Y-m-d H:i:s'));
        $this->getReferenced($rangeweight, $data);
        
        $this->entityManager->persist($rangeweight);
        $this->entityManager->flush();        
        
        // $last_id = $rangeweight->getBranchId();
        $this->entityManager->commit();
        return $rangeweight;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateRangeWeight($rangeweight, $data) {

        $this->entityManager->beginTransaction();
        try {
            $rangeweight->setCode($data['code']);
            $rangeweight->setCarrierId($data['carrier_id']);
            $rangeweight->setCategory($data['category']);
            $rangeweight->setServiceId($data['service_id']);
            $rangeweight->setShipmentTypeId($data['shipmenttype_id']);
            $rangeweight->setCalculateUnit($data['calculate_unit']);
            $rangeweight->setUnit($data['unit']);
            $rangeweight->setRoundUp($data['round_up']);
            $rangeweight->setIsPrivate($data['is_private']);
            $rangeweight->setCustomerId($data['customer_id']);
            $rangeweight->setFrom($data['from']);
            $rangeweight->setTo($data['to']);
            $rangeweight->setStatus($data['status']);
            $rangeweight->setDescription($data['description']);
            $rangeweight->setDescriptionEn($data['description_en']);

            $rangeweight->setUpdatedBy($data['updated_by']);
            $rangeweight->setUpdatedAt(date('Y-m-d H:i:s'));
            $this->getReferenced($rangeweight, $data);
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
           return $rangeweight;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($branch,$data) {

        $country = $this->entityManager->getRepository(Country::class)->find($data['country_id']);
        if ($country == null)
            throw new \Exception('Not found Country by ID');

        $branch->setCountry($country);

        $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
        if ($city == null)
            throw new \Exception('Not found City by ID');

        $branch->setCity($city);
        
        $district = $this->entityManager->getRepository(District::class)->find($data['district_id']);
        if ($district == null)
            throw new \Exception('Not found District by ID');

        $branch->setDistrict($district);

        $ward = $this->entityManager->getRepository(Ward::class)->find($data['ward_id']);
        if ($ward == null)
            throw new \Exception('Not found Ward by ID');

        $branch->setWard($ward);

        $hub = $this->entityManager->getRepository(Hub::class)->find($data['hub_id']);
        if ($hub == null)
            throw new \Exception('Not found Hub by ID');

        $branch->setHub($hub);
    }

    /**
     * Get list branch by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListCustomerByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){
        $customers     = [];
        $totalCustomer = 0;
        //get orm Customer
        $ormCustomer = $this->entityManager->getRepository(Customer::class)
            ->getListCustomerByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormCustomer){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormCustomer, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCustomer = $ormPaginator->count();
            //get user list
            $customers = $ormPaginator->getIterator()->getArrayCopy();
            // $countRow = 1;
             foreach ($customers as &$customer) {
            //set status
            //   $customer['status'] = Branch::getIsActiveList($customer['status']);
            //set created_at
                $customer['created_at'] =  ($customer['created_at']) ?Utils::checkDateFormat($customer['created_at'],'d/m/Y') : '';
            // $countRow++;
            }
        }
        //set data user
        $dataCustomer = [
            'listCustomer' => $customers,
            'totalCustomer' => $totalCustomer,
        ];
        return $dataCustomer;
    }
    
    public function deleteRangeWeight($rangeweight) {
        $this->entityManager->beginTransaction();
        try {      
            $this->entityManager->remove($rangeweight);
            $this->entityManager->flush();
            $this->entityManager->commit();
            return $rangeweight;          
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}