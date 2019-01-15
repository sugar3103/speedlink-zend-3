<?php

namespace CustomerService\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ShipmentType
 *
 * @ORM\Table(name="shipment_type")
 * @ORM\Entity(repositoryClass="\CustomerService\Repository\ShipmentTypeRepository")
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
    private $nameEn;

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
    private $descriptionEn;

    /**
     * @var string|null
     *
     * @ORM\Column(name="code", type="string", length=50, precision=0, scale=0, nullable=true, options={"fixed"=true}, unique=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $carrierId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="category_code", type="string", length=50, precision=0, scale=0, nullable=true, options={"fixed"=true}, unique=false)
     */
    private $categoryCode;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $serviceId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="product_type_code", type="string", length=50, precision=0, scale=0, nullable=true, options={"fixed"=true}, unique=false)
     */
    private $productTypeCode;

    /**
     * @var int|null
     *
     * @ORM\Column(name="volumetric_number", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $volumetricNumber;

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
    private $isDeleted = 0;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updatedAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updatedBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, options={"default"="0000-00-00 00:00:00"}, unique=false)
     */
    private $createdAt = '0000-00-00 00:00:00';

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $createdBy;

    /**
     *
     * @ORM\OneToOne(targetEntity="\CustomerService\Entity\Carrier", inversedBy="shipment_type")
     * @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", nullable=true)
     */
    private $joinCarrier;

    /**
     *
     * @ORM\OneToOne(targetEntity="\CustomerService\Entity\Service", inversedBy="shipment_type")
     * @ORM\JoinColumn(name="service_id", referencedColumnName="id", nullable=true)
     */
    private $joinService;


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
        $this->nameEn = $nameEn;

        return $this;
    }

    /**
     * Get nameEn.
     *
     * @return string|null
     */
    public function getNameEn()
    {
        return $this->nameEn;
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
        $this->descriptionEn = $descriptionEn;

        return $this;
    }

    /**
     * Get descriptionEn.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->descriptionEn;
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
     * Set carrierId.
     *
     * @param int $carrierId
     *
     * @return ShipmentType
     */
    public function setCarrierId($carrierId)
    {
        $this->carrierId = $carrierId;

        return $this;
    }

    /**
     * Get carrierId.
     *
     * @return int
     */
    public function getCarrierId()
    {
        return $this->carrierId;
    }

    /**
     * Set categoryCode.
     *
     * @param int $categoryCode
     *
     * @return ShipmentType
     */
    public function setCategoryCode($categoryCode)
    {
        $this->categoryCode = $categoryCode;

        return $this;
    }

    /**
     * Get categoryCode.
     *
     * @return int
     */
    public function getCategoryCode()
    {
        return $this->categoryCode;
    }

    /**
     * Set serviceId.
     *
     * @param int $serviceId
     *
     * @return ShipmentType
     */
    public function setServiceId($serviceId)
    {
        $this->serviceId = $serviceId;

        return $this;
    }

    /**
     * Get serviceId.
     *
     * @return int
     */
    public function getServiceId()
    {
        return $this->serviceId;
    }

    /**
     * Set productTypeCode.
     *
     * @param int $productTypeCode
     *
     * @return ShipmentType
     */
    public function setProductTypeCode($productTypeCode)
    {
        $this->productTypeCode = $productTypeCode;

        return $this;
    }

    /**
     * Get productTypeCode.
     *
     * @return int
     */
    public function getProductTypeCode()
    {
        return $this->productTypeCode;
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
        $this->volumetricNumber = $volumetricNumber;

        return $this;
    }

    /**
     * Get volumetricNumber.
     *
     * @return int|null
     */
    public function getVolumetricNumber()
    {
        return $this->volumetricNumber;
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
        $this->isDeleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return bool
     */
    public function getIsDeleted()
    {
        return $this->isDeleted;
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
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
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
        $this->updatedBy = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updatedBy;
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
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
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
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * @return mixed
     */
    public function getJoinCarrier()
    {
        return $this->joinCarrier;
    }

    /**
     * @param mixed $joinCarrier
     */
    public function setJoinCarrier($joinCarrier)
    {
        $this->joinCarrier = $joinCarrier;
    }

    /**
     * @return mixed
     */
    public function getJoinService()
    {
        return $this->joinService;
    }

    /**
     * @param mixed $joinService
     */
    public function setJoinService($joinService)
    {
        $this->joinService = $joinService;
    }
}
