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
     * @ORM\Column(name="internal_city", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internalCity;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city_ras", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internalCityRas;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $externalCity;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_ras", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $externalCityRas;

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
    public function getInternalCity()
    {
        return $this->internalCity;
    }

    /**
     * @param string $internalCity
     */
    public function setInternalCity($internalCity)
    {
        $this->internalCity = $internalCity;
    }

    /**
     * @return string
     */
    public function getInternalCityRas()
    {
        return $this->internalCityRas;
    }

    /**
     * @param string $internalCityRas
     */
    public function setInternalCityRas($internalCityRas)
    {
        $this->internalCityRas = $internalCityRas;
    }

    /**
     * @return string
     */
    public function getExternalCity()
    {
        return $this->externalCity;
    }

    /**
     * @param string $externalCity
     */
    public function setExternalCity($externalCity)
    {
        $this->externalCity = $externalCity;
    }

    /**
     * @return string
     */
    public function getExternalCityRas()
    {
        return $this->externalCityRas;
    }

    /**
     * @param string $externalCityRas
     */
    public function setExternalCityRas($externalCityRas)
    {
        $this->externalCityRas = $externalCityRas;
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
