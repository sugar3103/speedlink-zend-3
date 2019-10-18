<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticZone;
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
class DomesticZoneManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $branchManager
   
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }   

    /**
     * Get List Domestic Zone By Condition
     */

    public function getListDomesticZoneByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $areas = [];
        $totalZone = 0;
        //get orm Domestic Zone
        $ormZone = $this->entityManager->getRepository(DomesticZone::class)
            ->getListDomesticZoneByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormZone){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormZone, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalZone = $ormPaginator->count();
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
        $dataZone = [
            'listZone' => $areas,
            'totalZone' => $totalZone,
        ];
        
        return $dataZone;
    }

    /**
     * Add Domestic Zone
     */
    public function addZone($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
            $domesticZone = new DomesticZone();
            $domesticZone->setName($data['name']);
            $domesticZone->setNameEn($data['name_en']);
            $domesticZone->setCreatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticZone->setCreatedAt($addTime->format('Y-m-d H:i:s'));

            $this->getReferenced($domesticZone, $user, 'add');
            

            $this->entityManager->persist($domesticZone);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            return $domesticZone;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Domestic Zone
     */
    public function updateZone($domesticZone, $data,$user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticZone->setName($data['name']);
            $domesticZone->setNameEn($data['name_en']);
            $domesticZone->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticZone->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
           return $domesticZone;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     /**
     * Delete Domestic Zone
     */
    public function deleteZone($domesticZone, $user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticZone->setIsDeleted(1);
            $domesticZone->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticZone->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
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

    private function getReferenced(&$domesticZone, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticZone->setJoinCreated($user_data);
        }

        $domesticZone->setJoinUpdated($user_data);

    }
}