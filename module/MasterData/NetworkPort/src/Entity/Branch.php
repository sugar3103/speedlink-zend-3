<?php
namespace NetworkPort\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Branch
 *
 * @ORM\Table(name="branch", uniqueConstraints={@ORM\UniqueConstraint(name="unique_code", columns={"code"})})
 * @ORM\Entity(repositoryClass="\NetworkPort\Repository\BranchRepository")
 */
class Branch
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
     * @ORM\Column(name="hub_id", type="integer", nullable=false)
     */
    private $hub_id;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=20, nullable=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", nullable=false)
     */
    private $status = '0';

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $is_deleted = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=20, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name_en", type="string", length=50, precision=0, scale=0, nullable=true, unique=false)
     */
    private $name_en;

    /**
     * @var int
     *
     * @ORM\Column(name="country_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $country_id;

    /**
     * @var int
     *
     * @ORM\Column(name="city_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $city_id;

    /**
     * @var int
     *
     * @ORM\Column(name="district_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $district_id;

    /**
     * @var int
     *
     * @ORM\Column(name="ward_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $ward_id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=1000, precision=0, scale=0, nullable=true, unique=false)
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
     * @ORM\Column(name="address", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $address;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="district_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $district;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\City")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="city_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $city;

    /**
     * @var \Address\Entity\Ward
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Ward")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ward_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $ward;

    /**
     * @var \Address\Entity\Country
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="country_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $country;

    /**
     * @var \NetworkPort\Entity\Hub
     *
     * @ORM\OneToOne(targetEntity="NetworkPort\Entity\Hub", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="hub_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $hub;

    /**
     * 
     * @ORM\OneToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=true)
     */
    protected $user_create;

    /**
     * 
     * @ORM\OneToOne(targetEntity="OAuth\Entity\User")
     * @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     */
    protected $user_update;

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
    public function getHubId()
    {
        return $this->hub_id;
    }

    /**
     * @param int $hub_id
     */
    public function setHubId($hub_id)
    {
        $this->hub_id = $hub_id;
    }

    /**
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
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
     * @return \DateTime|null
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param \DateTime|null $created_at
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
     * Set name.
     *
     * @param string $name
     *
     * @return Branch
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
     * Set name_en.
     *
     * @param string|null $name_en
     *
     * @return Branch
     */
    public function setNameEn($name_en = null)
    {
        $this->name_en = $name_en;

        return $this;
    }

    /**
     * Get name_en.
     *
     * @return string|null
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * Set country_id.
     *
     * @param int $country_id
     *
     * @return Branch
     */
    public function setCountryId($country_id)
    {
        $this->country_id = $country_id;

        return $this;
    }

    /**
     * Get country_id.
     *
     * @return int
     */
    public function getCountryId()
    {
        return $this->country_id;
    }

    /**
     * Set city_id.
     *
     * @param int $city_id
     *
     * @return Branch
     */
    public function setCityId($city_id)
    {
        $this->city_id = $city_id;

        return $this;
    }

    /**
     * Get city_id.
     *
     * @return int
     */
    public function getCityId()
    {
        return $this->city_id;
    }

    /**
     * Set district_id.
     *
     * @param int $district_id
     *
     * @return Branch
     */
    public function setDistrictId($district_id)
    {
        $this->district_id = $district_id;

        return $this;
    }

    /**
     * Get district_id.
     *
     * @return int
     */
    public function getDistrictId()
    {
        return $this->district_id;
    }

    /**
     * Set ward_id.
     *
     * @param int $ward_id
     *
     * @return Branch
     */
    public function setWardId($ward_id)
    {
        $this->ward_id = $ward_id;

        return $this;
    }

    /**
     * Get ward_id.
     *
     * @return int
     */
    public function getWardId()
    {
        return $this->ward_id;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Branch
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
     * Set description_en.
     *
     * @param string|null $description_en
     *
     * @return Branch
     */
    public function setDescriptionEn($description_en = null)
    {
        $this->description_en = $description_en;

        return $this;
    }

    /**
     * Get description_en.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }
    
    /**
     * Set address.
     *
     * @param string|null $address
     *
     * @return Branch
     */
    public function setAddress($address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address.
     *
     * @return string|null
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set district.
     *
     * @param \Address\Entity\District|null $district
     *
     * @return Branch
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

    /**
     * Set city.
     *
     * @param \Address\Entity\City|null $city
     *
     * @return Branch
     */
    public function setCity(\Address\Entity\City $city = null)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city.
     *
     * @return \Address\Entity\City|null
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set ward.
     *
     * @param \Address\Entity\Ward|null $ward
     *
     * @return Branch
     */
    public function setWard(\Address\Entity\Ward $ward = null)
    {
        $this->ward = $ward;

        return $this;
    }

    /**
     * Get ward.
     *
     * @return \Address\Entity\Ward|null
     */
    public function getWard()
    {
        return $this->ward;
    }

    /**
     * Set country.
     *
     * @param \Address\Entity\Country|null $country
     *
     * @return Branch
     */
    public function setCountry(\Address\Entity\Country $country = null)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country.
     *
     * @return \Address\Entity\Country|null
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set hub.
     *
     * @param \NetworkPort\Entity\Hub|null $hub
     *
     * @return Branch
     */
    public function setHub(\NetworkPort\Entity\Hub $hub = null)
    {
        $this->hub = $hub;

        return $this;
    }

    /**
     * Get hub.
     *
     * @return \NetworkPort\Entity\Hub|null
     */
    public function getHub()
    {
        return $this->hub;
    }

    /**
     * Set city.
     *
     * @param \OAuth\Entity\User|null $city
     *
     * @return Hub
     */
    public function setUserCreate(\OAuth\Entity\User $user_create = null)
    {
        $this->user_create = $user_create;

        return $this;
    }

    /**
     * Get city.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getUserCreate()
    {
        return $this->user_create;
    }

    /**
     * Set city.
     *
     * @param \OAuth\Entity\User|null $city
     *
     * @return Hub
     */
    public function setUserUpdate(\OAuth\Entity\User $user_update = null)
    {
        $this->user_update = $user_update;

        return $this;
    }

    /**
     * Get city.
     *
     * @return \OAuth\Entity\User|null
     */
    public function getUserUpdate()
    {
        return $this->user_update;
    }

}
