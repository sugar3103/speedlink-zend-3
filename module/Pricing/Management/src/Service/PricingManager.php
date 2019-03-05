<?php
namespace Management\Service;

use Address\Entity\City;
use Address\Entity\Country;
use Address\Entity\District;
use Address\Entity\Ward;
use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;
use Management\Entity\PricingCod;
use Management\Entity\PricingCodMin;
use Management\Entity\PricingData;
use Management\Entity\PricingVas;
use Management\Entity\PricingVasSpec;
use OAuth\Entity\User;
use ServiceShipment\Entity\Carrier;

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

    /**
     * Set objects to update and insert
     * @param Pricing $pricing
     * @param $data
     * @param $user
     * @param string $mode
     * @throws \Exception
     */
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

        $origin_country = $this->entityManager->getRepository(Country::class)->find($data['origin_country_id']);
        if ($origin_country == null) {
            throw new \Exception('Not found Origin Country');
        }
        $pricing->setJoinOriginCountry($origin_country);

        if (!empty($data['origin_city_id'])) {
            $origin_city = $this->entityManager->getRepository(City::class)->find($data['origin_city_id']);
            if ($origin_city == null) {
                throw new \Exception('Not found Origin City');
            }
            $pricing->setJoinOriginCity($origin_city);
        }

        if (!empty($data['origin_district_id'])) {
            $origin_district = $this->entityManager->getRepository(District::class)->find($data['origin_district_id']);
            if ($origin_district == null) {
                throw new \Exception('Not found Origin District');
            }
            $pricing->setJoinOriginDistrict($origin_district);
        }

        if (!empty($data['origin_ward_id'])) {
            $origin_ward = $this->entityManager->getRepository(Ward::class)->find($data['origin_ward_id']);
            if ($origin_ward == null) {
                throw new \Exception('Not found Origin Ward');
            }
            $pricing->setJoinOriginWard($origin_ward);
        }
    }

    /**
     * Get list Pricing
     * @param $start
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     */
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

    public function getListCodeByCondition($field, $params)
    {
        $pricing = [];
        $ormPricing = $this->entityManager->getRepository(Pricing::class)->getListCodeByCondition($field, $params);
        if($ormPricing){
            $ormPaginator = new ORMPaginator($ormPricing, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricing = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricing;
    }

    /**
     * Add Pricing
     * @param $data
     * @param $user
     * @return Pricing|bool
     * @throws \Exception
     */
    public function addPricing($data, $user)
    {
        try {
            // begin transaction
            $this->entityManager->beginTransaction();
            $date = new \DateTime();

            $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
            $country = $this->entityManager->getRepository(Country::class)->find($data['origin_country_id']);
            $title = $carrier->getCode().'.'.$data['category_code'].'.'.$country->getIsoCode();
            if (!empty($data['origin_city_id'])) {
                $city = $this->entityManager->getRepository(City::class)->find($data['origin_city_id']);
                $title .= '-'.$city->getNameEn();
            }
            $title .= '.'.date('y-M-d');
            $pricing_count = $this->entityManager->getRepository(Pricing::class)->findBy(['name'=>$title]);
            $title .= '.'.(count($pricing_count)+1);

            $pricing = new Pricing();
            $pricing->setName($title);
            $pricing->setCarrierId($data['carrier_id']);
            $pricing->setCategoryCode($data['category_code']);
            $pricing->setOriginCountryId($data['origin_country_id']);
            $pricing->setOriginCityId($data['origin_city_id']);
            $district_id = empty($data['origin_district_id'])? null : $data['origin_district_id'];
            $pricing->setOriginDistrictId($district_id);
            $ward_id = empty($data['origin_ward_id'])? null : $data['origin_ward_id'];
            $pricing->setOriginWardId($ward_id);
            $pricing->setEffectedDate(new \DateTime($data['effected_date']));
            $pricing->setExpiredDate(new \DateTime($data['expired_date']));
            $pricing->setSalemanId($data['saleman_id']);
            $pricing->setIsPrivate($data['is_private']);
            $pricing->setCustomerId($data['customer_id']);
            $pricing->setApprovalStatus($data['approval_status']);
            $pricing->setApprovedBy($data['approved_by']);
            $pricing->setStatus($data['status']);
            $pricing->setCreatedAt($date);
            $pricing->setCreatedBy($user->id);
            $pricing->setUpdatedAt($date);
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
     * @param Pricing $pricing
     * @param $data
     * @param $user
     * @return Pricing|bool
     * @throws \Exception
     */
    public function updatePricing($pricing, $data, $user)
    {
        try {
            // begin transaction
            $this->entityManager->beginTransaction();
            $district_id = empty($data['origin_district_id'])? null : $data['origin_district_id'];
            $ward_id = empty($data['origin_ward_id'])? null : $data['origin_ward_id'];

            if ($pricing->getCarrierId() != $data['carrier_id']
                || $pricing->getCategoryCode()!= $data['category_code']
                || $pricing->getOriginCountryId() != $data['origin_country_id']
                || $pricing->getOriginCityId() != $data['origin_city_id']
                || $pricing->getOriginDistrictId() != $district_id
                || $pricing->getOriginWardId() != $ward_id) {

                $where = ['pricing_id' => $pricing->getId()];
                $pricing_data = $this->entityManager->getRepository(PricingData::class)->findBy($where);
                $pricing_data_id = array();
                foreach ($pricing_data as $obj) {
                    $pricing_data_id[] = $obj->getId();
                    $this->entityManager->remove($obj);
                }

                $where = ['pricing_data_id' => $pricing_data_id];
                $pricing_vas = $this->entityManager->getRepository(PricingVas::class)->findBy($where);
                foreach ($pricing_vas as $obj) {
                    $this->entityManager->remove($obj);
                }

                $pricing_vas_spec = $this->entityManager->getRepository(PricingVasSpec::class)->findBy($where);
                foreach ($pricing_vas_spec as $obj) {
                    $this->entityManager->remove($obj);
                }

                $pricing_cod = $this->entityManager->getRepository(PricingCod::class)->findBy($where);
                foreach ($pricing_cod as $obj) {
                    $this->entityManager->remove($obj);
                }

                $pricing_cod_min = $this->entityManager->getRepository(PricingCodMin::class)->findBy($where);
                foreach ($pricing_cod_min as $obj) {
                    $this->entityManager->remove($obj);
                }
            }

            $pricing->setName($data['name']);
            $pricing->setCarrierId($data['carrier_id']);
            $pricing->setCategoryCode($data['category_code']);
            $pricing->setOriginCountryId($data['origin_country_id']);
            $pricing->setOriginCityId($data['origin_city_id']);
            $pricing->setOriginDistrictId($district_id);
            $pricing->setOriginWardId($ward_id);
            $pricing->setEffectedDate(new \DateTime($data['effected_date']));
            $pricing->setExpiredDate(new \DateTime($data['expired_date']));
            $pricing->setSalemanId($data['saleman_id']);
            $pricing->setIsPrivate($data['is_private']);
            $pricing->setApprovalStatus($data['approval_status']);
            $pricing->setApprovedBy($data['approved_by']);
            $pricing->setStatus($data['status']);
            $pricing->setUpdatedAt(new \DateTime());
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
     * @param Pricing $pricing
     * @return Pricing|bool
     * @throws \Exception
     */
    public function deletePricing($pricing, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricing->setIsDeleted(1);
            $pricing->setUpdatedAt(new \DateTime());
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