<?php

namespace NetworkPort\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BranchArea
 *
 * @ORM\Table(name="branch_area", uniqueConstraints={@ORM\UniqueConstraint(name="unique_bracharea", columns={"country_id", "city_id", "district_id", "ward_id"})})
 * @ORM\Entity(repositoryClass="\NetworkPort\Repository\BranchAreaRepository")
 */
class BranchArea
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
     * @ORM\Column(name="branch_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $branch_id;

    /**
     * @var int
     *
     * @ORM\Column(name="hub_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $hub_id;

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
     * @var \DateTime|null
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
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
     * @var \NetworkPort\Entity\Branch
     *
     * @ORM\OneToOne(targetEntity="NetworkPort\Entity\Branch", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="branch_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $branch;

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
     * @var \Address\Entity\Country
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="country_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $country;

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
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="district_id", referencedColumnName="id", unique=true, nullable=false)
     * })
     */
    private $district;

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
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set branchId.
     *
     * @param int $branchId
     *
     * @return BranchArea
     */
    public function setBranchId($branchId)
    {
        $this->branch_id = $branchId;

        return $this;
    }

    /**
     * Get branchId.
     *
     * @return int
     */
    public function getBranchId()
    {
        return $this->branch_id;
    }

    /**
     * Set hubId.
     *
     * @param int $hubId
     *
     * @return BranchArea
     */
    public function setHubId($hubId)
    {
        $this->hub_id = $hubId;

        return $this;
    }

    /**
     * Get hubId.
     *
     * @return int
     */
    public function getHubId()
    {
        return $this->hub_id;
    }

    /**
     * Set countryId.
     *
     * @param int $countryId
     *
     * @return BranchArea
     */
    public function setCountryId($countryId)
    {
        $this->country_id = $countryId;

        return $this;
    }

    /**
     * Get countryId.
     *
     * @return int
     */
    public function getCountryId()
    {
        return $this->country_id;
    }

    /**
     * Set cityId.
     *
     * @param int $cityId
     *
     * @return BranchArea
     */
    public function setCityId($cityId)
    {
        $this->city_id = $cityId;

        return $this;
    }

    /**
     * Get cityId.
     *
     * @return int
     */
    public function getCityId()
    {
        return $this->city_id;
    }

    /**
     * Set districtId.
     *
     * @param int $districtId
     *
     * @return BranchArea
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
     * Set wardId.
     *
     * @param int $wardId
     *
     * @return BranchArea
     */
    public function setWardId($wardId)
    {
        $this->ward_id = $wardId;

        return $this;
    }

    /**
     * Get wardId.
     *
     * @return int
     */
    public function getWardId()
    {
        return $this->ward_id;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return BranchArea
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
     * @return BranchArea
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
     * @return BranchArea
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
     * @param \DateTime|null $createdAt
     *
     * @return BranchArea
     */
    public function setCreatedAt($createdAt = null)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime|null
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
     * @return BranchArea
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
     * @return BranchArea
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
     * Set branch.
     *
     * @param \NetworkPort\Entity\Branch|null $branch
     *
     * @return BranchArea
     */
    public function setBranch(\NetworkPort\Entity\Branch $branch = null)
    {
        $this->branch = $branch;

        return $this;
    }

    /**
     * Get branch.
     *
     * @return \NetworkPort\Entity\Branch|null
     */
    public function getBranch()
    {
        return $this->branch;
    }

    /**
     * Set hub.
     *
     * @param \NetworkPort\Entity\Hub|null $hub
     *
     * @return BranchArea
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
     * Set country.
     *
     * @param \Address\Entity\Country $country
     *
     * @return BranchArea
     */
    public function setCountry(\Address\Entity\Country $country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country.
     *
     * @return \Address\Entity\Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set city.
     *
     * @param \Address\Entity\City $city
     *
     * @return BranchArea
     */
    public function setCity(\Address\Entity\City $city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city.
     *
     * @return \Address\Entity\City
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set district.
     *
     * @param \Address\Entity\District $district
     *
     * @return BranchArea
     */
    public function setDistrict(\Address\Entity\District $district)
    {
        $this->district = $district;

        return $this;
    }

    /**
     * Get district.
     *
     * @return \Address\Entity\District
     */
    public function getDistrict()
    {
        return $this->district;
    }

    /**
     * Set ward.
     *
     * @param \Address\Entity\Ward $ward
     *
     * @return BranchArea
     */
    public function setWard(\Address\Entity\Ward $ward)
    {
        $this->ward = $ward;

        return $this;
    }

    /**
     * Get ward.
     *
     * @return \Address\Entity\Ward
     */
    public function getWard()
    {
        return $this->ward;
    }
}
