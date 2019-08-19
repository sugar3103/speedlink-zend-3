<?php

namespace PricingSpecial\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SpecialPricingVas
 *
 * @ORM\Table(name="special_pricing_vas", indexes={@ORM\Index(name="special_pricing_special_pricing_vas_fk", columns={"special_pricing_id"}), @ORM\Index(name="updated_special_pricing_vas_fk", columns={"updated_by"}), @ORM\Index(name="created_special_pricing_vas_id", columns={"created_by"})})
 * @ORM\Entity(repositoryClass="\PricingSpecial\Repository\PricingSpecialVasRepository")
 */
class SpecialPricingVas
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
     * @ORM\Column(name="name", type="string", length=11, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="formula", type="text", length=65535, precision=0, scale=0, nullable=false, unique=false)
     */
    private $formula;

    /**
     * @var float
     *
     * @ORM\Column(name="min", type="float", precision=10, scale=0, nullable=false, unique=false)
     */
    private $min;

    /**
     * @var int
     *
     * @ORM\Column(name="type", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $type;

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
     * @return SpecialPricingVas
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
     * Set formula.
     *
     * @param string $formula
     *
     * @return SpecialPricingVas
     */
    public function setFormula($formula)
    {
        $this->formula = $formula;

        return $this;
    }

    /**
     * Get formula.
     *
     * @return string
     */
    public function getFormula()
    {
        return $this->formula;
    }

    /**
     * Set min.
     *
     * @param float $min
     *
     * @return SpecialPricingVas
     */
    public function setMin($min)
    {
        $this->min = $min;

        return $this;
    }

    /**
     * Get min.
     *
     * @return float
     */
    public function getMin()
    {
        return $this->min;
    }

    /**
     * Set type.
     *
     * @param int $type
     *
     * @return SpecialPricingVas
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return SpecialPricingVas
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
     * @return SpecialPricingVas
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
     * @param int $is_deleted
     *
     * @return SpecialPricingVas
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
     * Set createdBy.
     *
     * @param \OAuth\Entity\User|null $createdBy
     *
     * @return SpecialPricingVas
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
     * @return SpecialPricingVas
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
     * Set updatedBy.
     *
     * @param \OAuth\Entity\User|null $updatedBy
     *
     * @return SpecialPricingVas
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
