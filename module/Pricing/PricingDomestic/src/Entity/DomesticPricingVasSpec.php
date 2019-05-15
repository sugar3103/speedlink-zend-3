<?php

namespace PricingDomestic\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticPricingVasSpec
 *
 * @ORM\Table(name="domestic_pricing_vas_spec", indexes={@ORM\Index(name="created_domestic_pricing_vas_spec_created_by_fk", columns={"created_by"}), @ORM\Index(name="domestic_pricing_domestic_pricing_vas_spec_pricing_id_fk", columns={"domestic_pricing_id"}), @ORM\Index(name="updated_domestic_pricing_vas_spec_updated_by_fk", columns={"updated_by"}), @ORM\Index(name="domestic_pricing_vas_domestic_pricing_vas_spec_pricing_vas_id_fk", columns={"domestic_pricing_vas_id"})})
 * @ORM\Entity(repositoryClass="\PricingDomestic\Repository\DomesticPricingVasSpecRepository")
 */
class DomesticPricingVasSpec
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
     * @ORM\Column(name="`from`", type="decimal", precision=2, scale=0, nullable=false, unique=false)
     */
    private $from;

    /**
     * @var string
     *
     * @ORM\Column(name="`to`", type="decimal", precision=2, scale=0, nullable=false, unique=false)
     */
    private $to;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="decimal", precision=2, scale=0, nullable=false, unique=false)
     */
    private $value;

    /**
     * @var int
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted;

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
     * @var \PricingDomestic\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="PricingDomestic\Entity\User")
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
     * @var \PricingDomestic\Entity\DomesticPricingVas
     *
     * @ORM\ManyToOne(targetEntity="PricingDomestic\Entity\DomesticPricingVas")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="domestic_pricing_vas_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $domestic_pricing_vas;

    /**
     * @var \PricingDomestic\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="PricingDomestic\Entity\User")
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
     * Set from.
     *
     * @param string $from
     *
     * @return DomesticPricingVasSpec
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
     * @return DomesticPricingVasSpec
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
     * Set value.
     *
     * @param string $value
     *
     * @return DomesticPricingVasSpec
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
     * @return DomesticPricingVasSpec
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
     * Set created_at.
     *
     * @param \DateTime $created_at
     *
     * @return DomesticPricingVasSpec
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
     * @return DomesticPricingVasSpec
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
     * @param \PricingDomestic\Entity\User|null $created_by
     *
     * @return DomesticPricingVasSpec
     */
    public function setCreatedBy(\PricingDomestic\Entity\User $created_by = null)
    {
        $this->created_by = $created_by;

        return $this;
    }

    /**
     * Get created_by.
     *
     * @return \PricingDomestic\Entity\User|null
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
     * @return DomesticPricingVasSpec
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
     * Set domestic_pricing_vas.
     *
     * @param \PricingDomestic\Entity\DomesticPricingVas|null $domestic_pricing_vas
     *
     * @return DomesticPricingVasSpec
     */
    public function setDomesticPricingVas(\PricingDomestic\Entity\DomesticPricingVas $domestic_pricing_vas = null)
    {
        $this->domestic_pricing_vas = $domestic_pricing_vas;

        return $this;
    }

    /**
     * Get domestic_pricing_vas.
     *
     * @return \PricingDomestic\Entity\DomesticPricingVas|null
     */
    public function getDomesticPricingVas()
    {
        return $this->domestic_pricing_vas;
    }

    /**
     * Set updated_by.
     *
     * @param \PricingDomestic\Entity\User|null $updated_by
     *
     * @return DomesticPricingVasSpec
     */
    public function setUpdatedBy(\PricingDomestic\Entity\User $updated_by = null)
    {
        $this->updated_by = $updated_by;

        return $this;
    }

    /**
     * Get updated_by.
     *
     * @return \PricingDomestic\Entity\User|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }
}
