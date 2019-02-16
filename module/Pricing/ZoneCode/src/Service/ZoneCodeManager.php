<?php
namespace ZoneCode\Service;

use ZoneCode\Entity\RangeWeight;
use ZoneCode\Entity\ZoneCode;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Zend\Crypt\Password\Bcrypt;
use Zend\Math\Rand;
use Zend\View\Renderer\PhpRenderer;
use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;
use Zend\Mail\Message;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Zend\Authentication\Result;
use Core\Utils\Utils;
use Address\Entity\Country;
use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use Customer\Entity\Customer;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package ZoneCode\Service
 */
class ZoneCodeManager {

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
    )
    {
        $this->entityManager = $entityManager;
    }   

    public function addZoneCode($data)
    {
        $this->entityManager->beginTransaction();
        try {
        $zonecode = new ZoneCode;
        // var_dump($data); die;
        $zonecode->setCode($data['code']);
        $zonecode->setCarrierId($data['carrier_id']);
        $zonecode->setCategory($data['category']);
        $zonecode->setServiceId($data['service_id']);
        $zonecode->setShipmentTypeId($data['shipmenttype_id']);
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
       
        $zonecode->setCreatedBy($data['created_by']);
        $zonecode->setCreatedAt(date('Y-m-d H:i:s'));
        $this->getReferenced($zonecode, $data);
        
        $this->entityManager->persist($zonecode);
        $this->entityManager->flush();        
        // $last_id = $zonecode->getZoneCodeId();
        $this->entityManager->commit();
        return $zonecode;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateZoneCode($zonecode, $data) {

        $this->entityManager->beginTransaction();
        try {
            $zonecode->setCode($data['code']);
            $zonecode->setCarrierId($data['carrier_id']);
            $zonecode->setCategory($data['category']);
            $zonecode->setServiceId($data['service_id']);
            $zonecode->setShipmentTypeId($data['shipmenttype_id']);
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

            $zonecode->setUpdatedBy($data['updated_by']);
            $zonecode->setUpdatedAt(date('Y-m-d H:i:s'));
            $this->getReferenced($zonecode, $data);
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $zonecode->getBranchId();
            $this->entityManager->commit();
           return $zonecode;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($zonecode,$data) {

        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null)
            throw new \Exception('Not found Carrier by ID');

        $zonecode->setCarrier($carrier);

        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null)
            throw new \Exception('Not found service by ID');

        $zonecode->setService($service);
        
        $shipmenttype = $this->entityManager->getRepository(Shipmenttype::class)->find($data['shipmenttype_id']);
        if ($shipmenttype == null)
            throw new \Exception('Not found Shipmenttype by ID');

        $zonecode->setShipmenttype($shipmenttype);

        $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
        if ($customer == null)
            throw new \Exception('Not found Customer by ID');

        $zonecode->setCustomer($customer);
        
        $origin_country = $this->entityManager->getRepository(Country::class)->find($data['origin_country_id']);
        if ($origin_country == null)
            throw new \Exception('Not found Origin Country by ID');

        $zonecode->setOriginCountry($origin_country);

        $origin_city = $this->entityManager->getRepository(City::class)->find($data['origin_city_id']);
        if ($origin_city == null)
            throw new \Exception('Not found Origin City by ID');

        $zonecode->setOriginCity($origin_city);
        
        $origin_district = $this->entityManager->getRepository(District::class)->find($data['origin_district_id']);
        if ($origin_district == null)
            throw new \Exception('Not found Origin District by ID');

        $zonecode->setOriginDistrict($origin_district);

        $origin_ward = $this->entityManager->getRepository(Ward::class)->find($data['origin_ward_id']);
        if ($origin_ward == null)
            throw new \Exception('Not found Origin Ward by ID');

        $zonecode->setOriginWard($origin_ward);

        $destination_country = $this->entityManager->getRepository(Country::class)->find($data['destination_country_id']);
        if ($destination_country == null)
            throw new \Exception('Not found Destination Country by ID');

        $zonecode->setDestinationCountry($destination_country);

        $destination_city = $this->entityManager->getRepository(City::class)->find($data['destination_city_id']);
        if ($destination_city == null)
            throw new \Exception('Not found Destination City by ID');

        $zonecode->setDestinationCity($destination_city);
        
        $destination_district = $this->entityManager->getRepository(District::class)->find($data['destination_district_id']);
        if ($destination_district == null)
            throw new \Exception('Not found Destination District by ID');

        $zonecode->setDestinationDistrict($destination_district);

        $destination_ward = $this->entityManager->getRepository(Ward::class)->find($data['destination_ward_id']);
        if ($destination_ward == null)
            throw new \Exception('Not found Destination Ward by ID');

        $zonecode->setDestinationWard($destination_ward);
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
    ){
        $zonecodes     = [];
        $totalZoneCode = 0;
        //get orm zonecode
        $ormZoneCode = $this->entityManager->getRepository(ZoneCode::class)
            ->getListZoneCodeByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormZoneCode){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormZoneCode, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalZoneCode = $ormPaginator->count();
            //get user list
            $zonecodes = $ormPaginator->getIterator()->getArrayCopy();
            // $countRow = 1;
             foreach ($zonecodes as &$zonecode) {
            //set status
            //   $zonecode['status'] = Branch::getIsActiveList($zonecode['status']);
            //set created_at
                $zonecode['created_at'] =  ($zonecode['created_at']) ?Utils::checkDateFormat($zonecode['created_at'],'d/m/Y') : '';
            // $countRow++;
            }
        }
        //set data user
        $dataZoneCode = [
            'listZoneCode' => $zonecodes,
            'totalZoneCode' => $totalZoneCode,
        ];
        return $dataZoneCode;
    }
    
    public function removeZoneCode($zonecode) {
        $this->entityManager->beginTransaction();
        try {      
            $this->entityManager->remove($zonecode);
            $this->entityManager->flush();
            $this->entityManager->commit();
            return $zonecode;          
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}