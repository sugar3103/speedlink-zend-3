<?php
namespace RangeWeight\Service;

use RangeWeight\Entity\RangeWeight;
use RangeWeight\Entity\ZoneCode;
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
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use Customer\Entity\Customer;
use OAuth\Entity\User;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package RangeWeight\Service
 */
class RangeWeightManager {

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
        $rangeweight->setShipmentTypeId($data['shipment_type_id']);
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
        //  var_dump($data); die;
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
            $rangeweight->setShipmentTypeId($data['shipment_type_id']);
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

    private function getReferenced($rangeweight,$data) {

        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null)
            throw new \Exception('Not found Carrier by ID');

        $rangeweight->setCarrier($carrier);

        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null)
            throw new \Exception('Not found service by ID');

        $rangeweight->setService($service);
        
        $shipmenttype = $this->entityManager->getRepository(ShipmentType::class)->find($data['shipment_type_id']);
        if ($shipmenttype == null)
            throw new \Exception('Not found Shipmenttype by ID');

        $rangeweight->setShipmenttype($shipmenttype);

        if($data['customer_id']) {
            $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
            if ($customer == null)
                throw new \Exception('Not found Customer by ID');
            $rangeweight->setCustomer($customer);
        }
        if($data['created_by']) {
            $user_create = $this->entityManager->getRepository(User::class)->find($data['created_by']);
            if ($user_create == null)
                throw new \Exception('Not found User by ID');
            $rangeweight->setUserCreate($user_create);
        }
      
        if($data['updated_by']){
            $user_update = $this->entityManager->getRepository(User::class)->find($data['updated_by']);
            if ($user_update == null)
                throw new \Exception('Not found User by ID');
            $rangeweight->setUserUpdate($user_update);
        }
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
    public function getListRangeWeightByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){
        $rangeweights     = [];
        $totalRangeWeight = 0;
        //get orm rangeweight
        
        $ormRangeWeight = $this->entityManager->getRepository(RangeWeight::class)
            ->getListRangeWeightByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormRangeWeight){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormRangeWeight, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalRangeWeight = $ormPaginator->count();
            //get user list
            $rangeweights = $ormPaginator->getIterator()->getArrayCopy();
            // $countRow = 1;
             foreach ($rangeweights as &$rangeweight) {
            //set status
            //   $rangeweight['status'] = Branch::getIsActiveList($rangeweight['status']);
            //set created_at
                $rangeweight['created_at'] =  ($rangeweight['created_at']) ?Utils::checkDateFormat($rangeweight['created_at'],'d/m/Y') : '';
                $rangeweight['updated_at'] =  ($rangeweight['updated_at']) ? Utils::checkDateFormat($rangeweight['updated_at'],'d/m/Y H:i:s') : '';
            // $countRow++;
            }
        }
        //set data user
        $dataRangeWeight = [
            'listRangeWeight' => $rangeweights,
            'totalRangeWeight' => $totalRangeWeight,
        ];
        return $dataRangeWeight;
    }
    
    public function removeRangeWeight($rangeweight) {
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