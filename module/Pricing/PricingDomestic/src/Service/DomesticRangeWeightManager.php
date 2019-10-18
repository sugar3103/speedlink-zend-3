<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticRangeWeight;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Zend\Authentication\Result;
use Core\Utils\Utils;
use OAuth\Entity\User;
use ServiceShipment\Entity\Category;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use PricingDomestic\Entity\DomesticZone;
use Customer\Entity\Customer;
/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticRangeWeightManager {

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

   
/**
     * Get List Domestic RangeWeight By Condition
     */

    public function getListDomesticRangeWeightByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $areas = [];
        $totalRangeWeight = 0;
        //get orm Domestic RangeWeight
        $ormRangeWeight = $this->entityManager->getRepository(DomesticRangeWeight::class)
            ->getListDomesticRangeWeightByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormRangeWeight){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormRangeWeight, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalRangeWeight = $ormPaginator->count();
            //get domestic area list
            
            $areas = $ormPaginator->getIterator()->getArrayCopy();
            
             foreach ($areas as &$area) {
                $area['created_at'] =  ($area['created_at']) ? Utils::checkDateFormat($area['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['updated_at'] =  ($area['updated_at']) ? Utils::checkDateFormat($area['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['full_name_created'] = trim($area['full_name_created']);
                $area['full_name_updated'] = trim($area['full_name_updated']);
            }
        }
        //set data user
        $dataRangeWeight = [
            'listRangeWeight' => $areas,
            'totalRangeWeight' => $totalRangeWeight,
        ];
        
        return $dataRangeWeight;
    }

    
    private function getReferenced(&$domesticRangeWeight, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticRangeWeight->setJoinCreated($user_data);
        }
        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null) {
            throw new \Exception('Not found Carrier by ID');
        }
        
        $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
        if ($category == null) {
            throw new \Exception('Not found Category by ID');
        }

        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found Service by ID');
        }

        $shipment = $this->entityManager->getRepository(ShipmentType::class)->find($data['shipment_type_id']);
        if ($shipment == null) {
            throw new \Exception('Not found Shipment by ID');
        }

        $zone = $this->entityManager->getRepository(DomesticZone::class)->find($data['zone_id']);
        if ($zone == null) {
            throw new \Exception('Not found Zone by ID');
        }

        if($data['is_private'] && $data['customer_id']) {
            $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
            if($customer == null) {
                throw new \Exception('Not found Customer by ID');
            }

            $domesticRangeWeight->setCustomer($customer);
            
        } else {
            $domesticRangeWeight->setCustomer(null);
        }

        $domesticRangeWeight->setCarrier($carrier);
        $domesticRangeWeight->setCategory($category);
        $domesticRangeWeight->setService($service);
        $domesticRangeWeight->setShipmentType($shipment);
        $domesticRangeWeight->setZone($zone);
        $domesticRangeWeight->setJoinUpdated($user_data);

    }

    /**
     * Add Domestic RangeWeight
     */
    public function addRangeWeight($data,$user)
    {
        
        $this->entityManager->beginTransaction();
        try {
            $domesticRangeWeight = new DomesticRangeWeight();
            $domesticRangeWeight->setName($data['name']);
            $domesticRangeWeight->setNameEn($data['name_en']);
            $domesticRangeWeight->setCalculateUnit($data['calculate_unit']);
            $domesticRangeWeight->setRoundUp($data['round_up']);
            $domesticRangeWeight->setUnit($data['unit']);
            $domesticRangeWeight->setIsRas($data['is_ras']);
            $domesticRangeWeight->setFrom($data['from']);
            $domesticRangeWeight->setTo($data['to']);
            $domesticRangeWeight->setStatus($data['status']);
            $domesticRangeWeight->setDescription($data['description']);
            $domesticRangeWeight->setDescriptionEn($data['description_en']);
            $domesticRangeWeight->setCreatedBy($user->id);
            $domesticRangeWeight->setIsPrivate($data['is_private']);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticRangeWeight->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            
            $this->getReferenced($domesticRangeWeight, $user,'add', $data);
            $this->entityManager->persist($domesticRangeWeight);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            return $domesticRangeWeight;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Add Domestic RangeWeight
     */
    public function updateRangeWeight($domesticRangeWeight, $data,$user)
    {
        
        $this->entityManager->beginTransaction();
        try {
            $domesticRangeWeight->setName($data['name']);
            $domesticRangeWeight->setNameEn($data['name_en']);
            $domesticRangeWeight->setCalculateUnit($data['calculate_unit']);
            $domesticRangeWeight->setRoundUp($data['round_up']);
            $domesticRangeWeight->setUnit($data['unit']);
            $domesticRangeWeight->setIsRas($data['is_ras']);
            $domesticRangeWeight->setFrom($data['from']);
            $domesticRangeWeight->setTo($data['to']);
            $domesticRangeWeight->setStatus($data['status']);
            $domesticRangeWeight->setDescription($data['description']);
            $domesticRangeWeight->setDescriptionEn($data['description_en']);
            $domesticRangeWeight->setUpdatedBy($user->id);
            $domesticRangeWeight->setIsPrivate($data['is_private']);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            $this->getReferenced($domesticRangeWeight, $user,'update', $data);
            $this->entityManager->persist($domesticRangeWeight);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            return $domesticRangeWeight;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     /**
     * Delete Domestic Range Weight
     */
    public function deleteRangeWeight($domesticRangeWeight, $user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticRangeWeight->setIsDeleted(1);

            $domesticRangeWeight->setUpdatedBy($user->id);            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
           
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}