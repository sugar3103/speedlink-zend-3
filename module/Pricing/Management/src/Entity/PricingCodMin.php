<?php
namespace Management\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PricingCodMin
 *
 * @ORM\Table(name="pricing_cod_min")
 * @ORM\Entity(repositoryClass="Management\Repository\PricingCodMinRepository")
 */
class PricingCodMin
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
     * @ORM\Column(name="internal_city_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internal_city_min;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city_ras_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internal_city_ras_min;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $external_city_min;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_ras_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $external_city_ras_min;

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
    public function getInternalCityMin()
    {
        return $this->internal_city_min;
    }

    /**
     * @param string $internal_city_min
     */
    public function setInternalCityMin($internal_city_min)
    {
        $this->internal_city_min = $internal_city_min;
    }

    /**
     * @return string
     */
    public function getInternalCityRasMin()
    {
        return $this->internal_city_ras_min;
    }

    /**
     * @param string $internal_city_ras_min
     */
    public function setInternalCityRasMin($internal_city_ras_min)
    {
        $this->internal_city_ras_min = $internal_city_ras_min;
    }

    /**
     * @return string
     */
    public function getExternalCityMin()
    {
        return $this->external_city_min;
    }

    /**
     * @param string $external_city_min
     */
    public function setExternalCityMin($external_city_min)
    {
        $this->external_city_min = $external_city_min;
    }

    /**
     * @return string
     */
    public function getExternalCityRasMin()
    {
        return $this->external_city_ras_min;
    }

    /**
     * @param string $external_city_ras_min
     */
    public function setExternalCityRasMin($external_city_ras_min)
    {
        $this->external_city_ras_min = $external_city_ras_min;
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
