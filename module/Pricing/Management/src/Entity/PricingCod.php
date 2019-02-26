<?php
namespace Management\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PricingCod
 *
 * @ORM\Table(name="pricing_cod")
 * @ORM\Entity(repositoryClass="Management\Repository\PricingCodRepository")
 */
class PricingCod
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
     * @var int
     *
     * @ORM\Column(name="pricing_data_id", type="integer", nullable=false)
     */
    private $pricing_data_id;

    /**
     * @var string
     *
     * @ORM\Column(name="`from`", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $from;

    /**
     * @var string
     *
     * @ORM\Column(name="`to`", type="decimal", precision=10, scale=2, nullable=false, options={"comment"="0 == over"})
     */
    private $to;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internal_city;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city_ras", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internal_city_ras;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $external_city;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_ras", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $external_city_ras;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

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
     *
     * @ORM\OneToOne(targetEntity="\Management\Entity\PricingData")
     * @ORM\JoinColumn(name="pricing_data_id", referencedColumnName="id", nullable=true)
     */
    private $join_pricing_data;

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
     * @return int
     */
    public function getPricingDataId()
    {
        return $this->pricing_data_id;
    }

    /**
     * @param int $pricing_data_id
     */
    public function setPricingDataId($pricing_data_id)
    {
        $this->pricing_data_id = $pricing_data_id;
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
     * @return string
     */
    public function getInternalCity()
    {
        return $this->internal_city;
    }

    /**
     * @param string $internal_city
     */
    public function setInternalCity($internal_city)
    {
        $this->internal_city = $internal_city;
    }

    /**
     * @return string
     */
    public function getInternalCityRas()
    {
        return $this->internal_city_ras;
    }

    /**
     * @param string $internal_city_ras
     */
    public function setInternalCityRas($internal_city_ras)
    {
        $this->internal_city_ras = $internal_city_ras;
    }

    /**
     * @return string
     */
    public function getExternalCity()
    {
        return $this->external_city;
    }

    /**
     * @param string $external_city
     */
    public function setExternalCity($external_city)
    {
        $this->external_city = $external_city;
    }

    /**
     * @return string
     */
    public function getExternalCityRas()
    {
        return $this->external_city_ras;
    }

    /**
     * @param string $external_city_ras
     */
    public function setExternalCityRas($external_city_ras)
    {
        $this->external_city_ras = $external_city_ras;
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
     * @return mixed
     */
    public function getJoinPricingData()
    {
        return $this->join_pricing_data;
    }

    /**
     * @param mixed $join_pricing_data
     */
    public function setJoinPricingData($join_pricing_data)
    {
        $this->join_pricing_data = $join_pricing_data;
    }

}
