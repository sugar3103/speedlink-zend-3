<?php

namespace PricingSpecial\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SpecialPricing
 *
 * @ORM\Table(name="special_pricing", indexes={@ORM\Index(name="carrier_special_pricing_carrier_id_fk", columns={"carrier_id"}), @ORM\Index(name="service_special_pricing_service_id_fk", columns={"service_id"}), @ORM\Index(name="customer_special_pricing_customer_id", columns={"customer_id"}), @ORM\Index(name="created_special_pricing_created_by_fk", columns={"created_by"}), @ORM\Index(name="category_special_pricing_category_id_fk", columns={"category_id"}), @ORM\Index(name="saleman_special_pricing_salemane_id_fk", columns={"saleman_id"}), @ORM\Index(name="approved_special_pricing_approved_by_fk", columns={"approved_by"}), @ORM\Index(name="updated_special_pricing_updated_by", columns={"updated_by"})})
 * @ORM\Entity(repositoryClass="\PricingSpecial\Repository\PricingSpecialRepository")
 */
class SpecialPricing
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
     * @var \DateTime|null
     *
     * @ORM\Column(name="effected_date", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $effected_date;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="expired_date", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $expired_date;

    /**
     * @var float|null
     *
     * @ORM\Column(name="total_ras", type="float", precision=10, scale=0, nullable=true, unique=false)
     */
    private $total_ras;

    /**
     * @var int|null
     *
     * @ORM\Column(name="status", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $status;

    /**
     * @var int|null
     *
     * @ORM\Column(name="approval_status", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $approval_status;

    /**
     * @var int|null
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $is_deleted = 0;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $created_at;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_at;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="approved_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $approved_by;

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
     * @return SpecialPricing
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
     * Set effectedDate.
     *
     * @param \DateTime|null $effectedDate
     *
     * @return SpecialPricing
     */
    public function setEffectedDate($effectedDate = null)
    {
        $this->effected_date = $effectedDate;

        return $this;
    }

    /**
     * Get effectedDate.
     *
     * @return \DateTime|null
     */
    public function getEffectedDate()
    {
        return $this->effected_date;
    }

    /**
     * Set expiredDate.
     *
     * @param \DateTime|null $expiredDate
     *
     * @return SpecialPricing
     */
    public function setExpiredDate($expiredDate = null)
    {
        $this->expired_date = $expiredDate;

        return $this;
    }

    /**
     * Get expiredDate.
     *
     * @return \DateTime|null
     */
    public function getExpiredDate()
    {
        return $this->expired_date;
    }

    /**
     * Set totalRas.
     *
     * @param float|null $totalRas
     *
     * @return SpecialPricing
     */
    public function setTotalRas($totalRas = null)
    {
        $this->total_ras = $totalRas;

        return $this;
    }

    /**
     * Get totalRas.
     *
     * @return float|null
     */
    public function getTotalRas()
    {
        return $this->total_ras;
    }

    /**
     * Set status.
     *
     * @param int|null $status
     *
     * @return SpecialPricing
     */
    public function setStatus($status = null)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return int|null
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set approvalStatus.
     *
     * @param int|null $approvalStatus
     *
     * @return SpecialPricing
     */
    public function setApprovalStatus($approvalStatus = null)
    {
        $this->approval_status = $approvalStatus;

        return $this;
    }

    /**
     * Get approvalStatus.
     *
     * @return int|null
     */
    public function getApprovalStatus()
    {
        return $this->approval_status;
    }

    /**
     * Set isDeleted.
     *
     * @param int|null $isDeleted
     *
     * @return SpecialPricing
     */
    public function setIsDeleted($isDeleted = null)
    {
        $this->is_deleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return int|null
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime|null $createdAt
     *
     * @return SpecialPricing
     */
    public function setCreatedAt($createdAt = null)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime|null
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime|null $updatedAt
     *
     * @return SpecialPricing
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
     * Set approved_by.
     *
     * @param \OAuth\Entity\User|null $approved_by
     *
     * @return SpecialPricing
     */
    public function setApprovedBy(\OAuth\Entity\User $approved_by = null)
    {
        $this->approved_by = $approved_by;

        return $this;
    }

    /**
     * Get approved_by.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getApprovedBy()
    {
        return $this->approved_by;
    }

    /**
     * Set carrier.
     *
     * @param \ServiceShipment\Entity\Carrier|null $carrier
     *
     * @return SpecialPricing
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
     * @return SpecialPricing
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
     * Set createdBy.
     *
     * @param \OAuth\Entity\User|null $createdBy
     *
     * @return SpecialPricing
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
     * Set customer.
     *
     * @param \Customer\Entity\Customer|null $customer
     *
     * @return SpecialPricing
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
     * Set saleman.
     *
     * @param \OAuth\Entity\User|null $saleman
     *
     * @return SpecialPricing
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
     * @return SpecialPricing
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
     * Set updatedBy.
     *
     * @param \OAuth\Entity\User|null $updatedBy
     *
     * @return SpecialPricing
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
