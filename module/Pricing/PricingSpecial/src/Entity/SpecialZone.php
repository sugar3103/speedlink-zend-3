<?php

namespace PricingSpecial\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SpecialZone
 *
 * @ORM\Table(name="special_zone", uniqueConstraints={@ORM\UniqueConstraint(name="customer_id", columns={"customer_id"}), @ORM\UniqueConstraint(name="from_city", columns={"from_city"})}, indexes={@ORM\Index(name="to_city", columns={"to_city"}), @ORM\Index(name="to_ward", columns={"to_ward"}), @ORM\Index(name="created_special_zone_fk", columns={"created_by"}), @ORM\Index(name="to_district", columns={"to_district"}), @ORM\Index(name="special_area_special_zone_fk", columns={"special_area_id"}), @ORM\Index(name="updated_special_zone_fk", columns={"updated_by"})})
 * @ORM\Entity(repositoryClass="\PricingSpecial\Repository\SpecialZoneRepository")
 */
class SpecialZone
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
     * @var int|null
     *
     * @ORM\Column(name="is_deleted", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $is_deleted = 0;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $created_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $updated_at;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $created_by;

    /**
     * @var \Customer\Entity\Customer
     *
     * @ORM\ManyToOne(targetEntity="Customer\Entity\Customer")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="customer_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $customer;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\ManyToOne(targetEntity="Address\Entity\City")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="from_city", referencedColumnName="id", nullable=true)
     * })
     */
    private $from_city;

    /**
     * @var \PricingSpecial\Entity\SpecialArea
     *
     * @ORM\ManyToOne(targetEntity="PricingSpecial\Entity\SpecialArea")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="special_area_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $special_area;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\ManyToOne(targetEntity="Address\Entity\City")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="to_city", referencedColumnName="id", nullable=true)
     * })
     */
    private $to_city;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\ManyToOne(targetEntity="Address\Entity\District")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="to_district", referencedColumnName="id", nullable=true)
     * })
     */
    private $to_district;

    /**
     * @var \Address\Entity\Ward
     *
     * @ORM\ManyToOne(targetEntity="Address\Entity\Ward")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="to_ward", referencedColumnName="id", nullable=true)
     * })
     */
    private $to_ward;

    /**
     * @var \OAuth\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     * })
     */
    private $updated_by;

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
     * Set isDeleted.
     *
     * @param int|null $isDeleted
     *
     * @return SpecialZone
     */
    public function setIsDeleted($isDeleted = null)
    {
        $this->is_deleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return int|null
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return SpecialZone
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
     * Set updated_at.
     *
     * @param \DateTime $updated_at
     *
     * @return SpecialZone
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * Get updated_at.
     *
     * @return \DateTime
     */
    public function getUdpatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set created_by.
     *
     * @param \OAuth\Entity\User|null $created_by
     *
     * @return SpecialZone
     */
    public function setCreatedBy(\OAuth\Entity\User $created_by = null)
    {
        $this->created_by = $created_by;

        return $this;
    }

    /**
     * Get created_by.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * Set customer.
     *
     * @param \Customer\Entity\Customer|null $customer
     *
     * @return SpecialZone
     */
    public function setCustomer(\Customer\Entity\Customer $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer.
     *
     * @return \Customer\Entity\Customer|null
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set fromCity.
     *
     * @param \Address\Entity\City|null $fromCity
     *
     * @return SpecialZone
     */
    public function setFromCity(\Address\Entity\City $fromCity = null)
    {
        $this->from_city = $fromCity;

        return $this;
    }

    /**
     * Get fromCity.
     *
     * @return \Address\Entity\City|null
     */
    public function getFromCity()
    {
        return $this->from_city;
    }

    /**
     * Set specialArea.
     *
     * @param \PricingSpecial\Entity\SpecialArea|null $specialArea
     *
     * @return SpecialZone
     */
    public function setSpecialArea(\PricingSpecial\Entity\SpecialArea $specialArea = null)
    {
        $this->special_area = $specialArea;

        return $this;
    }

    /**
     * Get specialArea.
     *
     * @return \PricingSpecial\Entity\SpecialArea|null
     */
    public function getSpecialArea()
    {
        return $this->special_area;
    }

    /**
     * Set toCity.
     *
     * @param \Address\Entity\City|null $toCity
     *
     * @return SpecialZone
     */
    public function setToCity(\Address\Entity\City $toCity = null)
    {
        $this->to_city = $toCity;

        return $this;
    }

    /**
     * Get toCity.
     *
     * @return \Address\Entity\City|null
     */
    public function getToCity()
    {
        return $this->to_city;
    }

    /**
     * Set toDistrict.
     *
     * @param \Address\Entity\District|null $toDistrict
     *
     * @return SpecialZone
     */
    public function setToDistrict(\Address\Entity\District $toDistrict = null)
    {
        $this->to_district = $toDistrict;
        return $this;
    }

    /**
     * Get toDistrict.
     *
     * @return \Address\Entity\District|null
     */
    public function getToDistrict()
    {
        return $this->to_district;
    }

    /**
     * Set toWard.
     *
     * @param \Address\Entity\Ward|null $toWard
     *
     * @return SpecialZone
     */
    public function setToWard(\Address\Entity\Ward $toWard = null)
    {
        $this->to_ward = $toWard;

        return $this;
    }

    /**
     * Get toWard.
     *
     * @return \Address\Entity\Ward|null
     */
    public function getToWard()
    {
        return $this->to_ward;
    }

    /**
     * Set updated_by.
     *
     * @param \OAuth\Entity\User|null $updated_by
     *
     * @return SpecialZone
     */
    public function setUpdatedBy(\OAuth\Entity\User $updated_by = null)
    {
        $this->updated_by = $updated_by;

        return $this;
    }

    /**
     * Get updated_by.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
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

}
