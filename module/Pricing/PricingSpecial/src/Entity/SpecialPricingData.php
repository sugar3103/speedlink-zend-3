<?php

namespace PricingSpecial\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SpecialPricingData
 *
 * @ORM\Table(name="special_pricing_data", indexes={@ORM\Index(name="special_pricing_special_pricing_data_special_pricing_id_fk", columns={"special_pricing_id"}), @ORM\Index(name="created_by_special_pricing_data_fk", columns={"created_by"}), @ORM\Index(name="special_range_weight_special_pricing_data_fk", columns={"special_range_weight_id"}), @ORM\Index(name="updated_by_special_pricing_data_fk", columns={"updated_by"})})
 * @ORM\Entity
 */
class SpecialPricingData
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
     * @var float
     *
     * @ORM\Column(name="value", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $value;

    /**
     * @var int
     *
     * @ORM\Column(name="return_type", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $return_type;

    /**
     * @var float
     *
     * @ORM\Column(name="return_value", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $return_value;

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
     * @var int
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted = 0;

    /**
     * @var int
     *
     * @ORM\Column(name="lead_time_from", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $lead_time_from = 0;

    /**
     * @var int
     *
     * @ORM\Column(name="lead_time_to", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $lead_time_to = 0;

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
     * @var \PricingSpecial\Entity\SpecialPricing
     *
     * @ORM\ManyToOne(targetEntity="PricingSpecial\Entity\SpecialPricing")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="special_pricing_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $special_pricing;

    /**
     * @var \PricingSpecial\Entity\SpecialRangeWeight
     *
     * @ORM\ManyToOne(targetEntity="PricingSpecial\Entity\SpecialRangeWeight")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="special_range_weight_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $special_range_weight;

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
     * Set value.
     *
     * @param float $value
     *
     * @return SpecialPricingData
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value.
     *
     * @return float
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set returnType.
     *
     * @param int $returnType
     *
     * @return SpecialPricingData
     */
    public function setReturnType($returnType)
    {
        $this->return_type = $returnType;

        return $this;
    }

    /**
     * Get returnType.
     *
     * @return int
     */
    public function getReturnType()
    {
        return $this->return_type;
    }

    /**
     * Set returnValue.
     *
     * @param float $returnValue
     *
     * @return SpecialPricingData
     */
    public function setReturnValue($returnValue)
    {
        $this->return_value = $returnValue;

        return $this;
    }

    /**
     * Get returnValue.
     *
     * @return float
     */
    public function getReturnValue()
    {
        return $this->return_value;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return SpecialPricingData
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
     * @return SpecialPricingData
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
     * Set isDeleted.
     *
     * @param int $isDeleted
     *
     * @return SpecialPricingData
     */
    public function setIsDeleted($isDeleted)
    {
        $this->is_deleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return int
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }
/**
 * Set lead_time_from.
 *
 * @param int $lead_time_from
 *
 * @return SpecialPricingData
 */
    public function setLeadTimeFrom($lead_time_from)
    {
        $this->lead_time_from = $lead_time_from;

        return $this;
    }

    /**
     * Get lead_time_from.
     *
     * @return int
     */
    public function getLeadTimeFrom()
    {
        return $this->lead_time_from;
    }

    /**
     * Set lead_time_to.
     *
     * @param int $lead_time_to
     *
     * @return SpecialPricingData
     */
    public function setLeadTimeTo($lead_time_to)
    {
        $this->lead_time_to = $lead_time_to;

        return $this;
    }

    /**
     * Get lead_time_to.
     *
     * @return int
     */
    public function getLeadTimeTo()
    {
        return $this->lead_time_to;
    }

    /**
     * Set createdBy.
     *
     * @param \OAuth\Entity\User|null $createdBy
     *
     * @return SpecialPricingData
     */
    public function setCreatedBy(\OAuth\Entity\User $createdBy = null)
    {
        $this->created_by = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * Set specialPricing.
     *
     * @param \PricingSpecial\Entity\SpecialPricing|null $specialPricing
     *
     * @return SpecialPricingData
     */
    public function setSpecialPricing(\PricingSpecial\Entity\SpecialPricing $specialPricing = null)
    {
        $this->special_pricing = $specialPricing;

        return $this;
    }

    /**
     * Get specialPricing.
     *
     * @return \PricingSpecial\Entity\SpecialPricing|null
     */
    public function getSpecialPricing()
    {
        return $this->special_pricing;
    }

    /**
     * Set specialRangeWeight.
     *
     * @param \PricingSpecial\Entity\SpecialRangeWeight|null $specialRangeWeight
     *
     * @return SpecialPricingData
     */
    public function setSpecialRangeWeight(\PricingSpecial\Entity\SpecialRangeWeight $specialRangeWeight = null)
    {
        $this->special_range_weight = $specialRangeWeight;

        return $this;
    }

    /**
     * Get specialRangeWeight.
     *
     * @return \PricingSpecial\Entity\SpecialRangeWeight|null
     */
    public function getSpecialRangeWeight()
    {
        return $this->special_range_weight;
    }

    /**
     * Set updatedBy.
     *
     * @param \OAuth\Entity\User|null $updatedBy
     *
     * @return SpecialPricingData
     */
    public function setUpdatedBy(\OAuth\Entity\User $updatedBy = null)
    {
        $this->updated_by = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }
}
