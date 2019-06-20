<?php
namespace ZoneCode\Service;

use Address\Entity\City;
use Address\Entity\Country;
use Address\Entity\District;
use Address\Entity\Ward;
use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use ZoneCode\Entity\ZoneCode;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package ZoneCode\Service
 */
class ZoneCodeManager
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

    public function addZoneCode($data, $user)
    {
        $this->entityManager->beginTransaction();
        try {
            $zonecode = new ZoneCode;
            $zonecode->setName($data['name']);
            $zonecode->setNameEn($data['name_en']);
            $zonecode->setCarrierId($data['carrier_id']);
            $zonecode->setCategoryId($data['category_id']);
            $zonecode->setServiceId($data['service_id']);
            $zonecode->setShipmentTypeId($data['shipment_type_id']);
            $zonecode->setOriginCountryId($data['origin_country_id']);
            $zonecode->setOriginCityId($data['origin_city_id']);
            $zonecode->setOriginDistrictId($data['origin_district_id']);
            $zonecode->setOriginWardId($data['origin_ward_id']);
            $zonecode->setDestinationCountryId($data['destination_country_id']);
            $zonecode->setDestinationCityId($data['destination_city_id']);
            $zonecode->setDestinationDistrictId($data['destination_district_id']);
            $zonecode->setDestinationWardId($data['destination_ward_id']);
            $zonecode->setIsPrivate($data['is_private']);
            $zonecode->setCustomerId($data['customer_id']);
            $zonecode->setStatus($data['status']);
            $zonecode->setDescription($data['description']);
            $zonecode->setDescriptionEn($data['description_en']);

            $zonecode->setCreatedBy($user->id);
            $zonecode->setCreatedAt(date('Y-m-d H:i:s'));
            $this->getReferenced($zonecode, $data, $user, 'add');

            $this->entityManager->persist($zonecode);
            $this->entityManager->flush();
            $this->entityManager->commit();
            return $zonecode;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    public function updateZoneCode($zonecode, $data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $zonecode->setName($data['name']);
            $zonecode->setNameEn($data['name_en']);
            $zonecode->setCarrierId($data['carrier_id']);
            $zonecode->setCategoryId($data['category_id']);
            $zonecode->setServiceId($data['service_id']);
            $zonecode->setShipmentTypeId($data['shipment_type_id']);
            $zonecode->setOriginCountryId($data['origin_country_id']);
            $zonecode->setOriginCityId($data['origin_city_id']);
            $zonecode->setOriginDistrictId($data['origin_city_id']);
            $zonecode->setOriginWardId($data['origin_city_id']);
            $zonecode->setDestinationCountryId($data['destination_country_id']);
            $zonecode->setDestinationCityId($data['destination_country_id']);
            $zonecode->setDestinationDistrictId($data['destination_country_id']);
            $zonecode->setDestinationWardId($data['destination_country_id']);
            $zonecode->setIsPrivate($data['is_private']);
            $zonecode->setCustomerId($data['customer_id']);

            $zonecode->setStatus($data['status']);
            $zonecode->setDescription($data['description']);
            $zonecode->setDescriptionEn($data['description_en']);

            $zonecode->setUpdatedBy($user->id);
            $zonecode->setUpdatedAt(date('Y-m-d H:i:s'));
            $this->getReferenced($zonecode, $data, $user);

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $zonecode->getBranchId();
            $this->entityManager->commit();
            return $zonecode;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    private function getReferenced($zonecode, $data, $user, $mode = '')
    {

        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null) {
            throw new \Exception('Not found Carrier by ID');
        } else {
            $zonecode->setCarrier($carrier);
        }
        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found service by ID');
        }

        $zonecode->setService($service);

        $shipmenttype = $this->entityManager->getRepository(Shipmenttype::class)->find($data['shipment_type_id']);
        if ($shipmenttype == null) {
            throw new \Exception('Not found Shipmenttype by ID');
        }

        $zonecode->setShipmenttype($shipmenttype);

        if ($data['customer_id']) {
            $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
            if ($customer == null) {
                throw new \Exception('Not found Customer by ID');
            }

            $zonecode->setCustomer($customer);
        }

        $origin_country = $this->entityManager->getRepository(Country::class)->find($data['origin_country_id']);
        if ($origin_country == null) {
            throw new \Exception('Not found Origin Country by ID');
        }

        $zonecode->setOriginCountry($origin_country);

        if ($data['origin_city_id']) {
            $origin_city = $this->entityManager->getRepository(City::class)->find($data['origin_city_id']);
            if ($origin_city == null) {
                throw new \Exception('Not found Origin City by ID');
            }

            $zonecode->setOriginCity($origin_city);
        }

        if ($data['origin_district_id']) {
            $origin_district = $this->entityManager->getRepository(District::class)->find($data['origin_district_id']);
            if ($origin_district == null) {
                throw new \Exception('Not found Origin District by ID');
            }

            $zonecode->setOriginDistrict($origin_district);
        }

        if ($data['origin_ward_id']) {
            $origin_ward = $this->entityManager->getRepository(Ward::class)->find($data['origin_ward_id']);
            if ($origin_ward == null) {
                throw new \Exception('Not found Origin Ward by ID');
            }

            $zonecode->setOriginWard($origin_ward);
        }

        $destination_country = $this->entityManager->getRepository(Country::class)->find($data['destination_country_id']);
        if ($destination_country == null) {
            throw new \Exception('Not found Destination Country by ID');
        }

        $zonecode->setDestinationCountry($destination_country);

        if ($data['destination_city_id']) {
            $destination_city = $this->entityManager->getRepository(City::class)->find($data['destination_city_id']);
            if ($destination_city == null) {
                throw new \Exception('Not found Destination City by ID');
            }

            $zonecode->setDestinationCity($destination_city);
        }

        if ($data['destination_district_id']) {
            $destination_district = $this->entityManager->getRepository(District::class)->find($data['destination_district_id']);
            if ($destination_district == null) {
                throw new \Exception('Not found Destination District by ID');
            }

            $zonecode->setDestinationDistrict($destination_district);
        }

        if ($data['destination_ward_id']) {
            $destination_ward = $this->entityManager->getRepository(Ward::class)->find($data['destination_ward_id']);
            if ($destination_ward == null) {
                throw new \Exception('Not found Destination Ward by ID');
            }

            $zonecode->setDestinationWard($destination_ward);
        }

        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $zonecode->setUserCreate($user_data);
        }
        $zonecode->setUserUpdate($user_data);
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
    public function getListZoneCodeByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ) {
        $zonecodes = [];
        $totalZoneCode = 0;
        //get orm zonecode
        $ormZoneCode = $this->entityManager->getRepository(ZoneCode::class)
            ->getListZoneCodeByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormZoneCode) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormZoneCode, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalZoneCode = $ormPaginator->count();
            //get user list
            $zonecodes = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($zonecodes as &$zonecode) {
                //set created_at
                $zonecode['created_at'] = ($zonecode['created_at']) ? Utils::checkDateFormat($zonecode['created_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $zonecode['updated_at'] = ($zonecode['updated_at']) ? Utils::checkDateFormat($zonecode['updated_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $zonecode['full_name_created'] = trim($zonecode['full_name_created']);
                $zonecode['full_name_updated'] = trim($zonecode['full_name_updated']);
            }
        }
        //set data user
        $dataZoneCode = [
            'listZoneCode' => $zonecodes,
            'totalZoneCode' => $totalZoneCode,
        ];
        return $dataZoneCode;
    }

    public function removeZoneCode($zonecode)
    {
        
        $this->entityManager->beginTransaction();
        try {
            $zonecode->setIsDeleted(1);
            $this->entityManager->flush();
            $this->entityManager->commit();
            return $zonecode;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

}
