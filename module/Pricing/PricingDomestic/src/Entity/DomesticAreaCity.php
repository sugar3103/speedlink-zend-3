<?php

namespace PricingDomestic\Entity;

use Doctrine\ORM\Mapping as ORM;

 /**
 * DomesticAreaCity
 *
 * @ORM\Table(name="domestic_area_city", uniqueConstraints={@ORM\UniqueConstraint(name="unique_id", columns={"id"})})
 * @ORM\Entity(repositoryClass="\PricingDomestic\Repository\DomesticAreaCityRepository")
 */
class DomesticAreaCity
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
     * @ORM\Column(name="domestic_area_id", type="integer", nullable=false)
     */
    private $domestic_area_id;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\OneToMany(targetEntity="Address\Entity\City")
     * @ORM\JoinTable(name="city",
     *   joinColumns={
     *     @ORM\JoinColumn(name="city_id", referencedColumnName="id", nullable=true)
     *   }     
     * )
     */
    private $cities;

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
    
      /**
     * @var int
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=false)
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
     * @var \PricingDomestic\Entity\DomesticArea
     *
     * @ORM\OneToOne(targetEntity="PricingDomestic\Entity\DomesticArea", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="domestic_area_id)", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $domestic_area;

    public function __construct() {
        $this->cities = new ArrayCollection();
    }
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
    public function getDomesticAreaId()
    {
        return $this->domestic_area_id;
    }

    /**
     * @param int $domestic_area_id
     */
    public function setDomesticAreaId($domestic_area_id)
    {
        $this->domestic_area_id = $domestic_area_id;
    }

    /**
     * @return PricingDomestic\Entity\DomesticArea
     */
    public function getDomesticArea()
    {
        return $this->domestic_area;
    }

    /**
     * @param PricingDomestic\Entity\DomesticArea $domestic_area
     */
    public function setDomesticArea($domestic_area)
    {
        $this->domestic_area = $domestic_area;
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
     * Get Permissions.
     *
     * @return ArrayCollection
     */
    public function getCities() {
        return $this->cities;
    }

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
