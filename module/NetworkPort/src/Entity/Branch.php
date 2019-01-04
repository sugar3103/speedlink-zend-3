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
    /**
     * @var int
     *
     * @ORM\Column(name="branch_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $branchId;

    /**
     * @var int
     *
     * @ORM\Column(name="hub_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $hubId;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=20, precision=0, scale=0, nullable=false, unique=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $status;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $createdBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $createdAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updatedBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updatedAt;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=20, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="country_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $countryId;

    /**
     * @var int
     *
     * @ORM\Column(name="city_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $cityId;

    /**
     * @var int
     *
     * @ORM\Column(name="district_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $districtId;

    /**
     * @var int
     *
     * @ORM\Column(name="ward_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $wardId;

   
    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=1000, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\District" , inversedBy="branch")
     * @ORM\JoinColumn(name="district_id", referencedColumnName="district_id", nullable=true)
     */
    protected $district;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\City" , inversedBy="branch")
     * @ORM\JoinColumn(name="city_id", referencedColumnName="city_id", nullable=true)
     */
    protected $city;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\Ward" , inversedBy="branch")
     * @ORM\JoinColumn(name="ward_id", referencedColumnName="ward_id", nullable=true)
     */
    protected $ward;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\Country" , inversedBy="branch")
     * @ORM\JoinColumn(name="country_id", referencedColumnName="country_id", nullable=true)
     */
    protected $country;

    /**
     * Get branchId.
     *
     * @return int
     */
    public function getBranchId()
    {
        return $this->branchId;
    }

    /**
     * Set hubId.
     *
     * @param int $hubId
     *
     * @return Branch
     */
    public function setHubId($hubId)
    {
        $this->hubId = $hubId;

        return $this;
    }

    /**
     * Get hubId.
     *
     * @return int
     */
    public function getHubId()
    {
        return $this->hubId;
    }

    /**
     * Set code.
     *
     * @param string $code
     *
     * @return Branch
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code.
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return Branch
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
     * Set createdBy.
     *
     * @param int $createdBy
     *
     * @return Branch
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime|null $createdAt
     *
     * @return Branch
     */
    public function setCreatedAt($createdAt = null)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime|null
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedBy.
     *
     * @param int|null $updatedBy
     *
     * @return Branch
     */
    public function setUpdatedBy($updatedBy = null)
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy.
     *
     * @return int|null
     */
    public function getUpdatedBy()
    {
        return $this->updatedBy;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime|null $updatedAt
     *
     * @return Branch
     */
    public function setUpdatedAt($updatedAt = null)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
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
     * Set countryId.
     *
     * @param int $countryId
     *
     * @return Branch
     */
    public function setCountryId($countryId)
    {
        $this->countryId = $countryId;

        return $this;
    }

    /**
     * Get countryId.
     *
     * @return int
     */
    public function getCountryId()
    {
        return $this->countryId;
    }

    /**
     * Set cityId.
     *
     * @param int $cityId
     *
     * @return Branch
     */
    public function setCityId($cityId)
    {
        $this->cityId = $cityId;

        return $this;
    }

    /**
     * Get cityId.
     *
     * @return int
     */
    public function getCityId()
    {
        return $this->cityId;
    }

    /**
     * Set districtId.
     *
     * @param int $districtId
     *
     * @return Branch
     */
    public function setDistrictId($districtId)
    {
        $this->districtId = $districtId;

        return $this;
    }

    /**
     * Get districtId.
     *
     * @return int
     */
    public function getDistrictId()
    {
        return $this->districtId;
    }

    /**
     * Set wardId.
     *
     * @param int $wardId
     *
     * @return Branch
     */
    public function setWardId($wardId)
    {
        $this->wardId = $wardId;

        return $this;
    }

    /**
     * Get wardId.
     *
     * @return int
     */
    public function getWardId()
    {
        return $this->wardId;
    }

    
    /**
     * Set description.
     *
     * @param string $description
     *
     * @return Branch
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
}
