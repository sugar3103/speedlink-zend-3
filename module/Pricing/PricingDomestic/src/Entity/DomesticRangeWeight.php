<?php

namespace Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticRangeWeight
 *
 * @ORM\Table(name="domestic_range_weight")
 * @ORM\Entity
 */
class DomesticRangeWeight
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="name_en", type="string", length=100, nullable=false)
     */
    private $name_en;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", nullable=false)
     */
    private $carrier_id;

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", length=10, nullable=false, options={"fixed"=true,"comment"="Inbound, Outbound, Domestic"})
     */
    private $category;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", nullable=false)
     */
    private $service_id;

    /**
     * @var int
     *
     * @ORM\Column(name="shipment_type_id", type="integer", nullable=false)
     */
    private $shipment_type_id;

    /**
     * @var bool
     *
     * @ORM\Column(name="calculate_unit", type="boolean", nullable=false)
     */
    private $calculate_unit = '0';

    /**
     * @var string|null
     *
     * @ORM\Column(name="unit", type="decimal", precision=10, scale=2, nullable=true, options={"default"="0.00","comment"="required if calculate_unit == 1"})
     */
    private $unit = '0.00';

    /**
     * @var int
     *
     * @ORM\Column(name="is_ras", type="integer", nullable=false)
     */
    private $is_ras = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="round_up", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $round_up;

    /**
     * @var string
     *
     * @ORM\Column(name="from", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $from;

    /**
     * @var string
     *
     * @ORM\Column(name="to", type="decimal", precision=10, scale=2, nullable=false, options={"comment"="0 = Over"})
     */
    private $to;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status = '0';

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
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $created_at = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updated_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $is_deleted = '0';

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
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * @param string $name_en
     */
    public function setNameEn($name_en)
    {
        $this->name_en = $name_en;
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
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param string $category
     */
    public function setCategory($category)
    {
        $this->category = $category;
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
    public function getShipmentTypeId()
    {
        return $this->shipment_type_id;
    }

    /**
     * @param int $shipment_type_id
     */
    public function setShipmentTypeId($shipment_type_id)
    {
        $this->shipment_type_id = $shipment_type_id;
    }

    /**
     * @return bool
     */
    public function isCalculateUnit()
    {
        return $this->calculate_unit;
    }

    /**
     * @param bool $calculate_unit
     */
    public function setCalculateUnit($calculate_unit)
    {
        $this->calculate_unit = $calculate_unit;
    }

    /**
     * @return string|null
     */
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * @param string|null $unit
     */
    public function setUnit($unit)
    {
        $this->unit = $unit;
    }

    /**
     * @return int
     */
    public function getIsRas()
    {
        return $this->is_ras;
    }

    /**
     * @param int $is_ras
     */
    public function setIsRas($is_ras)
    {
        $this->is_ras = $is_ras;
    }

    /**
     * @return string
     */
    public function getRoundUp()
    {
        return $this->round_up;
    }

    /**
     * @param string $round_up
     */
    public function setRoundUp($round_up)
    {
        $this->round_up = $round_up;
    }

    /**
     * @return string
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * @param string $from
     */
    public function setFrom($from)
    {
        $this->from = $from;
    }

    /**
     * @return string
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * @param string $to
     */
    public function setTo($to)
    {
        $this->to = $to;
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
     * @return bool
     */
    public function isIsDeleted()
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


}
