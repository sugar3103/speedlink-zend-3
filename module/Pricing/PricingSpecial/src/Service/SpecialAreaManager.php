<?php
namespace PricingSpecial\Service;

use Core\Utils\Utils;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialArea;
use Customer\Entity\Customer;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingSpecial\Service
 */
class SpecialAreaManager
{

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
     * Get List Special Area By Condition
     */

    public function getListSpecialAreaByCondition($start, $limit, $sortField, $sortDirection, $filters)
    {
        $areas = [];
        $totalArea = 0;
        //get orm Special Area
        $ormArea = $this->entityManager->getRepository(SpecialArea::class)
            ->getListSpecialAreaByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormArea) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormArea, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalArea = $ormPaginator->count();
            //get special area list

            $areas = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($areas as &$area) {
                $area['created_at'] = ($area['created_at']) ? Utils::checkDateFormat($area['created_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $area['updated_at'] = ($area['updated_at']) ? Utils::checkDateFormat($area['updated_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $area['full_name_created'] = trim($area['full_name_created']);
                $area['full_name_updated'] = trim($area['full_name_updated']);
            }
        }
        //set data user
        $dataArea = [
            'listArea' => $areas,
            'totalArea' => $totalArea,
        ];

        return $dataArea;
    }

    /**
     * Add Special Area
     */
    public function addArea($data, $user)
    {
        $this->entityManager->beginTransaction();
        try {
            $specialArea = new SpecialArea();
            $specialArea->setName($data['name']);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialArea->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $specialArea->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($specialArea, $user, 'add', $data);

            $this->entityManager->persist($specialArea);
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $specialArea;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Update Special Area
     */
    public function updateArea($specialArea, $data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $specialArea->setName($data['name']);
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialArea->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($specialArea, $user, 'update', $data);
            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();
            return $specialArea;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Delete Special Area
     */
    public function deleteArea($specialArea, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $specialArea->setIsDeleted(1);
            $specialArea->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialArea->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    private function getReferenced(&$specialArea, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $specialArea->setCreatedBy($user_data);
        }

        $specialArea->setUpdatedBy($user_data);
        
        $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
        if ($customer == null) {
            throw new \Exception('Not found Customer by ID');
        }

        $specialArea->setCustomer($customer);
    }
}
