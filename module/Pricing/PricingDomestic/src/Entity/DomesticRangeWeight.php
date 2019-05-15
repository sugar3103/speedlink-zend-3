<?php

namespace PricingDomestic\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticRangeWeight
 *
 * @ORM\Table(name="domestic_range_weight", uniqueConstraints={@ORM\UniqueConstraint(name="unique_id", columns={"id"})})
 * @ORM\Entity(repositoryClass="\PricingDomestic\Repository\DomesticRangeWeightRepository")
 */
class DomesticRangeWeight
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="name_en", type="string", length=100, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name_en;

    /**
     * @var bool
     *
     * @ORM\Column(name="calculate_unit", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $calculate_unit;

    /**
     * @var string|null
     *
     * @ORM\Column(name="unit", type="decimal", precision=10, scale=2, nullable=true, options={"default"="0.00","comment"="required if calculate_unit == 1"}, unique=false)
     */
    private $unit = '0.00';

    /**
     * @var int
     *
     * @ORM\Column(name="is_ras", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_ras;

    /**
     * @var string
     *
     * @ORM\Column(name="round_up", type="decimal", precision=10, scale=2, nullable=false, unique=false)
     */
    private $round_up;

    /**
     * @var string
     *
     * @ORM\Column(name="`from`", type="decimal", precision=10, scale=2, nullable=false, unique=false)
     */
    private $from;

    /**
     * @var string
     *
     * @ORM\Column(name="`to`", type="decimal", precision=10, scale=2, nullable=false, options={"comment"="0 = Over"}, unique=false)
     */
    private $to;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $status;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description_en;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, options={"default"="CURRENT_TIMESTAMP"}, unique=false)
     */
    private $created_at = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_at;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted = 0;

    /**
     * @var \ServiceShipment\Entity\Carrier
     *
     * @ORM\ManyToOne(targetEntity="ServiceShipment\Entity\Carrier")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $carrier;

    /**
     * @var \ServiceShipment\Entity\Category
     *
     * @ORM\ManyToOne(targetEntity="ServiceShipment\Entity\Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $category;

    /**
     * @var \ServiceShipment\Entity\Service
     *
     * @ORM\ManyToOne(targetEntity="ServiceShipment\Entity\Service")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="service_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $service;

    /**
     * @var \ServiceShipment\Entity\ShipmentType
     *
     * @ORM\ManyToOne(targetEntity="ServiceShipment\Entity\ShipmentType")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="shipment_type_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $shipmentType;

    /**
     * @var \PricingDomestic\Entity\DomesticZone
     *
     * @ORM\ManyToOne(targetEntity="PricingDomestic\Entity\DomesticZone")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="zone_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $zone;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\OneToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="created_by", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $join_created;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\OneToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="updated_by", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $join_updated;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return DomesticRangeWeight
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set nameEn.
     *
     * @param string $nameEn
     *
     * @return DomesticRangeWeight
     */
    public function setNameEn($nameEn)
    {
        $this->name_en = $nameEn;

        return $this;
    }

    /**
     * Get nameEn.
     *
     * @return string
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * Set calculateUnit.
     *
     * @param bool $calculateUnit
     *
     * @return DomesticRangeWeight
     */
    public function setCalculateUnit($calculateUnit)
    {
        $this->calculate_unit = $calculateUnit;

        return $this;
    }

    /**
     * Get calculateUnit.
     *
     * @return bool
     */
    public function getCalculateUnit()
    {
        return $this->calculate_unit;
    }

    /**
     * Set unit.
     *
     * @param string|null $unit
     *
     * @return DomesticRangeWeight
     */
    public function setUnit($unit = null)
    {
        $this->unit = $unit;

        return $this;
    }

    /**
     * Get unit.
     *
     * @return string|null
     */
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * Set isRas.
     *
     * @param int $isRas
     *
     * @return DomesticRangeWeight
     */
    public function setIsRas($isRas)
    {
        $this->is_ras = $isRas;

        return $this;
    }

    /**
     * Get isRas.
     *
     * @return int
     */
    public function getIsRas()
    {
        return $this->is_ras;
    }

    /**
     * Set roundUp.
     *
     * @param string $roundUp
     *
     * @return DomesticRangeWeight
     */
    public function setRoundUp($roundUp)
    {
        $this->round_up = $roundUp;

        return $this;
    }

    /**
     * Get roundUp.
     *
     * @return string
     */
    public function getRoundUp()
    {
        return $this->round_up;
    }

    /**
     * Set from.
     *
     * @param string $from
     *
     * @return DomesticRangeWeight
     */
    public function setFrom($from)
    {
        $this->from = $from;

        return $this;
    }

    /**
     * Get from.
     *
     * @return string
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * Set to.
     *
     * @param string $to
     *
     * @return DomesticRangeWeight
     */
    public function setTo($to)
    {
        $this->to = $to;

        return $this;
    }

    /**
     * Get to.
     *
     * @return string
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * Set status.
     *
     * @param bool $status
     *
     * @return DomesticRangeWeight
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return bool
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return DomesticRangeWeight
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set descriptionEn.
     *
     * @param string|null $descriptionEn
     *
     * @return DomesticRangeWeight
     */
    public function setDescriptionEn($descriptionEn = null)
    {
        $this->description_en = $descriptionEn;

        return $this;
    }

    /**
     * Get descriptionEn.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * Set createdBy.
     *
     * @param int $createdBy
     *
     * @return DomesticRangeWeight
     */
    public function setCreatedBy($createdBy)
    {
        $this->created_by = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return DomesticRangeWeight
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updatedBy.
     *
     * @param int|null $updatedBy
     *
     * @return DomesticRangeWeight
     */
    public function setUpdatedBy($updatedBy = null)
    {
        $this->updated_by = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime|null $updatedAt
     *
     * @return DomesticRangeWeight
     */
    public function setUpdatedAt($updatedAt = null)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set isDeleted.
     *
     * @param bool $isDeleted
     *
     * @return DomesticRangeWeight
     */
    public function setIsDeleted($isDeleted)
    {
        $this->is_deleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return bool
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * Set carrier.
     *
     * @param \ServiceShipment\Entity\Carrier|null $carrier
     *
     * @return DomesticRangeWeight
     */
    public function setCarrier(\ServiceShipment\Entity\Carrier $carrier = null)
    {
        $this->carrier = $carrier;

        return $this;
    }

    /**
     * Get carrier.
     *
     * @return \ServiceShipment\Entity\Carrier|null
     */
    public function getCarrier()
    {
        return $this->carrier;
    }

    /**
     * Set category.
     *
     * @param \ServiceShipment\Entity\Category|null $category
     *
     * @return DomesticRangeWeight
     */
    public function setCategory(\ServiceShipment\Entity\Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category.
     *
     * @return \ServiceShipment\Entity\Category|null
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set service.
     *
     * @param \ServiceShipment\Entity\Service|null $service
     *
     * @return DomesticRangeWeight
     */
    public function setService(\ServiceShipment\Entity\Service $service = null)
    {
        $this->service = $service;

        return $this;
    }

    /**
     * Get service.
     *
     * @return \ServiceShipment\Entity\Service|null
     */
    public function getService()
    {
        return $this->service;
    }

    /**
     * Set shipmentType.
     *
     * @param \ServiceShipment\Entity\ShipmentType|null $shipmentType
     *
     * @return DomesticRangeWeight
     */
    public function setShipmentType(\ServiceShipment\Entity\ShipmentType $shipmentType = null)
    {
        $this->shipmentType = $shipmentType;

        return $this;
    }

    /**
     * Get shipmentType.
     *
     * @return \ServiceShipment\Entity\ShipmentType|null
     */
    public function getShipmentType()
    {
        return $this->shipmentType;
    }

    /**
     * Set zone.
     *
     * @param \PricingDomestic\Entity\DomesticZone|null $zone
     *
     * @return DomesticRangeWeight
     */
    public function setZone(\PricingDomestic\Entity\DomesticZone $zone = null)
    {
        $this->zone = $zone;

        return $this;
    }

    /**
     * Get zone.
     *
     * @return \PricingDomestic\Entity\DomesticZone|null
     */
    public function getZone()
    {
        return $this->zone;
    }

    /**
     * Set joinCreated.
     *
     * @param \OAuth\Entity\User|null $joinCreated
     *
     * @return DomesticRangeWeight
     */
    public function setJoinCreated(\OAuth\Entity\User $joinCreated = null)
    {
        $this->join_created = $joinCreated;

        return $this;
    }

    /**
     * Get joinCreated.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getJoinCreated()
    {
        return $this->join_created;
    }

    /**
     * Set joinUpdated.
     *
     * @param \OAuth\Entity\User|null $joinUpdated
     *
     * @return DomesticRangeWeight
     */
    public function setJoinUpdated(\OAuth\Entity\User $joinUpdated = null)
    {
        $this->join_updated = $joinUpdated;

        return $this;
    }

    /**
     * Get joinUpdated.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getJoinUpdated()
    {
        return $this->join_updated;
    }
}
