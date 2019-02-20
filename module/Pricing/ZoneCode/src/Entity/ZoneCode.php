<?php
namespace ZoneCode\Entity;

use Doctrine\ORM\Mapping as ORM;

 /**
 * ZoneCode
 *
 * @ORM\Table(name="zone_code", uniqueConstraints={@ORM\UniqueConstraint(name="unique_code", columns={"code"})})
 * @ORM\Entity(repositoryClass="\ZoneCode\Repository\ZoneCodeRepository")
 */
class ZoneCode
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
     * @ORM\Column(name="`code`", type="string", length=20, nullable=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", nullable=false)
     */
    private $carrier_id;

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", length=10, nullable=false, options={"fixed"=true,"comment"="Inbound, Outbound, Domestic"})
     */
    private $category;

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
     * @var bool
     *
     * @ORM\Column(name="is_private", type="integer", nullable=false)
     */
    private $is_private;

    /**
     * @var int
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=true, options={"comment"="required if is_private == 1"})
     */
    private $customer_id;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="integer", nullable=false)
     */
    private $status = '0';

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
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $created_at = 'CURRENT_TIMESTAMP';

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
     * @var \ServiceShipment\Entity\Carrier
     *
     * @ORM\OneToOne(targetEntity="ServiceShipment\Entity\Carrier")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $carrier;

    /**
     * @var \ServiceShipment\Entity\Service
     *
     * @ORM\OneToOne(targetEntity="ServiceShipment\Entity\Service")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="service_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $service;

    /**
     * @var \ServiceShipment\Entity\ShipmentType
     *
     * @ORM\OneToOne(targetEntity="ServiceShipment\Entity\ShipmentType")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="shipment_type_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $shipmenttype;

    /**
     * @var \Address\Entity\Country
     *
     * @ORM\OneToOne(targetEntity="\Address\Entity\Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="origin_country_id", referencedColumnName="id", unique=true)
     * })
     */
    private $origin_country;

    /**
     * @var \Address\Entity\Country
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="destination_country_id", referencedColumnName="id", unique=true)
     * })
     */
    private $destination_country;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\City")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="origin_city_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $origin_city;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\City")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="destination_city_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $destination_city;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="origin_district_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $origin_district;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="destination_district_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $destination_district;

    /**
     * @var \Address\Entity\Ward
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Ward")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="origin_ward_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $origin_ward;

    /**
     * @var \Address\Entity\Ward
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Ward")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="destination_ward_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $destination_ward;

    /**
     * @var \Customer\Entity\Customer
     *
     * @ORM\OneToOne(targetEntity="Customer\Entity\Customer")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="customer_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $customer;

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
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * @return int
     */
    public function getCarrierId()
    {
        return $this->carrier_id;
    }

    /**
     * @param int $carrier_id
     */
    public function setCarrierId($carrier_id)
    {
        $this->carrier_id = $carrier_id;
    }

    /**
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param string $category
     */
    public function setCategory($category)
    {
        $this->category = $category;
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
     * @return bool
     */
    public function isPrivate()
    {
        return $this->is_private;
    }

    /**
     * @param bool $is_private
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
     * @return bool
     */
    public function isStatus()
    {
        return $this->status;
    }

    /**
     * @param bool $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
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
     * @return DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param DateTime $created_at
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
     * @return DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param DateTime|null $updated_at
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
     * Set carrier.
     *
     * @param \ServiceShipment\Entity\Carrier|null $carrier
     *
     * @return ZoneCode
     */
    public function setCarrier(\ServiceShipment\Entity\Carrier $carrier = null)
    {
        $this->carrier = $carrier;
        return $this;
    }

    /**
     * Get carrier.
     *
     * @return \ServiceShipment\Entity\Carrier(|null
     */
    public function getCarrier()
    {
        return $this->carrier;
    }

     /**
     * Set service.
     *
     * @param \ServiceShipment\Entity\Service|null $service
     *
     * @return ZoneCode
     */
    public function setService(\ServiceShipment\Entity\Service $service = null)
    {
        $this->service = $service;
        return $this;
    }

    /**
     * Get service.
     *
     * @return \ServiceShipment\Entity\Service(|null
     */
    public function getService()
    {
        return $this->service;
    }

    /**
     * Set shipmenttype.
     *
     * @param \ServiceShipment\Entity\ShipmentType|null $shipmenttype
     *
     * @return ZoneCode
     */
    public function setShipmentType(\ServiceShipment\Entity\ShipmentType $shipmenttype = null)
    {
        $this->shipmenttype = $shipmenttype;
        return $this;
    }

    /**
     * Get shipmenttype.
     *
     * @return \ServiceShipment\Entity\ShipmentType(|null
     */
    public function getShipmentType()
    {
        return $this->shipmenttype;
    }

    /**
     * Set origin_country.
     *
     * @param \Address\Entity\Country|null $origin_country
     *
     * @return ZoneCode
     */
    public function setOriginCountry(\Address\Entity\Country $origin_country = null)
    {
        $this->origin_country = $origin_country;
        return $this;
    }

    /**
     * Get origin_country.
     *
     * @return \Address\Entity\Country(|null
     */
    public function getOriginCountry()
    {
        return $this->origin_country;
    }

    /**
     * Set destination_country.
     *
     * @param \Address\Entity\Country|null $destination_country
     *
     * @return ZoneCode
     */
    public function setDestinationCountry(\Address\Entity\Country $destination_country = null)
    {
        $this->destination_country = $destination_country;
        return $this;
    }

    /**
     * Get destination_country.
     *
     * @return \Address\Entity\Country(|null
     */
    public function getDestinationCountry()
    {
        return $this->destination_country;
    }

     /**
     * Set origin_city.
     *
     * @param \Address\Entity\City|null $origin_city
     *
     * @return ZoneCode
     */
    public function setOriginCity(\Address\Entity\City $origin_city = null)
    {
        $this->origin_city = $origin_city;
        return $this;
    }

    /**
     * Get origin_city.
     *
     * @return \NetworkPort\Entity\City(|null
     */
    public function getOriginCity()
    {
        return $this->origin_city;
    }

    /**
     * Set destination_city.
     *
     * @param \Address\Entity\City|null $destination_country
     *
     * @return ZoneCode
     */
    public function setDestinationCity(\Address\Entity\City $destination_city = null)
    {
        $this->destination_city = $destination_city;
        return $this;
    }

    /**
     * Get destination_city.
     *
     * @return \Address\Entity\City(|null
     */
    public function getDestinationCity()
    {
        return $this->destination_city;
    }

    /**
     * Set origin_district.
     *
     * @param \Address\Entity\District|null $origin_district
     *
     * @return ZoneCode
     */
    public function setOriginDistrict(\Address\Entity\District $origin_district = null)
    {
        $this->origin_district = $origin_district;
        return $this;
    }

    /**
     * Get origin_district.
     *
     * @return \Address\Entity\District(|null
     */
    public function getOriginDistrict()
    {
        return $this->origin_district;
    }

    /**
     * Set destination_district.
     *
     * @param \Address\Entity\District|null $destination_district
     *
     * @return ZoneCode
     */
    public function setDestinationDistrict(\Address\Entity\District $destination_district = null)
    {
        $this->destination_district = $destination_district;
        return $this;
    }

    /**
     * Get destination_district.
     *
     * @return \Address\Entity\District(|null
     */
    public function getDestinationDistrict()
    {
        return $this->destination_district;
    }

     /**
     * Set origin_ward.
     *
     * @param \Address\Entity\Ward|null $origin_ward
     *
     * @return ZoneCode
     */
    public function setOriginWard(\Address\Entity\Ward $origin_ward = null)
    {
        $this->origin_ward = $origin_ward;
        return $this;
    }

    /**
     * Get origin_ward.
     *
     * @return \Address\Entity\Ward(|null
     */
    public function getOriginWard()
    {
        return $this->origin_ward;
    }

    /**
     * Set destination_ward.
     *
     * @param \Address\Entity\Ward|null $destination_ward
     *
     * @return ZoneCode
     */
    public function setDestinationWard(\Address\Entity\Ward $destination_ward = null)
    {
        $this->destination_ward = $destination_ward;
        return $this;
    }

    /**
     * Get destination_ward.
     *
     * @return \Address\Entity\Ward(|null
     */
    public function getDestinationWard()
    {
        return $this->destination_ward;
    }

    /**
     * Set customer.
     *
     * @param \Customer\Entity\Customer|null $customer
     *
     * @return ZoneCode
     */
    public function setCustomer(\Customer\Entity\Customer $customer = null)
    {
        $this->customer = $customer;
        return $this;
    }

    /**
     * Get customer.
     *
     * @return \Customer\Entity\Customer(|null
     */
    public function getCustomer()
    {
        return $this->customer;
    }

}
