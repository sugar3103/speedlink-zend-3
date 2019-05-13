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

    
    private function getReferenced(&$domesticRangeWeight, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticRangeWeight->setJoinCreated($user_data);
        }

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
            $domesticRangeWeight->setCarrierId($data['carrier_id']);
            $domesticRangeWeight->setCategoryId($data['category_id']);
            $domesticRangeWeight->setServiceId($data['service_id']);
            $domesticRangeWeight->setShipmentTypeId($data['shipment_type_id']);
            $domesticRangeWeight->setCalculateUnit($data['calculate_unit']);
            $domesticRangeWeight->setRoundUp($data['round_up']);
            $domesticRangeWeight->setUnit($data['unit']);
            $domesticRangeWeight->setIsRas($data['is_ras']);
            $domesticRangeWeight->setZoneId($data['zone_id']);
            $domesticRangeWeight->setFrom($data['from']);
            $domesticRangeWeight->setTo($data['to']);
            $domesticRangeWeight->setStatus($data['status']);
            $domesticRangeWeight->setDescription($data['description']);
            $domesticRangeWeight->setDescriptionEn($data['description_en']);
            $domesticRangeWeight->setCreatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticRangeWeight->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            
            $this->getReferenced($domesticRangeWeight, $user,'add');
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
            $domesticRangeWeight->setCarrierId($data['carrier_id']);
            $domesticRangeWeight->setCategoryId($data['category_id']);
            $domesticRangeWeight->setServiceId($data['service_id']);
            $domesticRangeWeight->setShipmentTypeId($data['shipment_type_id']);
            $domesticRangeWeight->setCalculateUnit($data['calculate_unit']);
            $domesticRangeWeight->setRoundUp($data['round_up']);
            $domesticRangeWeight->setUnit($data['unit']);
            $domesticRangeWeight->setIsRas($data['is_ras']);
            $domesticRangeWeight->setZoneId($data['zone_id']);
            $domesticRangeWeight->setFrom($data['from']);
            $domesticRangeWeight->setTo($data['to']);
            $domesticRangeWeight->setStatus($data['status']);
            $domesticRangeWeight->setDescription($data['description']);
            $domesticRangeWeight->setDescriptionEn($data['description_en']);
            $domesticRangeWeight->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            $this->getReferenced($domesticRangeWeight, $user,'update');
            $this->entityManager->persist($domesticRangeWeight);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            return $domesticRangeWeight;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}