<?php

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
    private $pricingDataId;

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
     * @ORM\Column(name="internal_city_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internalCityMin;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city_ras_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internalCityRasMin;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $externalCityMin;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_ras_min", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $externalCityRasMin;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $isDeleted = '0';

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
        return $this->pricingDataId;
    }

    /**
     * @param int $pricingDataId
     */
    public function setPricingDataId($pricingDataId)
    {
        $this->pricingDataId = $pricingDataId;
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
    public function getInternalCityMin()
    {
        return $this->internalCityMin;
    }

    /**
     * @param string $internalCityMin
     */
    public function setInternalCityMin($internalCityMin)
    {
        $this->internalCityMin = $internalCityMin;
    }

    /**
     * @return string
     */
    public function getInternalCityRasMin()
    {
        return $this->internalCityRasMin;
    }

    /**
     * @param string $internalCityRasMin
     */
    public function setInternalCityRasMin($internalCityRasMin)
    {
        $this->internalCityRasMin = $internalCityRasMin;
    }

    /**
     * @return string
     */
    public function getExternalCityMin()
    {
        return $this->externalCityMin;
    }

    /**
     * @param string $externalCityMin
     */
    public function setExternalCityMin($externalCityMin)
    {
        $this->externalCityMin = $externalCityMin;
    }

    /**
     * @return string
     */
    public function getExternalCityRasMin()
    {
        return $this->externalCityRasMin;
    }

    /**
     * @param string $externalCityRasMin
     */
    public function setExternalCityRasMin($externalCityRasMin)
    {
        $this->externalCityRasMin = $externalCityRasMin;
    }

    /**
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * @param int $createdBy
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;
    }

    /**
     * @return DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param DateTime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updatedBy;
    }

    /**
     * @param int|null $updatedBy
     */
    public function setUpdatedBy($updatedBy)
    {
        $this->updatedBy = $updatedBy;
    }

    /**
     * @return DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param DateTime|null $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return bool
     */
    public function isDeleted()
    {
        return $this->isDeleted;
    }

    /**
     * @param bool $isDeleted
     */
    public function setIsDeleted($isDeleted)
    {
        $this->isDeleted = $isDeleted;
    }

}
