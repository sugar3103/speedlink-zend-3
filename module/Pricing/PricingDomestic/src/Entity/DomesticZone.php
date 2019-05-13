<?php

namespace Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DomesticZone
 *
 * @ORM\Table(name="domestic_zone")
 * @ORM\Entity
 */
class DomesticZone
{
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


}
