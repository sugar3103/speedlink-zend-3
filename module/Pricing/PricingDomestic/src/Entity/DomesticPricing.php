<?php

namespace PricingDomestic\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticPricing
 *
 * @ORM\Table(name="domestic_pricing", uniqueConstraints={@ORM\UniqueConstraint(name="unique_name", columns={"name"}), @ORM\UniqueConstraint(name="unique_name_en", columns={"name_en"})}, indexes={@ORM\Index(name="carrier_domestic_pricing_carrier_id_fk", columns={"carrier_id"}), @ORM\Index(name="service_domestic_pricing_service_id_fk", columns={"service_id"}), @ORM\Index(name="customer_domestic_pricing_customer_id_fk", columns={"customer_id"}), @ORM\Index(name="updated_domestic_pricing_updated_by_fk", columns={"updated_by"}), @ORM\Index(name="category_domestic_pricing_category_id_fk", columns={"category_id"}), @ORM\Index(name="saleman_domestic_pricing_saleman_id_fk", columns={"saleman_id"}), @ORM\Index(name="created_domestic_pricing_created_by_fk", columns={"created_by"})})
 * @ORM\Entity(repositoryClass="\PricingDomestic\Repository\DomesticPricingRepository")
 */
class DomesticPricing
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
     * @var \DateTime
     *
     * @ORM\Column(name="effected_date", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $effected_date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expired_date", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $expired_date;

    /**
     * @var int
     *
     * @ORM\Column(name="is_private", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_private;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", precision=0, scale=0, nullable=false, options={"default"="1"}, unique=false)
     */
    private $status = '1';

    /**
     * @var int
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted = 0;

    /**
     * @var int
     *
     * @ORM\Column(name="approval_status", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $approval_status;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="approval_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $approval_by;

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
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="customer_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $customer;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="saleman_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $saleman;

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
     * @return DomesticPricing
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
     * @return DomesticPricing
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
     * Set effected_date.
     *
     * @param \DateTime $effected_date
     *
     * @return DomesticPricing
     */
    public function setEffectedDate($effected_date)
    {
        $this->effected_date = $effected_date;

        return $this;
    }

    /**
     * Get effected_date.
     *
     * @return \DateTime
     */
    public function getEffectedDate()
    {
        return $this->effected_date;
    }

    /**
     * Set expired_date.
     *
     * @param \DateTime $expired_date
     *
     * @return DomesticPricing
     */
    public function setExpiredDate($expired_date)
    {
        $this->expired_date = $expired_date;

        return $this;
    }

    /**
     * Get expired_date.
     *
     * @return \DateTime
     */
    public function getExpiredDate()
    {
        return $this->expired_date;
    }

    /**
     * Set is_private.
     *
     * @param int $is_private
     *
     * @return DomesticPricing
     */
    public function setIsPrivate($is_private)
    {
        $this->is_private = $is_private;

        return $this;
    }

    /**
     * Get is_private.
     *
     * @return int
     */
    public function getIsPrivate()
    {
        return $this->is_private;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return DomesticPricing
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
     * Set is_deleted.
     *
     * @param int $is_deleted
     *
     * @return DomesticPricing
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
     * Set approval_status.
     *
     * @param int $approval_status
     *
     * @return DomesticPricing
     */
    public function setApprovalStatus($approval_status)
    {
        $this->approval_status = $approval_status;

        return $this;
    }

    /**
     * Get approval_status.
     *
     * @return int
     */
    public function getApprovalStatus()
    {
        return $this->approval_status;
    }
    
    /**
     * Set approval_by.
     *
     * @param \OAuth\Entity\User|null $approval_by
     *
     * @return DomesticPricing
     */
    public function setApprovalBy(\OAuth\Entity\User $approval_by = null)
    {
        $this->approval_by = $approval_by;

        return $this;
    }

    /**
     * Get approval_by.
     *
     * @return \OAuth\Entity\User
     */
    public function getApprovalBy()
    {
        return $this->approval_by;
    }

    /**
     * Set created_at.
     *
     * @param \DateTime $created_at
     *
     * @return DomesticPricing
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
     * @return DomesticPricing
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
     * Set carrier.
     *
     * @param \ServiceShipment\Entity\Carrier|null $carrier
     *
     * @return DomesticPricing
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
     * @return DomesticPricing
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
     * @return DomesticPricing
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
     * @param \OAuth\Entity\User|null $customer
     *
     * @return DomesticPricing
     */
    public function setCustomer(\OAuth\Entity\User $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set saleman.
     *
     * @param \OAuth\Entity\User|null $saleman
     *
     * @return DomesticPricing
     */
    public function setSaleman(\OAuth\Entity\User $saleman = null)
    {
        $this->saleman = $saleman;

        return $this;
    }

    /**
     * Get saleman.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getSaleman()
    {
        return $this->saleman;
    }

    /**
     * Set service.
     *
     * @param \ServiceShipment\Entity\Service|null $service
     *
     * @return DomesticPricing
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
     * Set updated_by.
     *
     * @param \OAuth\Entity\User|null $updated_by
     *
     * @return DomesticPricing
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
