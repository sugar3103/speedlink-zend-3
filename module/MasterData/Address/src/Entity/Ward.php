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
    const ACTIVE = 1;
    const INACTIVE = 0;

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
     * @ORM\Column(name="district_id", type="integer", nullable=false)
     */
    private $district_id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="name_en", type="string", length=50, nullable=false)
     */
    private $name_en;

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
     * @var string|null
     *
     * @ORM\Column(name="postal_code", type="string", length=20, nullable=true)
     */
    private $postal_code;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", nullable=false)
     */
    private $status;

     /**
     * @var int|null
     *
     * @ORM\Column(name="ras", type="integer", nullable=true)
     */
    private $ras = 0;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $is_deleted = '0';

    
    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=true)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    
    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     */
    private $updated_by;   

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @var int|null
     *
     * @ORM\Column(name="ref_as_by", type="integer", nullable=true)
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
    public function getDistrictId()
    {
        return $this->district_id;
    }

    /**
     * @param int $district_id
     */
    public function setDistrictId($district_id)
    {
        $this->district_id = $district_id;
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
     * @return string|null
     */
    public function getPostalCode()
    {
        return $this->postal_code;
    }

    /**
     * @param string|null $postal_code
     */
    public function setPostalCode($postal_code)
    {
        $this->postal_code = $postal_code;
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

     /**
     * @return int|null
     */
    public function getRas()
    {
        return $this->ras;
    }

    /**
     * @param int|null $ras
     */
    public function setRas($ras)
    {
        $this->ras = $ras;
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
     * Set createdBy.
     *
     * @param \OAuth\Entity\User|null $createdBy
     *
     * @return \OAuth\Entity\User
     */
    public function setCreatedBy(\OAuth\Entity\User $createdBy = null)
    {
        $this->created_by = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getCreatedBy()
    {
        return $this->created_by;
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
     * Set updatedBy.
     *
     * @param \OAuth\Entity\User|null $updatedBy
     *
     * @return OAuth\Entity\User
     */
    public function setUpdatedBy(\OAuth\Entity\User $updatedBy = null)
    {
        $this->updated_by = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
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
     * @return int|null
     */
    public function getRefAsBy()
    {
        return $this->ref_as_by;
    }

    /**
     * @param int|null $ref_as_by
     */
    public function setRefAsBy($ref_as_by)
    {
        $this->ref_as_by = $ref_as_by;
    }

    /**
     * 
     * @return Address\Entity\District
     */

    public function getDistrict()
    {
       return $this->district;
    }

   /**
    * 
    * @param Address\Entity\District
    */

   public function setDistrict($district)
   {
      $this->district = $district;
   }

    /**
     * Returns user status as string.
     * @return string
     */
    public function getIsActiveAsString()
    {
        $list = self::getIsActiveList();
        if (isset($list[$this->is_active])) {
            return $list[$this->is_active];
        }
        return 'Unknown';
    }

    /**
     * Returns possible statuses as array.
     * @return array
     */
    public static function getIsActiveList($value = null)
    {
        $status = [
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive'
        ];

        if (!empty($value) && isset($status[$value])) {
            return $status[$value];
        }
        return $status;
    }
}
