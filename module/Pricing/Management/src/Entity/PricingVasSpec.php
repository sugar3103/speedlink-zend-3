<?php
namespace Management\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PricingVasSpec
 *
 * @ORM\Table(name="pricing_vas_spec")
 * @ORM\Entity(repositoryClass="Management\Repository\PricingVasSpecRepository")
 */
class PricingVasSpec
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
     * @var int|null
     *
     * @ORM\Column(name="pricing_vas_id", type="integer", nullable=true)
     */
    private $pricing_vas_id;

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
     * @ORM\Column(name="`value`", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $value;

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
     * @return int|null
     */
    public function getPricingVasId()
    {
        return $this->pricing_vas_id;
    }

    /**
     * @param int|null $pricing_vas_id
     */
    public function setPricingVasId($pricing_vas_id)
    {
        $this->pricing_vas_id = $pricing_vas_id;
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
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @param string $value
     */
    public function setValue($value)
    {
        $this->value = $value;
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

}
