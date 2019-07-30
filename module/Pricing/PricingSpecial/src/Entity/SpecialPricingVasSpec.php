<?php

namespace PricingSpecial\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SpecialPricingVasSpec
 *
 * @ORM\Table(name="special_pricing_vas_spec", indexes={@ORM\Index(name="special_pricing_special_pricing_vas_spec_fk", columns={"special_pricing_id"}), @ORM\Index(name="created_special_pricing_vas_spec_fk", columns={"created_by"}), @ORM\Index(name="special_pricing_vas_special_pricing_vas_spec_fk", columns={"special_pricing_vas_id"}), @ORM\Index(name="updated_special_pricing_vas_spec_fk", columns={"updated_by"})})
 * @ORM\Entity(repositoryClass="\PricingSpecial\Repository\PricingSpecialVasSpecRepository")
 */
class SpecialPricingVasSpec
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
     * @var float
     *
     * @ORM\Column(name="value", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $value;

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
     * @var \PricingSpecial\Entity\SpecialPricingVas
     *
     * @ORM\ManyToOne(targetEntity="PricingSpecial\Entity\SpecialPricingVas")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="special_pricing_vas_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $special_pricing_vas;

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
     * Set from.
     *
     * @param float $from
     *
     * @return SpecialPricingVasSpec
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
     * @return SpecialPricingVasSpec
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
     * Set value.
     *
     * @param float $value
     *
     * @return SpecialPricingVasSpec
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
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return SpecialPricingVasSpec
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
     * @return SpecialPricingVasSpec
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
     * @return SpecialPricingVasSpec
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
     * Set createdBy.
     *
     * @param \OAuth\Entity\User|null $createdBy
     *
     * @return SpecialPricingVasSpec
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
     * @return SpecialPricingVasSpec
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
     * Set special_pricing_vas.
     *
     * @param \PricingSpecial\Entity\SpecialPricingVas|null $special_pricing_vas
     *
     * @return SpecialPricingVasSpec
     */
    public function setSpecialPricingVas(\PricingSpecial\Entity\SpecialPricingVas $special_pricing_vas = null)
    {
        $this->special_pricing_vas = $special_pricing_vas;

        return $this;
    }

    /**
     * Get special_pricing_vas.
     *
     * @return \PricingSpecial\Entity\SpecialPricingVas|null
     */
    public function getSpecialPricingVas()
    {
        return $this->special_pricing_vas;
    }

    /**
     * Set updatedBy.
     *
     * @param \OAuth\Entity\User|null $updatedBy
     *
     * @return SpecialPricingVasSpec
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
