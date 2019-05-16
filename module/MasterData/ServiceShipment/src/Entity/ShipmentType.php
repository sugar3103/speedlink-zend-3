<?php

namespace ServiceShipment\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ShipmentType
 *
 * @ORM\Table(name="shipment_type")
 * @ORM\Entity(repositoryClass="\ServiceShipment\Repository\ShipmentTypeRepository")
 */
class ShipmentType
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
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=50, precision=0, scale=0, nullable=true, unique=false)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name_en", type="string", length=50, precision=0, scale=0, nullable=true, unique=false)
     */
    private $name_en;

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
     * @var string|null
     *
     * @ORM\Column(name="code", type="string", length=50, precision=0, scale=0, nullable=true, options={"fixed"=true}, unique=false)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="product_type_code", type="string", length=10, precision=0, scale=0, nullable=false, options={"fixed"=true,"comment"="Dox, Parcel"}, unique=false)
     */
    private $product_type_code;

    /**
     * @var int|null
     *
     * @ORM\Column(name="volumetric_number", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $volumetric_number;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $status;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, options={"default"="0000-00-00 00:00:00"}, unique=false)
     */
    private $created_at = '0000-00-00 00:00:00';

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $created_by;

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
     * @ORM\OneToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="created_by", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $join_created;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\OneToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="updated_by", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $join_updated;


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
     * @param string|null $name
     *
     * @return ShipmentType
     */
    public function setName($name = null)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set nameEn.
     *
     * @param string|null $nameEn
     *
     * @return ShipmentType
     */
    public function setNameEn($nameEn = null)
    {
        $this->name_en = $nameEn;

        return $this;
    }

    /**
     * Get nameEn.
     *
     * @return string|null
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return ShipmentType
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
     * Set descriptionEn.
     *
     * @param string|null $descriptionEn
     *
     * @return ShipmentType
     */
    public function setDescriptionEn($descriptionEn = null)
    {
        $this->description_en = $descriptionEn;

        return $this;
    }

    /**
     * Get descriptionEn.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * Set code.
     *
     * @param string|null $code
     *
     * @return ShipmentType
     */
    public function setCode($code = null)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code.
     *
     * @return string|null
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set productTypeCode.
     *
     * @param string $productTypeCode
     *
     * @return ShipmentType
     */
    public function setProductTypeCode($productTypeCode)
    {
        $this->product_type_code = $productTypeCode;

        return $this;
    }

    /**
     * Get productTypeCode.
     *
     * @return string
     */
    public function getProductTypeCode()
    {
        return $this->product_type_code;
    }

    /**
     * Set volumetricNumber.
     *
     * @param int|null $volumetricNumber
     *
     * @return ShipmentType
     */
    public function setVolumetricNumber($volumetricNumber = null)
    {
        $this->volumetric_number = $volumetricNumber;

        return $this;
    }

    /**
     * Get volumetricNumber.
     *
     * @return int|null
     */
    public function getVolumetricNumber()
    {
        return $this->volumetric_number;
    }

    /**
     * Set status.
     *
     * @param bool $status
     *
     * @return ShipmentType
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return bool
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set isDeleted.
     *
     * @param bool $isDeleted
     *
     * @return ShipmentType
     */
    public function setIsDeleted($isDeleted)
    {
        $this->is_deleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return bool
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime|null $updatedAt
     *
     * @return ShipmentType
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
     * Set updatedBy.
     *
     * @param int|null $updatedBy
     *
     * @return ShipmentType
     */
    public function setUpdatedBy($updatedBy = null)
    {
        $this->updated_by = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return ShipmentType
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
     * Set createdBy.
     *
     * @param int $createdBy
     *
     * @return ShipmentType
     */
    public function setCreatedBy($createdBy)
    {
        $this->created_by = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * Set carrier.
     *
     * @param \ServiceShipment\Entity\Carrier|null $carrier
     *
     * @return ShipmentType
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
     * @return ShipmentType
     */
    public function setCategory(\ServiceShipment\Entity\Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category.
     *
     * @return \ServiceShipment\Entity\Service|null
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set service.
     *
     * @param \ServiceShipment\Entity\Service|null $service
     *
     * @return ShipmentType
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
     * Set joinCreated.
     *
     * @param \OAuth\Entity\User|null $joinCreated
     *
     * @return ShipmentType
     */
    public function setJoinCreated(\OAuth\Entity\User $joinCreated = null)
    {
        $this->join_created = $joinCreated;

        return $this;
    }

    /**
     * Get joinCreated.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getJoinCreated()
    {
        return $this->join_created;
    }

    /**
     * Set joinUpdated.
     *
     * @param \OAuth\Entity\User|null $joinUpdated
     *
     * @return ShipmentType
     */
    public function setJoinUpdated(\OAuth\Entity\User $joinUpdated = null)
    {
        $this->join_updated = $joinUpdated;

        return $this;
    }

    /**
     * Get joinUpdated.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getJoinUpdated()
    {
        return $this->join_updated;
    }
}
