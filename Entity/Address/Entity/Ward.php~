<?php

namespace Address\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ward
 *
 * @ORM\Table(name="ward", uniqueConstraints={@ORM\UniqueConstraint(name="unique_ward_id", columns={"id"})})
 * @ORM\Entity(repositoryClass="\Address\Repository\WardRepository")
 */
class Ward
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
     * @var int
     *
     * @ORM\Column(name="district_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $district_id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="name_en", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name_en;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description_en;

    /**
     * @var string|null
     *
     * @ORM\Column(name="postal_code", type="string", length=20, precision=0, scale=0, nullable=true, unique=false)
     */
    private $postal_code;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $status;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_deleted;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $created_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="ref_as_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $ref_as_by;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="district_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $district;


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
     * Set districtId.
     *
     * @param int $districtId
     *
     * @return Ward
     */
    public function setDistrictId($districtId)
    {
        $this->district_id = $districtId;

        return $this;
    }

    /**
     * Get districtId.
     *
     * @return int
     */
    public function getDistrictId()
    {
        return $this->district_id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Ward
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set nameEn.
     *
     * @param string $nameEn
     *
     * @return Ward
     */
    public function setNameEn($nameEn)
    {
        $this->name_en = $nameEn;

        return $this;
    }

    /**
     * Get nameEn.
     *
     * @return string
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Ward
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set descriptionEn.
     *
     * @param string|null $descriptionEn
     *
     * @return Ward
     */
    public function setDescriptionEn($descriptionEn = null)
    {
        $this->description_en = $descriptionEn;

        return $this;
    }

    /**
     * Get descriptionEn.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * Set postalCode.
     *
     * @param string|null $postalCode
     *
     * @return Ward
     */
    public function setPostalCode($postalCode = null)
    {
        $this->postal_code = $postalCode;

        return $this;
    }

    /**
     * Get postalCode.
     *
     * @return string|null
     */
    public function getPostalCode()
    {
        return $this->postal_code;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return Ward
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set isDeleted.
     *
     * @param bool $isDeleted
     *
     * @return Ward
     */
    public function setIsDeleted($isDeleted)
    {
        $this->is_deleted = $isDeleted;

        return $this;
    }

    /**
     * Get isDeleted.
     *
     * @return bool
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }

    /**
     * Set createdBy.
     *
     * @param int $createdBy
     *
     * @return Ward
     */
    public function setCreatedBy($createdBy)
    {
        $this->created_by = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Ward
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
     * Set updatedBy.
     *
     * @param int|null $updatedBy
     *
     * @return Ward
     */
    public function setUpdatedBy($updatedBy = null)
    {
        $this->updated_by = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime|null $updatedAt
     *
     * @return Ward
     */
    public function setUpdatedAt($updatedAt = null)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set refAsBy.
     *
     * @param int|null $refAsBy
     *
     * @return Ward
     */
    public function setRefAsBy($refAsBy = null)
    {
        $this->ref_as_by = $refAsBy;

        return $this;
    }

    /**
     * Get refAsBy.
     *
     * @return int|null
     */
    public function getRefAsBy()
    {
        return $this->ref_as_by;
    }

    /**
     * Set district.
     *
     * @param \Address\Entity\District|null $district
     *
     * @return Ward
     */
    public function setDistrict(\Address\Entity\District $district = null)
    {
        $this->district = $district;

        return $this;
    }

    /**
     * Get district.
     *
     * @return \Address\Entity\District|null
     */
    public function getDistrict()
    {
        return $this->district;
    }
}
