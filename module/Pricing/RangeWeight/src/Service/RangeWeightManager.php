<?php
namespace RangeWeight\Service;

use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use RangeWeight\Entity\RangeWeight;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use ServiceShipment\Entity\Category;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package RangeWeight\Service
 */
class RangeWeightManager
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

    public function addRangeWeight($data, $user)
    {
        $this->entityManager->beginTransaction();
        try {
            $rangeweight = new RangeWeight;

            $rangeweight->setName($data['name']);
            $rangeweight->setNameEn($data['name_en']);
            $rangeweight->setCarrierId($data['carrier_id']);
            $rangeweight->setCategoryId($data['category_id']);
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

            $rangeweight->setCreatedBy($user->id);
            $currentDate = date('Y-m-d H:i:s');
            $rangeweight->setCreatedAt($currentDate);
            $this->getReferenced($rangeweight, $data, $user, 'add');

            $this->entityManager->persist($rangeweight);

            $this->entityManager->flush();

            $this->entityManager->commit();
            return $rangeweight;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    public function updateRangeWeight($rangeweight, $data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $rangeweight->setName($data['name']);
            $rangeweight->setNameEn($data['name_en']);
            $rangeweight->setCarrierId($data['carrier_id']);
            $rangeweight->setCategoryId($data['category_id']);
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

            $rangeweight->setUpdatedBy($user->id);
            $currentDate = date('Y-m-d H:i:s');
            $rangeweight->setUpdatedAt($currentDate);
            $this->getReferenced($rangeweight, $data, $user);

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
            return $rangeweight;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    private function getReferenced($rangeweight, $data, $user, $mode = '')
    {

        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null) {
            throw new \Exception('Not found Carrier by ID');
        }

        $rangeweight->setCarrier($carrier);

        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found service by ID');
        }

        $rangeweight->setService($service);

        $shipmenttype = $this->entityManager->getRepository(ShipmentType::class)->find($data['shipment_type_id']);
        if ($shipmenttype == null) {
            throw new \Exception('Not found Shipmenttype by ID');
        }

        $rangeweight->setShipmenttype($shipmenttype);

        if ($data['customer_id']) {
            $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
            if ($customer == null) {
                throw new \Exception('Not found Customer by ID');
            }

            $rangeweight->setCustomer($customer);
        }

        if($data['category_id']) {
            $category = $this->entityManager->getRepository(Category::class)->findOneBy(['id' => $data['customer_id'], 'is_deleted' => 0]);
            if ($category == null) {
                throw new \Exception('Not found Category by ID');
            }

            $rangeweight->setJoinCategory($category);
        }

        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $rangeweight->setUserCreate($user_data);
        }
        $rangeweight->setUserUpdate($user_data);
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
    ) {
        $rangeweights = [];
        $totalRangeWeight = 0;
        //get orm rangeweight

        $ormRangeWeight = $this->entityManager->getRepository(RangeWeight::class)
            ->getListRangeWeightByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormRangeWeight) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormRangeWeight, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalRangeWeight = $ormPaginator->count();
            //get user list
            $rangeweights = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($rangeweights as &$rangeweight) {
                //set created_at
                $rangeweight['created_at'] = ($rangeweight['created_at']) ? Utils::checkDateFormat($rangeweight['created_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $rangeweight['updated_at'] = ($rangeweight['updated_at']) ? Utils::checkDateFormat($rangeweight['updated_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
            }
        }
        //set data user
        $dataRangeWeight = [
            'listRangeWeight' => $rangeweights,
            'totalRangeWeight' => $totalRangeWeight,
        ];
        return $dataRangeWeight;
    }

    public function removeRangeWeight($rangeweight)
    {
        $this->entityManager->beginTransaction();
        try {
            $rangeweight->setIsDeleted(1);
            
            $this->entityManager->flush();
            $this->entityManager->commit();
            return $rangeweight;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

}
