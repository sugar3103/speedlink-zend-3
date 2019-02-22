<?php
namespace Management\Service;

use Address\Entity\City;
use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;
use OAuth\Entity\User;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;

/**
 * @package Management\Service
 */
class PricingManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    private function getReferenced(&$pricing, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }
        if ($mode == 'add') {
            $pricing->setJoinCreated($user_data);
        }
        $pricing->setJoinUpdated($user_data);

        $approve_by = $this->entityManager->getRepository(User::class)->find($data['approved_by']);
        if ($approve_by == null) {
            throw new \Exception('Not found Approve person ID');
        }
        $pricing->setJoinApproval($approve_by);

        $customer_id = $this->entityManager->getRepository(Customer::class)->find($data['approved_by']);
        if ($approve_by == null) {
            throw new \Exception('Not found Customer ID');
        }
        $pricing->setJoinCustomer($customer_id);

        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null) {
            throw new \Exception('Not found Carrier Code');
        }
        $pricing->setJoinCarrier($carrier);

        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found Service Code');
        }
        $pricing->setJoinService($service);

        $shipment_type = $this->entityManager->getRepository(ShipmentType::class)->find($data['shipment_type_id']);
        if ($shipment_type == null) {
            throw new \Exception('Not found Shipment Type');
        }
        $pricing->setJoinService($shipment_type);

        $origin_country = $this->entityManager->getRepository(City::class)->find($data['origin_country_id']);
        if ($shipment_type == null) {
            throw new \Exception('Not found Origin Country');
        }
        $pricing->setJoinOriginCountry($origin_country);

        $origin_city = $this->entityManager->getRepository(City::class)->find($data['origin_city_id']);
        if ($shipment_type == null) {
            throw new \Exception('Not found Origin City');
        }
        $pricing->setJoinOriginCity($origin_city);

        $origin_district = $this->entityManager->getRepository(City::class)->find($data['origin_district_id']);
        if ($shipment_type == null) {
            throw new \Exception('Not found Origin District');
        }
        $pricing->setJoinOriginDistrict($origin_district);

        $origin_ward = $this->entityManager->getRepository(City::class)->find($data['origin_ward_id']);
        if ($shipment_type == null) {
            throw new \Exception('Not found Origin Ward');
        }
        $pricing->setJoinOriginWard($origin_ward);
    }

    public function getListPricingByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $pricingList = [];
        $totalPricing = 0;

        //get orm carrier
        $ormPricing = $this->entityManager->getRepository(Pricing::class)->getListPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormPricing){
            $ormPaginator = new ORMPaginator($ormPricing, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalPricing = $ormPaginator->count();
            $pricingList = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($pricingList as $key => $pricing) {
                $date_format = 'd/m/Y H:i:s';
                $pricingList[$key]['created_at'] = Utils::checkDateFormat($pricing['created_at'], $date_format);
                $pricingList[$key]['updated_at'] = Utils::checkDateFormat($pricing['updated_at'], $date_format);
                $pricingList[$key]['effected_date'] = Utils::checkDateFormat($pricing['effected_date'], $date_format);
                $pricingList[$key]['expired_date'] = Utils::checkDateFormat($pricing['expired_date'], $date_format);
            }
        }

        //set return data
        $dataPricing = [
            'listPricing' => $pricingList,
            'totalPricing' => $totalPricing,
        ];
        return $dataPricing;
    }

    /**
     * Add Pricing
     *
     * @param $data
     * @param $user
     * @return Pricing|bool
     * @throws \Exception
     */
    public function addPricing($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricing = new Pricing();
            $pricing->setName($data['name']);
            $pricing->setCarrierId($data['carrier_id']);
            $pricing->setServiceId($data['service_id']);
            $pricing->setCategoryCode($data['category_code']);
            $pricing->setShipmentTypeId($data['shipment_type_id']);
            $pricing->setOriginCountryId($data['origin_country_id']);
            $pricing->setOriginCityId($data['origin_city_id']);
            $pricing->setOriginDistrictId($data['origin_district_id']);
            $pricing->setOriginWardId($data['origin_ward_id']);
            $pricing->setEffectedDate($data['effected_date']);
            $pricing->setExpiredDate($data['expired_date']);
            $pricing->setSalemanId($data['saleman_id']);
            $pricing->setIsPrivate($data['is_private']);
            $pricing->setApprovalStatus($data['approved_status']);
            $pricing->setApprovalBy($data['approved_by']);
            $pricing->setDescription($data['description']);
            $pricing->setDescriptionEn($data['description_en']);
            $pricing->setStatus($data['status']);
            $pricing->setCreatedAt(date('Y-m-d H:i:s'));
            $pricing->setCreatedBy($user->id);
            $pricing->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricing->setUpdatedBy($user->id);
            $this->getReferenced($pricing, $data, $user, 'add');

            $this->entityManager->persist($pricing);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricing;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Pricing
     *
     * @param $pricing
     * @param $data
     * @param $user
     * @return Pricing|bool
     * @throws \Exception
     */
    public function updatePricing($pricing, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricing->setName($data['name']);
            $pricing->setCarrierId($data['carrier_id']);
            $pricing->setServiceId($data['service_id']);
            $pricing->setCategoryCode($data['category_code']);
            $pricing->setShipmentTypeId($data['shipment_type_id']);
            $pricing->setOriginCountryId($data['origin_country_id']);
            $pricing->setOriginCityId($data['origin_city_id']);
            $pricing->setOriginDistrictId($data['origin_district_id']);
            $pricing->setOriginWardId($data['origin_ward_id']);
            $pricing->setEffectedDate($data['effected_date']);
            $pricing->setExpiredDate($data['expired_date']);
            $pricing->setSalemanId($data['saleman_id']);
            $pricing->setIsPrivate($data['is_private']);
            $pricing->setApprovalStatus($data['approved_status']);
            $pricing->setApprovalBy($data['approved_by']);
            $pricing->setDescription($data['description']);
            $pricing->setDescriptionEn($data['description_en']);
            $pricing->setStatus($data['status']);
            $pricing->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricing->setUpdatedBy($user->id);
            $this->getReferenced($pricing, $data, $user);

            $this->entityManager->persist($pricing);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricing;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove Pricing
     *
     * @param $pricing
     * @return Pricing|bool
     * @throws \Exception
     */
    public function deletePricing($pricing, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricing->setIsDeleted(1);
            $pricing->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricing->setUpdatedBy($user->id);

            $this->entityManager->persist($pricing);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricing;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}