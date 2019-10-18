<?php

namespace PricingDomestic\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticPricingVas
 *
 * @ORM\Table(name="domestic_pricing_vas", uniqueConstraints={@ORM\UniqueConstraint(name="unique_name", columns={"name"}), @ORM\UniqueConstraint(name="unique_name_en", columns={"name_en"})}, indexes={@ORM\Index(name="domestic_pricing_domestic_pricing_vas_pricing_id_fk", columns={"domestic_pricing_id"}), @ORM\Index(name="updated_domestic_pricing_vas_updated_by_fk", columns={"updated_by"}), @ORM\Index(name="created_domestic_pricing_vas_created_by_fk", columns={"created_by"})})
 * @ORM\Entity(repositoryClass="\PricingDomestic\Repository\DomesticPricingVasRepository")
 */
class DomesticPricingVas
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
     * @var string
     *
     * @ORM\Column(name="formula", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $formula;

    /**
     * @var string
     *
     * @ORM\Column(name="min", type="float", nullable=false, unique=false)
     */
    private $min = 0;

    /**
     * @var int
     *
     * @ORM\Column(name="`type`", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $type;

    /**
     * @var int
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted = 0;

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
    private $update_at = 'CURRENT_TIMESTAMP';

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
     * @return DomesticPricingVas
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
     * @return DomesticPricingVas
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
     * Set formula.
     *
     * @param string $formula
     *
     * @return DomesticPricingVas
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
     * @param string $min
     *
     * @return DomesticPricingVas
     */
    public function setMin($min)
    {
        $this->min = $min;

        return $this;
    }

    /**
     * Get min.
     *
     * @return string
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
     * @return DomesticPricingVas
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
     * Set is_deleted.
     *
     * @param int $is_deleted
     *
     * @return DomesticPricingVas
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
     * @return DomesticPricingVas
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
     * Set update_at.
     *
     * @param \DateTime $update_at
     *
     * @return DomesticPricingVas
     */
    public function setUpdatedAt($update_at)
    {
        $this->update_at = $update_at;

        return $this;
    }

    /**
     * Get update_at.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->update_at;
    }

    /**
     * Set created_by.
     *
     * @param \OAuth\Entity\User|null $created_by
     *
     * @return DomesticPricingVas
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
     * @return DomesticPricingVas
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
     * Set updated_by.
     *
     * @param \OAuth\Entity\User|null $updated_by
     *
     * @return DomesticPricingVas
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
