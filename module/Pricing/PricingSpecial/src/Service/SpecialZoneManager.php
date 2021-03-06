<?php
namespace PricingSpecial\Service;

use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialArea;
use PricingSpecial\Entity\SpecialZone;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingSpecial\Service
 */
class SpecialZoneManager
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
     * Get List Special Zone By Condition
     */

    public function getListSpecialZoneByCondition($start, $limit, $sortField, $sortDirection, $filters)
    {
        $areas = [];
        $totalZone = 0;
        //get orm Special Zone
        $ormZone = $this->entityManager->getRepository(SpecialZone::class)
            ->getListSpecialZoneByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormZone) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormZone, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalZone = $ormPaginator->count();
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
        $dataZone = [
            'listZone' => $areas,
            'totalZone' => $totalZone,
        ];

        return $dataZone;
    }

    /**
     * Add Special Zone
     */
    public function addZone($data, $user)
    {
        $this->entityManager->beginTransaction();
        try {
            $specialZone = new SpecialZone();
            $specialZone->setName($data['name']);
            $specialZone->setNameEn($data['name_en']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialZone->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $specialZone->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            $this->getReferenced($specialZone, $user, 'add', $data);

            $this->entityManager->persist($specialZone);
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $specialZone;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Update Special Zone
     */
    public function updateZone($specialZone, $data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $specialZone->setName($data['name']);
            $specialZone->setNameEn($data['name_en']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialZone->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($specialZone, $user, 'add', $data);

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
            return $specialZone;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Delete Special Zone
     */
    public function deleteZone($specialZone, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $specialZone->setIsDeleted(1);
            $specialZone->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialZone->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    private function getReferenced(&$specialZone, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $specialZone->setCreatedBy($user_data);
        }

        $specialZone->setUpdatedBy($user_data);

        $fromCity = $this->entityManager->getRepository(City::class)->find($data['from_city']);
        if ($fromCity == null) {
            throw new \Exception('Not found From City by ID');
        }

        $toCity = $this->entityManager->getRepository(City::class)->find($data['to_city']);
        if ($toCity == null) {
            throw new \Exception('Not found To City by ID');
        }

        $toDistrict = $this->entityManager->getRepository(District::class)->find($data['to_district']);
        if ($toDistrict == null) {
            throw new \Exception('Not found To District by ID');
        }

        $toWard = $this->entityManager->getRepository(Ward::class)->find($data['to_ward']);
        if ($toWard == null) {
            throw new \Exception('Not found To Ward by ID');
        }

        $specialArea = $this->entityManager->getRepository(SpecialArea::class)->find($data['special_area_id']);
        if ($specialArea == null) {
            throw new \Exception('Not found Special Area by ID');
        }

        $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
        if ($customer == null) {
            throw new \Exception('Not found Customer by ID');
        }

        $specialZone->setCustomer($customer);
        $specialZone->setSpecialArea($specialArea);
        $specialZone->setFromCity($fromCity);
        $specialZone->setToCity($toCity);
        $specialZone->setToDistrict($toDistrict);
        $specialZone->setToWard($toWard);

    }

    /**
     * Add Zone Import
     */
    public function addZoneImport($datas, $user)
    {
        $this->entityManager->beginTransaction();
        $this->entityManager->getConnection()->setAutoCommit(false);
        $batchSize = 3000;
        $i = 0;
        $errors = [];
        try {
            foreach ($datas as $data) {
                $fromCity = $this->entityManager->getRepository(City::class)->findOneBy(['name' => $data['from_city']]);
                $customer = $this->entityManager->getRepository(Customer::class)->findOneBy([
                    'customer_no' => $data['account_no'],
                    'status' => 1,
                    'is_deleted' => 0
                ]);
                $special_area = null;
                if($customer) {
                    $special_area = $this->entityManager->getRepository(SpecialArea::class)->findOneBy([
                        'name' => $data['area_name'],
                        'customer' => $customer,
                        'is_deleted' => 0
                    ]);    
                }
                
                
                $toAddress = $this->entityManager->getRepository(SpecialZone::class)->vertifyAddress(
                    $data['to_city'],
                    $data['to_district'],
                    $data['to_ward']
                );
                $ormPaginator = new ORMPaginator($toAddress, true);
                $ormPaginator->setUseOutputWalkers(false);
                //get special area list
                $toAddresses = $ormPaginator->getIterator()->getArrayCopy();
                if (isset($toAddresses[0]) && $fromCity && $customer && $special_area && $data['name'] && $data['name_en']) {
                    $idToCity = $toAddresses[0]['city_id'];
                    $idToDistrict = $toAddresses[0]['district_id'];
                    $idToWard = $toAddresses[0]['ward_id'];
                    
                    $specialZone = $this->entityManager->getRepository(SpecialZone::class)->checkExit([
                        'name' => $data['name'],
                        'name_en' => $data['name_en'],
                        'customer' => $customer->getId(),                        
                        'from_city' => $fromCity->getId(),
                        'to_city' => $idToCity,
                        'to_district' => $idToDistrict,
                        'to_ward' => $idToWard,
                        'is_deleted' => 0,
                    ]);
                    if (!$specialZone) {
                        $specialZone = new SpecialZone();
                        $specialZone->setName($data['name']);
                        $specialZone->setNameEn($data['name_en']);
                        $specialZone->setCustomer($customer);
                        $specialZone->setSpecialArea($special_area);

                        $specialZone->setFromCity($fromCity);
                        $specialZone->setToCity($this->entityManager->getRepository(City::class)->find($idToCity));
                        $specialZone->setToDistrict($this->entityManager->getRepository(District::class)->find($idToDistrict));
                        $specialZone->setToWard($this->entityManager->getRepository(Ward::class)->find($idToWard));

                        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                        $specialZone->setCreatedAt($addTime->format('Y-m-d H:i:s'));
                        $specialZone->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                        $specialZone->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                        $specialZone->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

                        $this->entityManager->persist($specialZone);

                        $i++;
                        if (($i % $batchSize) === 0) {
                            $this->entityManager->flush();
                            $this->entityManager->commit();
                            $this->entityManager->clear();
                        }
                    } else {
                        $errors[] = $data;
                    }
                } else {
                    $errors[] = $data;
                }
            }

            $this->entityManager->flush();
            $this->entityManager->commit();
            $this->entityManager->clear();
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }

        return $errors;
    }
}
