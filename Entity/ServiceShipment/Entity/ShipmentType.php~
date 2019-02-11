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
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $carrier_id;

    /**
     * @var int
     *
     * @ORM\Column(name="category_code", type="integer", precision=0, scale=0, nullable=false, options={"comment"="Inbound, Outbound, Domestic"}, unique=false)
     */
    private $category_code;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $service_id;

    /**
     * @var int
     *
     * @ORM\Column(name="product_type_code", type="integer", precision=0, scale=0, nullable=false, options={"comment"="Dox, Parcel"}, unique=false)
     */
    private $product_type_code;

    /**
     * @var int|null
     *
     * @ORM\Column(name="volumetric_number", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $volumetric_number;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $status;

    /**
     * @var int
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=false, unique=false)
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
     * @ORM\OneToOne(targetEntity="ServiceShipment\Entity\Carrier", inversedBy="shipment_type")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $join_carrier;

    /**
     * @var \ServiceShipment\Entity\Service
     *
     * @ORM\OneToOne(targetEntity="ServiceShipment\Entity\Service", inversedBy="shipment_type")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="service_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $join_service;


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
     * Set carrierId.
     *
     * @param int $carrierId
     *
     * @return ShipmentType
     */
    public function setCarrierId($carrierId)
    {
        $this->carrier_id = $carrierId;

        return $this;
    }

    /**
     * Get carrierId.
     *
     * @return int
     */
    public function getCarrierId()
    {
        return $this->carrier_id;
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
        $this->category_code = $categoryCode;

        return $this;
    }

    /**
     * Get categoryCode.
     *
     * @return int
     */
    public function getCategoryCode()
    {
        return $this->category_code;
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
        $this->service_id = $serviceId;

        return $this;
    }

    /**
     * Get serviceId.
     *
     * @return int
     */
    public function getServiceId()
    {
        return $this->service_id;
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
        $this->product_type_code = $productTypeCode;

        return $this;
    }

    /**
     * Get productTypeCode.
     *
     * @return int
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
     * @param int $status
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
     * @return int
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
     * Set joinCarrier.
     *
     * @param \ServiceShipment\Entity\Carrier|null $joinCarrier
     *
     * @return ShipmentType
     */
    public function setJoinCarrier(\ServiceShipment\Entity\Carrier $joinCarrier = null)
    {
        $this->join_carrier = $joinCarrier;

        return $this;
    }

    /**
     * Get joinCarrier.
     *
     * @return \ServiceShipment\Entity\Carrier|null
     */
    public function getJoinCarrier()
    {
        return $this->join_carrier;
    }

    /**
     * Set joinService.
     *
     * @param \ServiceShipment\Entity\Service|null $joinService
     *
     * @return ShipmentType
     */
    public function setJoinService(\ServiceShipment\Entity\Service $joinService = null)
    {
        $this->join_service = $joinService;

        return $this;
    }

    /**
     * Get joinService.
     *
     * @return \ServiceShipment\Entity\Service|null
     */
    public function getJoinService()
    {
        return $this->join_service;
    }
}
