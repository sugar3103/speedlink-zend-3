<?php
namespace PricingSpecial\Service;

use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialArea;
use PricingSpecial\Entity\SpecialRangeWeight;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Category;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;

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

    /**
     * Add Range Weight Import
     */
    public function addRangeWeightImport($data, $user)
    {
        $errors = [];
        for ($i = 0; $i < count($data); $i++) {
            if (isset($data[$i])) {
                $customer = $this->entityManager->getRepository(Customer::class)->findOneBy([
                    'customer_no' => $data[$i]['account_no'], 
                    'status' => 1,
                    'is_deleted' => 0
                ]);
                $special_area = $this->entityManager->getRepository(SpecialArea::class)->findOneBy([
                    'name' => $data[$i]['area_name'],
                    'customer' => $customer,
                    'is_deleted' => 0
                ]);
                $carrier = $this->entityManager->getRepository(Carrier::class)->findOneBy([
                    'code' => $data[$i]['carrier'],
                    'status' => 1,
                    'is_deleted' => 0]);
                $service = $this->entityManager->getRepository(Service::class)->findOneBy([
                    'name' => $data[$i]['service'],
                    'status' => 1,
                    'is_deleted' => 0
                ]);
                $shipment_type = $this->entityManager->getRepository(ShipmentType::class)->findOneBy([
                    'name' => $data[$i]['shipment_type'], 
                    'status' => 1,
                    'is_deleted' => 0
                ]);

                if($customer 
                        && $special_area 
                        && $carrier 
                        && $service 
                        && $shipment_type 
                        && ($data[$i]['name'] != "")
                        && (is_numeric($data[$i]['from']))
                        && (is_numeric($data[$i]['to']))
                ) {
                    $specialRangeWeight = $this->entityManager->getRepository(SpecialRangeWeight::class)->findOneBy(
                        [
                            'customer' => $customer,
                            'name' => $data[$i]['name'],
                            'name_en' => $data[$i]['name'],
                            'carrier' => $carrier,
                            'special_area' => $special_area,
                            'shipment_type' => $shipment_type,
                            'service'=> $service,
                            'is_deleted' => 0,
                        ]
                    );
    
                    if (!$specialRangeWeight) {
                        $this->entityManager->beginTransaction();
                        try {
                            $specialRangeWeight = new SpecialRangeWeight();
                            $specialRangeWeight->setName($data[$i]['name']);
                            $specialRangeWeight->setNameEn($data[$i]['name']);
                            $specialRangeWeight->setCustomer($customer);
                            $specialRangeWeight->setSpecialArea($special_area);
                            $specialRangeWeight->setCalculateUnit(($data[$i]['calculate_unit'] == 'Yes') ? 1 : 0);
                            $specialRangeWeight->setRoundUp($data[$i]['round_up']);
                            $specialRangeWeight->setUnit($data[$i]['unit']);
                            $specialRangeWeight->setFrom($data[$i]['from']);
                            $specialRangeWeight->setTo($data[$i]['to']);
                            $specialRangeWeight->setStatus(($data[$i]['status'] == 'Active') ? 1 : 0);
    
                            $specialRangeWeight->setCarrier($carrier);
                            $specialRangeWeight->setService($service);
                            $specialRangeWeight->setShipmentType($shipment_type);
                            $specialRangeWeight->setCategory($this->entityManager->getRepository(Category::class)->find(3));
    
                            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                            $specialRangeWeight->setCreatedAt($addTime->format('Y-m-d H:i:s'));
                            $specialRangeWeight->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                            $specialRangeWeight->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                            $specialRangeWeight->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
    
                            $this->entityManager->persist($specialRangeWeight);
                            $this->entityManager->flush();
                            $this->entityManager->commit();
                        } catch (ORMException $e) {
                            $this->entityManager->rollback();
                            return false;
                        }
                    } else {
                        $errors[] = $data[$i];
                    }
                } else {
                    $errors[] = $data[$i];
                }
                

            }
        }

        return $errors;

    }
}
