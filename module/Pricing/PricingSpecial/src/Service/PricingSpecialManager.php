<?php
namespace PricingSpecial\Service;

use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialPricing;
use PricingSpecial\Entity\SpecialPricingData;
use PricingSpecial\Entity\SpecialPricingVas;
use PricingSpecial\Entity\SpecialPricingVasSpec;
use PricingSpecial\Entity\SpecialRangeWeight;
use PricingSpecial\Servivce\PricingSpecialDataManager;
use PricingSpecial\Servivce\PricingSpecialVasManager;
use PricingSpecial\Servivce\SpecialRangeWeightManager;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Category;
use ServiceShipment\Entity\Service;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingSpecial\Service
 */
class PricingSpecialManager
{

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var PricingSpecialDataManager
     */
    private $pricingSpecialDataManager;

    /**
     * @var SpecialRangeWeightManager
     */
    private $specialRangeWeightManager;

    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $pricingSpecialDataManager
     * @param $specialRangeWeightManager
     */
    public function __construct($entityManager, $pricingSpecialDataManager, $pricingSpecialVasManager, $specialRangeWeightManager)
    {
        $this->entityManager = $entityManager;
        $this->pricingSpecialDataManager    = $pricingSpecialDataManager;
        $this->pricingSpecialVasManager     = $pricingSpecialVasManager;
        $this->specialRangeWeightManager    = $specialRangeWeightManager;
    }

    /**
     * Get List Special Pricing By Condition
     */

    public function getListSpecialPricingByCondition($start, $limit, $sortField, $sortDirection, $filters)
    {
        $pricings = [];
        $totalPricing = 0;
        //get orm Special Pricing
        $ormPricing = $this->entityManager->getRepository(SpecialPricing::class)
            ->getListSpecialPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormPricing) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormPricing, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalPricing = $ormPaginator->count();
            //get domestic pricing list

            $pricings = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($pricings as &$pricing) {
                // $pricing['effected_date'] = ($pricing['effected_date']) ? Utils::checkDateFormat($pricing['effected_date'], 'D M d Y H:i:s \G\M\T+0700') : '';
                // $pricing['expired_date'] = ($pricing['expired_date']) ? Utils::checkDateFormat($pricing['expired_date'], 'D M d Y H:i:s \G\M\T+0700') : '';

                $pricing['created_at'] = ($pricing['created_at']) ? Utils::checkDateFormat($pricing['created_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['updated_at'] = ($pricing['updated_at']) ? Utils::checkDateFormat($pricing['updated_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['full_name_created'] = trim($pricing['full_name_created']);
                $pricing['full_name_updated'] = trim($pricing['full_name_updated']);
            }
        }

        //set data user
        $dataPricing = [
            'listPricing' => $pricings,
            'totalPricing' => $totalPricing,
        ];

        return $dataPricing;
    }

    /**
     * Add Special Pricing
     */
    public function addPricing($data, $user)
    {

        $this->entityManager->beginTransaction();
        // try {
            $specialPricing = new SpecialPricing();
            $specialPricing->setEffectedDate(date('Y-m-d H:i:s', strtotime($data['effected_date'])));
            $specialPricing->setExpiredDate(date('Y-m-d H:i:s', strtotime($data['expired_date'])));
            $specialPricing->setStatus($data['status']);
            $specialPricing->setApprovalStatus($data['approval_status']);
            $specialPricing->setTotalRas($data['total_ras']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));

            $specialPricing->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $specialPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($specialPricing, $user, 'add', $data);

            $this->entityManager->persist($specialPricing);

            $this->entityManager->flush();

            $this->entityManager->commit();

            return $specialPricing;

        // } catch (ORMException $e) {
        //     $this->entityManager->rollback();
        //     return false;
        // }
    }

    /**
     * Update Special Pricing
     */
    public function updatePricing($specialPricing, $data, $user)
    {
        $this->entityManager->beginTransaction();
        try {
            $specialPricing->setEffectedDate(date('Y-m-d H:i:s', strtotime($data['effected_date'])));
            $specialPricing->setExpiredDate(date('Y-m-d H:i:s', strtotime($data['expired_date'])));
            $specialPricing->setStatus($data['status']);
            $specialPricing->setApprovalStatus($data['approval_status']);
            $specialPricing->setTotalRas($data['total_ras']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($specialPricing, $user, 'update', $data);

            // apply changes to database.
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $specialPricing;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Delete Special Pricing
     */
    public function deletePricing($specialPricing, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            //Delete RangeWeight
            $conditions = array(
                'special_pricing' => $specialPricing->getId(),
                'is_deleted' => 0,
            );

            $pricingDataDeletes = $this->entityManager->getRepository(SpecialPricingData::class)->findBy($conditions);
            if ($pricingDataDeletes) {
                foreach ($pricingDataDeletes as $pricingDataDelete) {

                    $this->specialRangeWeightManager->deleteRangeWeight(
                        $pricingDataDelete->getSpecialRangeWeight(),
                        $user
                    );
                }
            }

            //Delete Vas And Vas Spec
            $this->pricingSpecialVasManager->deletedPricingVas($specialPricing);
            //Delete PricingData
            $this->pricingSpecialDataManager->deletePricingData($specialPricing, $user);

            $specialPricing->setIsDeleted(1);
            $specialPricing->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $specialPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    private function getReferenced(&$specialPricing, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $specialPricing->setCreatedBy($user_data);
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
        $saleman = $this->entityManager->getRepository(User::class)->find($data['saleman_id']);
        if ($saleman == null) {
            throw new \Exception('Not found Saleman by ID');
        }
        $approved = $this->entityManager->getRepository(User::class)->find($data['approved_by']);
        if ($approved == null) {
            throw new \Exception('Not found Approved by ID');
        }
        $specialPricing->setCarrier($carrier);
        $specialPricing->setCategory($category);
        $specialPricing->setService($service);
        $specialPricing->setSaleman($saleman);
        $specialPricing->setApprovedBy($approved);
        $specialPricing->setUpdatedBy($user_data);
        $specialPricing->setCreatedBy($user_data);

        //Create Name Pricing
        $name = $carrier->getNameEn() . '.' . $service->getNameEn();
       
        if ($data['customer_id']) {
            $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
            if ($customer == null) {
                throw new \Exception('Not found Customer by ID');
            }

            $specialPricing->setCustomer($customer);
            $name .= '.' . $customer->getName();
        } else {
            $specialPricing->setCustomer(null);
        }

        if ($mode == 'add') {
            $name = str_replace(' ', '', $name);

            $ormPricing = $this->entityManager->getRepository(SpecialPricing::class)->getListSpecialPricingByCondition(1, 0, 'name', 'asc', [
                'name' => $name,
            ]);

            $indexPricing = 1;
            if ($ormPricing) {
                //set offset,limit
                $ormPaginator = new ORMPaginator($ormPricing, true);
                $ormPaginator->setUseOutputWalkers(false);

                $pricings = $ormPaginator->getIterator()->getArrayCopy();
                if ($pricings) {
                    $pricing = explode('.', $pricings[count($pricings) - 1]['name']);
                    $indexPricing = (int) $pricing[count($pricing) - 1] + 1;
                }
            }

            // $specialPricing->setName($name . '.' . $indexPricing);
            $specialPricing->setName($name);
        }
    }
}
