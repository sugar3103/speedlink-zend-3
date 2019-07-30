<?php
namespace PricingSpecial\Service;

use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialRangeWeight;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Category;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use PricingSpecial\Entity\SpecialArea;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingSpecial\Service
 */
class SpecialRangeWeightManager
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
    public function __construct(
        $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

/**
 * Get List Special RangeWeight By Condition
 */

    public function getListSpecialRangeWeightByCondition($start, $limit, $sortField, $sortDirection, $filters)
    {
        $areas = [];
        $totalRangeWeight = 0;
        //get orm Special RangeWeight
        $ormRangeWeight = $this->entityManager->getRepository(SpecialRangeWeight::class)
            ->getListSpecialRangeWeightByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormRangeWeight) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormRangeWeight, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalRangeWeight = $ormPaginator->count();
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
        $dataRangeWeight = [
            'listRangeWeight' => $areas,
            'totalRangeWeight' => $totalRangeWeight,
        ];

        return $dataRangeWeight;
    }

    private function getReferenced(&$specialRangeWeight, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $specialRangeWeight->setCreatedBy($user_data);
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

        $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
        if ($customer == null) {
            throw new \Exception('Not found Customer by ID');
        }

        $special_area = $this->entityManager->getRepository(SpecialArea::class)->find($data['special_area_id']); 
        
        if ($special_area == null) {
            throw new \Exception('Not found Special Area by ID');
        }

        $specialRangeWeight->setSpecialArea($special_area);
        $specialRangeWeight->setCustomer($customer);
        $specialRangeWeight->setCarrier($carrier);
        $specialRangeWeight->setCategory($category);
        $specialRangeWeight->setService($service);
        $specialRangeWeight->setShipmentType($shipment);
        $specialRangeWeight->setUpdatedBy($user_data);

    }

    /**
     * Add Special RangeWeight
     */
    public function addRangeWeight($data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $specialRangeWeight = new SpecialRangeWeight();
            $specialRangeWeight->setName($data['name']);
            $specialRangeWeight->setNameEn($data['name_en']);
            $specialRangeWeight->setCalculateUnit($data['calculate_unit']);
            $specialRangeWeight->setRoundUp($data['round_up']);
            $specialRangeWeight->setUnit($data['unit']);
            $specialRangeWeight->setFrom($data['from']);
            $specialRangeWeight->setTo($data['to']);
            $specialRangeWeight->setStatus($data['status']);
            $specialRangeWeight->setDescription($data['description']);
            $specialRangeWeight->setDescriptionEn($data['description_en']);
         
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialRangeWeight->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $specialRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            $this->getReferenced($specialRangeWeight, $user, 'add', $data);
            $this->entityManager->persist($specialRangeWeight);
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $specialRangeWeight;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Add Special RangeWeight
     */
    public function updateRangeWeight($specialRangeWeight, $data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $specialRangeWeight->setName($data['name']);
            $specialRangeWeight->setNameEn($data['name_en']);
            $specialRangeWeight->setCalculateUnit($data['calculate_unit']);
            $specialRangeWeight->setRoundUp($data['round_up']);
            $specialRangeWeight->setUnit($data['unit']);
            $specialRangeWeight->setFrom($data['from']);
            $specialRangeWeight->setTo($data['to']);
            $specialRangeWeight->setStatus($data['status']);
            $specialRangeWeight->setDescription($data['description']);
            $specialRangeWeight->setDescriptionEn($data['description_en']);
        
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            $this->getReferenced($specialRangeWeight, $user, 'update', $data);
            $this->entityManager->persist($specialRangeWeight);
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $specialRangeWeight;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Delete Special Range Weight
     */
    public function deleteRangeWeight($specialRangeWeight, $user)
    {
        
        $this->entityManager->beginTransaction();
        try {
            
            $specialRangeWeight->setIsDeleted(1);
            $specialRangeWeight->setUpdatedBy($this->entityManager->getRepository(\OAuth\Entity\User::class)->find($user->id));
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }
}
