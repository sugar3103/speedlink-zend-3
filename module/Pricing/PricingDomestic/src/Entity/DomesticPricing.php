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
     * @var float
     *
     * @ORM\Column(name="total_ras", type="float", precision=0, scale=0, nullable=false, unique=false)
     */
    private $total_ras = 0;


    /**
     * @var int
     *
     * @ORM\Column(name="approval_status", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $approval_status;

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
     *   @ORM\JoinColumn(name="approval_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $approval_by;

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
     * Set effectedDate.
     *
     * @param \DateTime $effectedDate
     *
     * @return DomesticPricing
     */
    public function setEffectedDate($effectedDate)
    {
        $this->effected_date = $effectedDate;

        return $this;
    }

    /**
     * Get effectedDate.
     *
     * @return \DateTime
     */
    public function getEffectedDate()
    {
        return $this->effected_date;
    }

    /**
     * Set expiredDate.
     *
     * @param \DateTime $expiredDate
     *
     * @return DomesticPricing
     */
    public function setExpiredDate($expiredDate)
    {
        $this->expired_date = $expiredDate;

        return $this;
    }

    /**
     * Get expiredDate.
     *
     * @return \DateTime
     */
    public function getExpiredDate()
    {
        return $this->expired_date;
    }

    /**
     * Set isPrivate.
     *
     * @param int $isPrivate
     *
     * @return DomesticPricing
     */
    public function setIsPrivate($isPrivate)
    {
        $this->is_private = $isPrivate;

        return $this;
    }

    /**
     * Get isPrivate.
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
     * Set isDeleted.
     *
     * @param int $isDeleted
     *
     * @return DomesticPricing
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
     * Set approvalStatus.
     *
     * @param int $approvalStatus
     *
     * @return DomesticPricing
     */
    public function setApprovalStatus($approvalStatus)
    {
        $this->approval_status = $approvalStatus;

        return $this;
    }

    /**
     * Get approvalStatus.
     *
     * @return int
     */
    public function getApprovalStatus()
    {
        return $this->approval_status;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return DomesticPricing
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
     * @return DomesticPricing
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
     * Set approvalBy.
     *
     * @param \OAuth\Entity\User|null $approvalBy
     *
     * @return DomesticPricing
     */
    public function setApprovalBy(\OAuth\Entity\User $approvalBy = null)
    {
        $this->approval_by = $approvalBy;

        return $this;
    }

    /**
     * Get approvalBy.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getApprovalBy()
    {
        return $this->approval_by;
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
     * Set createdBy.
     *
     * @param \OAuth\Entity\User|null $createdBy
     *
     * @return DomesticPricing
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
     * @return DomesticPricing
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
     * Set updatedBy.
     *
     * @param \OAuth\Entity\User|null $updatedBy
     *
     * @return DomesticPricing
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

    /**
     * Set TotalRas
     * 
     * @return Float
     */

    public function setTotalRas($total_ras) {
        $this->total_ras = $total_ras;
        return $this;
    }

    /**
     * Get TotalRas
     */

    public function getTotalRas()
    {
        return $this->total_ras;
    }
}
