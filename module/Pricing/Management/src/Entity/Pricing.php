<?php
namespace Management\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pricing
 *
 * @ORM\Table(name="pricing")
 * @ORM\Entity(repositoryClass="Management\Repository\PricingRepository")
 */
class Pricing
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", nullable=false)
     */
    private $carrier_id;

    /**
     * @var string
     *
     * @ORM\Column(name="category_code", type="string", length=10, nullable=false, options={"fixed"=true,"comment"="Inbound, Outbound, Domestic"})
     */
    private $category_code;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", nullable=false)
     */
    private $service_id;

    /**
     * @var int
     *
     * @ORM\Column(name="shipment_type_id", type="integer", nullable=false)
     */
    private $shipment_type_id;

    /**
     * @var int
     *
     * @ORM\Column(name="origin_country_id", type="integer", nullable=false)
     */
    private $origin_country_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_city_id", type="integer", nullable=true, options={"comment"="required if category == Domestic"})
     */
    private $origin_city_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_district_id", type="integer", nullable=true)
     */
    private $origin_district_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_ward_id", type="integer", nullable=true)
     */
    private $origin_ward_id;

    /**
     * @var int
     *
     * @ORM\Column(name="destination_country_id", type="integer", nullable=false)
     */
    private $destination_country_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_city_id", type="integer", nullable=true, options={"comment"="required if category == Domestic"})
     */
    private $destination_city_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_district_id", type="integer", nullable=true)
     */
    private $destination_district_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_ward_id", type="integer", nullable=true)
     */
    private $destination_ward_id;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="effected_date", type="datetime", nullable=true)
     */
    private $effected_date;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="expired_date", type="datetime", nullable=true)
     */
    private $expired_date;

    /**
     * @var int|null
     *
     * @ORM\Column(name="saleman_id", type="integer", nullable=true, options={"comment"="user_id"})
     */
    private $saleman_id;

    /**
     * @var int
     *
     * @ORM\Column(name="is_private", type="boolean", nullable=false)
     */
    private $is_private;

    /**
     * @var int
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=false, options={"comment"="required if is_private == 1"})
     */
    private $customer_id;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="approval_status", type="boolean", nullable=true, options={"comment"="0 == new, 1 == approved"})
     */
    private $approval_status;

    /**
     * @var int|null
     *
     * @ORM\Column(name="approval_by", type="integer", nullable=true, options={"comment"="user_id"})
     */
    private $approval_by;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, nullable=true)
     */
    private $description_en;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updated_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $is_deleted = '0';

    /**
     *
     * @ORM\OneToOne(targetEntity="\ServiceShipment\Entity\Carrier")
     * @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", nullable=true)
     */
    private $join_carrier;

    /**
     *
     * @ORM\OneToOne(targetEntity="\ServiceShipment\Entity\Service")
     * @ORM\JoinColumn(name="shipment_type_id", referencedColumnName="id", nullable=true)
     */
    private $join_service;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\Country")
     * @ORM\JoinColumn(name="origin_country_id", referencedColumnName="id", nullable=true)
     */
    private $join_origin_country;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\City")
     * @ORM\JoinColumn(name="origin_city_id", referencedColumnName="id", nullable=true)
     */
    private $join_origin_city;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\District")
     * @ORM\JoinColumn(name="origin_district_id", referencedColumnName="id", nullable=true)
     */
    private $join_origin_district;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\Ward")
     * @ORM\JoinColumn(name="origin_ward_id", referencedColumnName="id", nullable=true)
     */
    private $join_origin_ward;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\Country")
     * @ORM\JoinColumn(name="destination_country_id", referencedColumnName="id", nullable=true)
     */
    private $join_destination_country;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\City")
     * @ORM\JoinColumn(name="destination_city_id", referencedColumnName="id", nullable=true)
     */
    private $join_destination_city;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\District")
     * @ORM\JoinColumn(name="destination_district_id", referencedColumnName="id", nullable=true)
     */
    private $join_destination_district;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\Ward")
     * @ORM\JoinColumn(name="destination_ward_id", referencedColumnName="id", nullable=true)
     */
    private $join_destination_ward;

    /**
     *
     * @ORM\OneToOne(targetEntity="\ServiceShipment\Entity\ShipmentType")
     * @ORM\JoinColumn(name="shipment_type_id", referencedColumnName="id", nullable=true)
     */
    private $join_shipment_type;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="saleman_id", referencedColumnName="id", nullable=true)
     */
    private $join_saleman;

    /**
     *
     * @ORM\OneToOne(targetEntity="\Customer\Entity\Customer")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="id", nullable=true)
     */
    private $join_customer;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="approval_by", referencedColumnName="id", nullable=true)
     */
    private $join_approval;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=true)
     */
    private $join_created;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     */
    private $join_updated;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return int
     */
    public function getCarrierId()
    {
        return $this->carrier_id;
    }

    /**
     * @param int $carrierId
     */
    public function setCarrierId($carrier_id)
    {
        $this->carrier_id = $carrier_id;
    }

    /**
     * @return string
     */
    public function getCategoryCode()
    {
        return $this->category_code;
    }

    /**
     * @param string $category_code
     */
    public function setCategoryCode($category_code)
    {
        $this->category_code = $category_code;
    }

    /**
     * @return int
     */
    public function getServiceId()
    {
        return $this->service_id;
    }

    /**
     * @param int $service_id
     */
    public function setServiceId($service_id)
    {
        $this->service_id = $service_id;
    }

    /**
     * @return int
     */
    public function getShipmentTypeId()
    {
        return $this->shipment_type_id;
    }

    /**
     * @param int $shipment_type_id
     */
    public function setShipmentTypeId($shipment_type_id)
    {
        $this->shipment_type_id = $shipment_type_id;
    }

    /**
     * @return int
     */
    public function getOriginCountryId()
    {
        return $this->origin_country_id;
    }

    /**
     * @param int $origin_country_id
     */
    public function setOriginCountryId($origin_country_id)
    {
        $this->origin_country_id = $origin_country_id;
    }

    /**
     * @return int|null
     */
    public function getOriginCityId()
    {
        return $this->origin_city_id;
    }

    /**
     * @param int|null $origin_city_id
     */
    public function setOriginCityId($origin_city_id)
    {
        $this->origin_city_id = $origin_city_id;
    }

    /**
     * @return int|null
     */
    public function getOriginDistrictId()
    {
        return $this->origin_district_id;
    }

    /**
     * @param int|null $origin_district_id
     */
    public function setOriginDistrictId($origin_district_id)
    {
        $this->origin_district_id = $origin_district_id;
    }

    /**
     * @return int|null
     */
    public function getOriginWardId()
    {
        return $this->origin_ward_id;
    }

    /**
     * @param int|null $origin_ward_id
     */
    public function setOriginWardId($origin_ward_id)
    {
        $this->origin_ward_id = $origin_ward_id;
    }

    /**
     * @return int
     */
    public function getDestinationCountryId()
    {
        return $this->destination_country_id;
    }

    /**
     * @param int $destination_country_id
     */
    public function setDestinationCountryId($destination_country_id)
    {
        $this->destination_country_id = $destination_country_id;
    }

    /**
     * @return int|null
     */
    public function getDestinationCityId()
    {
        return $this->destination_city_id;
    }

    /**
     * @param int|null $destination_city_id
     */
    public function setDestinationCityId($destination_city_id)
    {
        $this->destination_city_id = $destination_city_id;
    }

    /**
     * @return int|null
     */
    public function getDestinationDistrictId()
    {
        return $this->destination_district_id;
    }

    /**
     * @param int|null $destination_district_id
     */
    public function setDestinationDistrictId($destination_district_id)
    {
        $this->destination_district_id = $destination_district_id;
    }

    /**
     * @return int|null
     */
    public function getDestinationWardId()
    {
        return $this->destination_ward_id;
    }

    /**
     * @param int|null $destination_ward_id
     */
    public function setDestinationWardId($destination_ward_id)
    {
        $this->destination_ward_id = $destination_ward_id;
    }

    /**
     * @return \DateTime|null
     */
    public function getEffectedDate()
    {
        return $this->effected_date;
    }

    /**
     * @param \DateTime|null $effected_date
     */
    public function setEffectedDate($effected_date)
    {
        $this->effected_date = $effected_date;
    }

    /**
     * @return \DateTime|null
     */
    public function getExpiredDate()
    {
        return $this->expired_date;
    }

    /**
     * @param \DateTime|null $expired_date
     */
    public function setExpiredDate($expired_date)
    {
        $this->expired_date = $expired_date;
    }

    /**
     * @return int|null
     */
    public function getSalemanId()
    {
        return $this->saleman_id;
    }

    /**
     * @param int|null $saleman_id
     */
    public function setSalemanId($saleman_id)
    {
        $this->saleman_id = $saleman_id;
    }

    /**
     * @return int
     */
    public function getisPrivate()
    {
        return $this->is_private;
    }

    /**
     * @param int $is_private
     */
    public function setIsPrivate($is_private)
    {
        $this->is_private = $is_private;
    }

    /**
     * @return int
     */
    public function getCustomerId()
    {
        return $this->customer_id;
    }

    /**
     * @param int $customer_id
     */
    public function setCustomerId($customer_id)
    {
        $this->customer_id = $customer_id;
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return int
     */
    public function getApprovalStatus()
    {
        return $this->approval_status;
    }

    /**
     * @param int $approval_status
     */
    public function setApprovalStatus($approval_status)
    {
        $this->approval_status = $approval_status;
    }

    /**
     * @return int|null
     */
    public function getApprovalBy()
    {
        return $this->approval_by;
    }

    /**
     * @param int|null $approval_by
     */
    public function setApprovalBy($approval_by)
    {
        $this->approval_by = $approval_by;
    }

    /**
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * @param string|null $description_en
     */
    public function setDescriptionEn($description_en)
    {
        $this->description_en = $description_en;
    }

    /**
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * @param int $created_by
     */
    public function setCreatedBy($created_by)
    {
        $this->created_by = $created_by;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param \DateTime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }

    /**
     * @param int|null $updated_by
     */
    public function setUpdatedBy($updated_by)
    {
        $this->updated_by = $updated_by;
    }

    /**
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param \DateTime|null $updated_at
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }

    /**
     * @return bool
     */
    public function isDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * @param bool $is_deleted
     */
    public function setIsDeleted($is_deleted)
    {
        $this->is_deleted = $is_deleted;
    }

    /**
     * @return mixed
     */
    public function getJoinCarrier()
    {
        return $this->join_carrier;
    }

    /**
     * @param mixed $join_carrier
     */
    public function setJoinCarrier($join_carrier)
    {
        $this->join_carrier = $join_carrier;
    }

    /**
     * @return mixed
     */
    public function getJoinService()
    {
        return $this->join_service;
    }

    /**
     * @param mixed $join_service
     */
    public function setJoinService($join_service)
    {
        $this->join_service = $join_service;
    }

    /**
     * @return mixed
     */
    public function getJoinOriginCountry()
    {
        return $this->join_origin_country;
    }

    /**
     * @param mixed $join_origin_country
     */
    public function setJoinOriginCountry($join_origin_country)
    {
        $this->join_origin_country = $join_origin_country;
    }

    /**
     * @return mixed
     */
    public function getJoinOriginCity()
    {
        return $this->join_origin_city;
    }

    /**
     * @param mixed $join_origin_city
     */
    public function setJoinOriginCity($join_origin_city)
    {
        $this->join_origin_city = $join_origin_city;
    }

    /**
     * @return mixed
     */
    public function getJoinOriginDistrict()
    {
        return $this->join_origin_district;
    }

    /**
     * @param mixed $join_origin_district
     */
    public function setJoinOriginDistrict($join_origin_district)
    {
        $this->join_origin_district = $join_origin_district;
    }

    /**
     * @return mixed
     */
    public function getJoinOriginWard()
    {
        return $this->join_origin_ward;
    }

    /**
     * @param mixed $join_origin_ward
     */
    public function setJoinOriginWard($join_origin_ward)
    {
        $this->join_origin_ward = $join_origin_ward;
    }

    /**
     * @return mixed
     */
    public function getJoinDestinationCountry()
    {
        return $this->join_destination_country;
    }

    /**
     * @param mixed $join_destination_country
     */
    public function setJoinDestinationCountry($join_destination_country)
    {
        $this->join_destination_country = $join_destination_country;
    }

    /**
     * @return mixed
     */
    public function getJoinDestinationCity()
    {
        return $this->join_destination_city;
    }

    /**
     * @param mixed $join_destination_city
     */
    public function setJoinDestinationCity($join_destination_city)
    {
        $this->join_destination_city = $join_destination_city;
    }

    /**
     * @return mixed
     */
    public function getJoinDestinationDistrict()
    {
        return $this->join_destination_district;
    }

    /**
     * @param mixed $join_destination_district
     */
    public function setJoinDestinationDistrict($join_destination_district)
    {
        $this->join_destination_district = $join_destination_district;
    }

    /**
     * @return mixed
     */
    public function getJoinDestinationWard()
    {
        return $this->join_destination_ward;
    }

    /**
     * @param mixed $join_destination_ward
     */
    public function setJoinDestinationWard($join_destination_ward)
    {
        $this->join_destination_ward = $join_destination_ward;
    }

    /**
     * @return mixed
     */
    public function getJoinShipmentType()
    {
        return $this->join_shipment_type;
    }

    /**
     * @param mixed $join_shipment_type
     */
    public function setJoinShipmentType($join_shipment_type)
    {
        $this->join_shipment_type = $join_shipment_type;
    }

    /**
     * @return mixed
     */
    public function getJoinSaleman()
    {
        return $this->join_saleman;
    }

    /**
     * @param mixed $join_saleman
     */
    public function setJoinSaleman($join_saleman)
    {
        $this->join_saleman = $join_saleman;
    }

    /**
     * @return mixed
     */
    public function getJoinCustomer()
    {
        return $this->join_customer;
    }

    /**
     * @param mixed $join_customer
     */
    public function setJoinCustomer($join_customer)
    {
        $this->join_customer = $join_customer;
    }

    /**
     * @return mixed
     */
    public function getJoinApproval()
    {
        return $this->join_approval;
    }

    /**
     * @param mixed $join_approval
     */
    public function setJoinApproval($join_approval)
    {
        $this->join_approval = $join_approval;
    }

    /**
     * @return mixed
     */
    public function getJoinCreated()
    {
        return $this->join_created;
    }

    /**
     * @param mixed $join_created
     */
    public function setJoinCreated($join_created)
    {
        $this->join_created = $join_created;
    }

    /**
     * @return mixed
     */
    public function getJoinUpdated()
    {
        return $this->join_updated;
    }

    /**
     * @param mixed $join_updated
     */
    public function setJoinUpdated($join_updated)
    {
        $this->join_updated = $join_updated;
    }

}
