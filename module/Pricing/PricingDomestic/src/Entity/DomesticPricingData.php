<?php

namespace PricingDomestic\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticPricingData
 *
 * @ORM\Table(name="domestic_pricing_data", indexes={@ORM\Index(name="created_domestic_pricing_data_created_by_fk", columns={"created_by"}), @ORM\Index(name="domestic_pricing_domestic_pricing_data_pricing_id_fk", columns={"domestic_pricing_id"}), @ORM\Index(name="updated_domestic_pricing_data_updated_by_fk", columns={"updated_by"}), @ORM\Index(name="domestic_range_weight_domestic_pricing_data_range_weight_id_fk", columns={"domestic_range_weight_id"})})
 * @ORM\Entity
 */
class DomesticPricingData
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
     * @ORM\Column(name="value", type="float", nullable=false, unique=false)
     */
    private $value;

    /**
     * @var int
     *
     * @ORM\Column(name="`type`", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $type = 0;

    /**
     * @var string
     *
     * @ORM\Column(name="type_value", type="float", nullable=false, unique=false)
     */
    private $type_value;

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
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, options={"default"="CURRENT_TIMESTAMP"}, unique=false)
     */
    private $created_at = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=false, options={"default"="CURRENT_TIMESTAMP"}, unique=false)
     */
    private $updated_at = 'CURRENT_TIMESTAMP';

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
     * @var \PricingDomestic\Entity\DomesticPricing
     *
     * @ORM\ManyToOne(targetEntity="PricingDomestic\Entity\DomesticPricing")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="domestic_pricing_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $domestic_pricing;

    /**
     * @var \PricingDomestic\Entity\DomesticRangeWeight
     *
     * @ORM\ManyToOne(targetEntity="PricingDomestic\Entity\DomesticRangeWeight")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="domestic_range_weight_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $domestic_range_weight;

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
     * @param string $value
     *
     * @return DomesticPricingData
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value.
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set is_deleted.
     *
     * @param int $is_deleted
     *
     * @return DomesticPricingData
     */
    public function setIsDeleted($is_deleted)
    {
        $this->is_deleted = $is_deleted;

        return $this;
    }

    /**
     * Get is_deleted.
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
     * @return DomesticPricingData
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
     * @return DomesticPricingData
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
     * Set created_at.
     *
     * @param \DateTime $created_at
     *
     * @return DomesticPricingData
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * Get created_at.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updated_at.
     *
     * @param \DateTime $updated_at
     *
     * @return DomesticPricingData
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * Get updated_at.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set created_by.
     *
     * @param \OAuth\Entity\User|null $created_by
     *
     * @return DomesticPricingData
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
     * Set domestic_pricing.
     *
     * @param \PricingDomestic\Entity\DomesticPricing|null $domestic_pricing
     *
     * @return DomesticPricingData
     */
    public function setDomesticPricing(\PricingDomestic\Entity\DomesticPricing $domestic_pricing = null)
    {
        $this->domestic_pricing = $domestic_pricing;

        return $this;
    }

    /**
     * Get domestic_pricing.
     *
     * @return \PricingDomestic\Entity\DomesticPricing|null
     */
    public function getDomesticPricing()
    {
        return $this->domestic_pricing;
    }

    /**
     * Set domestic_range_weight.
     *
     * @param \PricingDomestic\Entity\DomesticRangeWeight|null $domestic_range_weight
     *
     * @return DomesticPricingData
     */
    public function setDomesticRangeWeight(\PricingDomestic\Entity\DomesticRangeWeight $domestic_range_weight = null)
    {
        $this->domestic_range_weight = $domestic_range_weight;

        return $this;
    }

    /**
     * Get domestic_range_weight.
     *
     * @return \PricingDomestic\Entity\DomesticRangeWeight|null
     */
    public function getDomesticRangeWeight()
    {
        return $this->domestic_range_weight;
    }

    /**
     * Set updated_by.
     *
     * @param \OAuth\Entity\User|null $updated_by
     *
     * @return DomesticPricingData
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

    public function setType($type)
    {
        $this->type = $type;
    }
    
    public function getType()
    {
        return $this->type;
    }

    public function setTypeValue($type_value) {
        $this->type_value = $type_value;
    }
    
    public function getTypeValue() {
        return $this->type_value;
    }
}
