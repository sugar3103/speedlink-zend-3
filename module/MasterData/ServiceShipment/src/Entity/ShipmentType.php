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
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=true)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name_en", type="string", length=50, nullable=true)
     */
    private $name_en;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, nullable=true)
     */
    private $description_en;

    /**
     * @var string|null
     *
     * @ORM\Column(name="code", type="string", length=50, nullable=true, options={"fixed"=true})
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", nullable=false)
     */
    private $carrier_id;

    /**
     * @var string
     *
     * @ORM\Column(name="category_id", type="integer", nullable=false, options={"comment"="Inbound, Outbound, Domestic"})
     */
    private $category_id;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", nullable=false)
     */
    private $service_id;

    /**
     * @var string
     *
     * @ORM\Column(name="product_type_code", type="string", nullable=false, options={"comment"="Dox, Parcel"})
     */
    private $product_type_code;

    /**
     * @var int|null
     *
     * @ORM\Column(name="volumetric_number", type="integer", nullable=true)
     */
    private $volumetric_number;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", nullable=false)
     */
    private $status = 0;

    /**
     * @var int
     *
     * @ORM\Column(name="is_deleted", type="integer", nullable=false)
     */
    private $is_deleted = 0;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updated_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="0000-00-00 00:00:00"})
     */
    private $created_at;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     *
     * @ORM\OneToOne(targetEntity="\ServiceShipment\Entity\Carrier")
     * @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", nullable=true)
     */
    private $join_carrier;

    /**
     *
     * @ORM\OneToOne(targetEntity="\ServiceShipment\Entity\Service")
     * @ORM\JoinColumn(name="service_id", referencedColumnName="id", nullable=true)
     */
    private $join_service;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=true)
     */
    private $join_created;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     */
    private $join_updated;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string|null
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * @param string|null $name_en
     */
    public function setNameEn($name_en)
    {
        $this->name_en = $name_en;
    }

    /**
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * @param string|null $description_en
     */
    public function setDescriptionEn($description_en)
    {
        $this->description_en = $description_en;
    }

    /**
     * @return string|null
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string|null $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * @return int
     */
    public function getCarrierId()
    {
        return $this->carrier_id;
    }

    /**
     * @param int $carrier_id
     */
    public function setCarrierId($carrier_id)
    {
        $this->carrier_id = $carrier_id;
    }

    /**
     * @return int
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @param int $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @return int
     */
    public function getServiceId()
    {
        return $this->service_id;
    }

    /**
     * @param int $service_id
     */
    public function setServiceId($service_id)
    {
        $this->service_id = $service_id;
    }

    /**
     * @return int
     */
    public function getProductTypeCode()
    {
        return $this->product_type_code;
    }

    /**
     * @param int $product_type_code
     */
    public function setProductTypeCode($product_type_code)
    {
        $this->product_type_code = $product_type_code;
    }

    /**
     * @return int|null
     */
    public function getVolumetricNumber()
    {
        return $this->volumetric_number;
    }

    /**
     * @param int|null $volumetric_number
     */
    public function setVolumetricNumber($volumetric_number)
    {
        $this->volumetric_number = $volumetric_number;
    }

    /**
     * @return bool
     */
    public function isStatus()
    {
        return $this->status;
    }

    /**
     * @param bool $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return bool
     */
    public function isDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * @param bool $is_deleted
     */
    public function setIsDeleted($is_deleted)
    {
        $this->is_deleted = $is_deleted;
    }

    /**
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param \DateTime|null $updated_at
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }

    /**
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }

    /**
     * @param int|null $updated_by
     */
    public function setUpdatedBy($updated_by)
    {
        $this->updated_by = $updated_by;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param \DateTime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * @param int $created_by
     */
    public function setCreatedBy($created_by)
    {
        $this->created_by = $created_by;
    }

    /**
     * @return mixed
     */
    public function getJoinCarrier()
    {
        return $this->join_carrier;
    }

    /**
     * @param mixed $join_carrier
     */
    public function setJoinCarrier($join_carrier)
    {
        $this->join_carrier = $join_carrier;
    }

    /**
     * @return mixed
     */
    public function getJoinService()
    {
        return $this->join_service;
    }

    /**
     * @param mixed $join_service
     */
    public function setJoinService($join_service)
    {
        $this->join_service = $join_service;
    }

    /**
     * @return mixed
     */
    public function getJoinCreated()
    {
        return $this->join_created;
    }

    /**
     * @param mixed $join_created
     */
    public function setJoinCreated($join_created)
    {
        $this->join_created = $join_created;
    }

    /**
     * @return mixed
     */
    public function getJoinUpdated()
    {
        return $this->join_updated;
    }

    /**
     * @param mixed $join_updated
     */
    public function setJoinUpdated($join_updated)
    {
        $this->join_updated = $join_updated;
    }

}
