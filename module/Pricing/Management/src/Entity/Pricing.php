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
    private $carrierId;

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
    private $serviceId;

    /**
     * @var int
     *
     * @ORM\Column(name="shipment_type_id", type="integer", nullable=false)
     */
    private $shipmentTypeId;

    /**
     * @var int
     *
     * @ORM\Column(name="origin_country_id", type="integer", nullable=false)
     */
    private $originCountryId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_city_id", type="integer", nullable=true, options={"comment"="required if category == Domestic"})
     */
    private $originCityId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_district_id", type="integer", nullable=true)
     */
    private $originDistrictId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_ward_id", type="integer", nullable=true)
     */
    private $originWardId;

    /**
     * @var int
     *
     * @ORM\Column(name="destination_country_id", type="integer", nullable=false)
     */
    private $destinationCountryId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_city_id", type="integer", nullable=true, options={"comment"="required if category == Domestic"})
     */
    private $destinationCityId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_district_id", type="integer", nullable=true)
     */
    private $destinationDistrictId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_ward_id", type="integer", nullable=true)
     */
    private $destinationWardId;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="effected_date", type="datetime", nullable=true)
     */
    private $effectedDate;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="expired_date", type="datetime", nullable=true)
     */
    private $expiredDate;

    /**
     * @var int|null
     *
     * @ORM\Column(name="saleman_id", type="integer", nullable=true, options={"comment"="user_id"})
     */
    private $salemanId;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_private", type="boolean", nullable=false)
     */
    private $isPrivate;

    /**
     * @var int
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=false, options={"comment"="required if is_private == 1"})
     */
    private $customerId;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status = '0';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="approval_status", type="boolean", nullable=true, options={"comment"="0 == new, 1 == approved"})
     */
    private $approvalStatus;

    /**
     * @var int|null
     *
     * @ORM\Column(name="approval_by", type="integer", nullable=true, options={"comment"="user_id"})
     */
    private $approvalBy;

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
    private $descriptionEn;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $isDeleted = '0';

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
        return $this->carrierId;
    }

    /**
     * @param int $carrierId
     */
    public function setCarrierId($carrierId)
    {
        $this->carrierId = $carrierId;
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
        return $this->serviceId;
    }

    /**
     * @param int $serviceId
     */
    public function setServiceId($serviceId)
    {
        $this->serviceId = $serviceId;
    }

    /**
     * @return int
     */
    public function getShipmentTypeId()
    {
        return $this->shipmentTypeId;
    }

    /**
     * @param int $shipmentTypeId
     */
    public function setShipmentTypeId($shipmentTypeId)
    {
        $this->shipmentTypeId = $shipmentTypeId;
    }

    /**
     * @return int
     */
    public function getOriginCountryId()
    {
        return $this->originCountryId;
    }

    /**
     * @param int $originCountryId
     */
    public function setOriginCountryId($originCountryId)
    {
        $this->originCountryId = $originCountryId;
    }

    /**
     * @return int|null
     */
    public function getOriginCityId()
    {
        return $this->originCityId;
    }

    /**
     * @param int|null $originCityId
     */
    public function setOriginCityId($originCityId)
    {
        $this->originCityId = $originCityId;
    }

    /**
     * @return int|null
     */
    public function getOriginDistrictId()
    {
        return $this->originDistrictId;
    }

    /**
     * @param int|null $originDistrictId
     */
    public function setOriginDistrictId($originDistrictId)
    {
        $this->originDistrictId = $originDistrictId;
    }

    /**
     * @return int|null
     */
    public function getOriginWardId()
    {
        return $this->originWardId;
    }

    /**
     * @param int|null $originWardId
     */
    public function setOriginWardId($originWardId)
    {
        $this->originWardId = $originWardId;
    }

    /**
     * @return int
     */
    public function getDestinationCountryId()
    {
        return $this->destinationCountryId;
    }

    /**
     * @param int $destinationCountryId
     */
    public function setDestinationCountryId($destinationCountryId)
    {
        $this->destinationCountryId = $destinationCountryId;
    }

    /**
     * @return int|null
     */
    public function getDestinationCityId()
    {
        return $this->destinationCityId;
    }

    /**
     * @param int|null $destinationCityId
     */
    public function setDestinationCityId($destinationCityId)
    {
        $this->destinationCityId = $destinationCityId;
    }

    /**
     * @return int|null
     */
    public function getDestinationDistrictId()
    {
        return $this->destinationDistrictId;
    }

    /**
     * @param int|null $destinationDistrictId
     */
    public function setDestinationDistrictId($destinationDistrictId)
    {
        $this->destinationDistrictId = $destinationDistrictId;
    }

    /**
     * @return int|null
     */
    public function getDestinationWardId()
    {
        return $this->destinationWardId;
    }

    /**
     * @param int|null $destinationWardId
     */
    public function setDestinationWardId($destinationWardId)
    {
        $this->destinationWardId = $destinationWardId;
    }

    /**
     * @return DateTime|null
     */
    public function getEffectedDate()
    {
        return $this->effectedDate;
    }

    /**
     * @param DateTime|null $effectedDate
     */
    public function setEffectedDate($effectedDate)
    {
        $this->effectedDate = $effectedDate;
    }

    /**
     * @return DateTime|null
     */
    public function getExpiredDate()
    {
        return $this->expiredDate;
    }

    /**
     * @param DateTime|null $expiredDate
     */
    public function setExpiredDate($expiredDate)
    {
        $this->expiredDate = $expiredDate;
    }

    /**
     * @return int|null
     */
    public function getSalemanId()
    {
        return $this->salemanId;
    }

    /**
     * @param int|null $salemanId
     */
    public function setSalemanId($salemanId)
    {
        $this->salemanId = $salemanId;
    }

    /**
     * @return bool
     */
    public function isPrivate()
    {
        return $this->isPrivate;
    }

    /**
     * @param bool $isPrivate
     */
    public function setIsPrivate($isPrivate)
    {
        $this->isPrivate = $isPrivate;
    }

    /**
     * @return int
     */
    public function getCustomerId()
    {
        return $this->customerId;
    }

    /**
     * @param int $customerId
     */
    public function setCustomerId($customerId)
    {
        $this->customerId = $customerId;
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
     * @return bool|null
     */
    public function getApprovalStatus()
    {
        return $this->approvalStatus;
    }

    /**
     * @param bool|null $approvalStatus
     */
    public function setApprovalStatus($approvalStatus)
    {
        $this->approvalStatus = $approvalStatus;
    }

    /**
     * @return int|null
     */
    public function getApprovalBy()
    {
        return $this->approvalBy;
    }

    /**
     * @param int|null $approvalBy
     */
    public function setApprovalBy($approvalBy)
    {
        $this->approvalBy = $approvalBy;
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
        return $this->descriptionEn;
    }

    /**
     * @param string|null $descriptionEn
     */
    public function setDescriptionEn($descriptionEn)
    {
        $this->descriptionEn = $descriptionEn;
    }

    /**
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * @param int $createdBy
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;
    }

    /**
     * @return DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param DateTime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updatedBy;
    }

    /**
     * @param int|null $updatedBy
     */
    public function setUpdatedBy($updatedBy)
    {
        $this->updatedBy = $updatedBy;
    }

    /**
     * @return DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param DateTime|null $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return bool
     */
    public function isDeleted()
    {
        return $this->isDeleted;
    }

    /**
     * @param bool $isDeleted
     */
    public function setIsDeleted($isDeleted)
    {
        $this->isDeleted = $isDeleted;
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
