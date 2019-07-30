<?php

namespace PricingSpecial\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SpecialRangeWeight
 *
 * @ORM\Table(name="special_range_weight", indexes={@ORM\Index(name="customer_special_range_weight_customer_id_fk", columns={"customer_id"}), @ORM\Index(name="category_special_range_weight_catory_id_fk", columns={"category_id"}), @ORM\Index(name="special_area_special_range_weight_special_area_id_fk", columns={"special_area_id"}), @ORM\Index(name="created_by_special_range_weight_user_fk", columns={"created_by"}), @ORM\Index(name="carrier_special_range_weight_carrier_id_fk", columns={"carrier_id"}), @ORM\Index(name="service_special_range_weight_service_id_fk", columns={"service_id"}), @ORM\Index(name="shipment_type_special_range_weight_shipment_type_id_fk", columns={"shipment_type_id"}), @ORM\Index(name="updated_by_special_range_weight_user_fk", columns={"updated_by"})})
 * @ORM\Entity(repositoryClass="\PricingSpecial\Repository\SpecialRangeWeightRepository")
 */
class SpecialRangeWeight
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
     * @var float
     *
     * @ORM\Column(name="calculate_unit", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $calculate_unit;

    /**
     * @var float
     *
     * @ORM\Column(name="round_up", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $round_up;

    /**
     * @var float
     *
     * @ORM\Column(name="unit", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $unit;

    /**
     * @var float
     *
     * @ORM\Column(name="`from`", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $from;

    /**
     * @var float
     *
     * @ORM\Column(name="`to`", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $to;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", precision=0, scale=0, nullable=false, options={"default"="1"}, unique=false)
     */
    private $status = '1';

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
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $created_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $updated_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=true, unique=false)
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
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $created_by;

    /**
     * @var \Customer\Entity\Customer
     *
     * @ORM\ManyToOne(targetEntity="Customer\Entity\Customer")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="customer_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $customer;

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
    private $shipment_type;

    /**
     * @var \PricingSpecial\Entity\SpecialArea
     *
     * @ORM\ManyToOne(targetEntity="PricingSpecial\Entity\SpecialArea")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="special_area_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $special_area;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $updated_by;


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
     * @return SpecialRangeWeight
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
     * Set name_en.
     *
     * @param string $name_en
     *
     * @return SpecialRangeWeight
     */
    public function setNameEn($name_en)
    {
        $this->name_en = $name_en;

        return $this;
    }

    /**
     * Get name_en.
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
     * @param float $calculateUnit
     *
     * @return SpecialRangeWeight
     */
    public function setCalculateUnit($calculateUnit)
    {
        $this->calculate_unit = $calculateUnit;

        return $this;
    }

    /**
     * Get calculateUnit.
     *
     * @return float
     */
    public function getCalculateUnit()
    {
        return $this->calculate_unit;
    }

    /**
     * Set roundUp.
     *
     * @param float $roundUp
     *
     * @return SpecialRangeWeight
     */
    public function setRoundUp($roundUp)
    {
        $this->round_up = $roundUp;

        return $this;
    }

    /**
     * Get roundUp.
     *
     * @return float
     */
    public function getRoundUp()
    {
        return $this->round_up;
    }

    /**
     * Set unit.
     *
     * @param float $unit
     *
     * @return SpecialRangeWeight
     */
    public function setUnit($unit)
    {
        $this->unit = $unit;

        return $this;
    }

    /**
     * Get unit.
     *
     * @return float
     */
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * Set from.
     *
     * @param float $from
     *
     * @return SpecialRangeWeight
     */
    public function setFrom($from)
    {
        $this->from = $from;

        return $this;
    }

    /**
     * Get from.
     *
     * @return float
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * Set to.
     *
     * @param float $to
     *
     * @return SpecialRangeWeight
     */
    public function setTo($to)
    {
        $this->to = $to;

        return $this;
    }

    /**
     * Get to.
     *
     * @return float
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return SpecialRangeWeight
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return int
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
     * @return SpecialRangeWeight
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
     * Set description_en.
     *
     * @param string|null $description_en
     *
     * @return SpecialRangeWeight
     */
    public function setDescriptionEn($description_en = null)
    {
        $this->description_en = $description_en;

        return $this;
    }

    /**
     * Get description_en.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return SpecialRangeWeight
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
     * Set updatedAt.
     *
     * @param \DateTime $updatedAt
     *
     * @return SpecialRangeWeight
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set is_deleted.
     *
     * @param int|null $is_deleted
     *
     * @return SpecialRangeWeight
     */
    public function setIsDeleted($is_deleted = null)
    {
        $this->is_deleted = $is_deleted;

        return $this;
    }

    /**
     * Get is_deleted.
     *
     * @return int|null
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
     * @return SpecialRangeWeight
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
     * @return SpecialRangeWeight
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
     * Set created_by.
     *
     * @param \OAuth\Entity\User|null $created_by
     *
     * @return SpecialRangeWeight
     */
    public function setCreatedBy(\OAuth\Entity\User $created_by = null)
    {
        $this->created_by = $created_by;

        return $this;
    }

    /**
     * Get created_by.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * Set customer.
     *
     * @param \Customer\Entity\Customer|null $customer
     *
     * @return SpecialRangeWeight
     */
    public function setCustomer(\Customer\Entity\Customer $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer.
     *
     * @return \Customer\Entity\Customer|null
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set service.
     *
     * @param \ServiceShipment\Entity\Service|null $service
     *
     * @return SpecialRangeWeight
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
     * Set shipment_type.
     *
     * @param \ServiceShipment\Entity\ShipmentType|null $shipment_type
     *
     * @return SpecialRangeWeight
     */
    public function setShipmentType(\ServiceShipment\Entity\ShipmentType $shipment_type = null)
    {
        $this->shipment_type = $shipment_type;

        return $this;
    }

    /**
     * Get shipment_type.
     *
     * @return \ServiceShipment\Entity\ShipmentType|null
     */
    public function getShipmentType()
    {
        return $this->shipment_type;
    }

    /**
     * Set special_area.
     *
     * @param \PricingSpecial\Entity\SpecialArea|null $special_area
     *
     * @return SpecialRangeWeight
     */
    public function setSpecialArea(\PricingSpecial\Entity\SpecialArea $special_area = null)
    {
        $this->special_area = $special_area;

        return $this;
    }

    /**
     * Get special_area.
     *
     * @return \PricingSpecial\Entity\SpecialArea|null
     */
    public function getSpecialArea()
    {
        return $this->special_area;
    }

    /**
     * Set updated_by.
     *
     * @param \OAuth\Entity\User|null $updated_by
     *
     * @return SpecialRangeWeight
     */
    public function setUpdatedBy(\OAuth\Entity\User $updated_by = null)
    {
        $this->updated_by = $updated_by;

        return $this;
    }

    /**
     * Get updated_by.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }
}
