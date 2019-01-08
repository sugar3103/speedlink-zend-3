<?php

namespace Address\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AddressCode
 *
 * @ORM\Table(name="address_code")
 * @ORM\Entity(repositoryClass="\Address\Repository\AddressCodeRepository")
 */
class AddressCode
{
    /**
     * @var int
     *
     * @ORM\Column(name="address_code_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $addressCodeId;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $code;

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
     * @var int
     *
     * @ORM\Column(name="branch_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $branchId;

    /**
     * @var int
     *
     * @ORM\Column(name="hub_id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $hubId;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $createdAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="update_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updateBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updatedAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="ref_as_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $refAsBy;

    /**
     * @var \Address\Entity\Country
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Country", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="country_id", referencedColumnName="country_id", unique=true, nullable=true)
     * })
     */
    private $country;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\City", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="city_id", referencedColumnName="city_id", unique=true, nullable=true)
     * })
     */
    private $city;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="district_id", referencedColumnName="district_id", unique=true, nullable=true)
     * })
     */
    private $district;

    /**
     * @var \Address\Entity\Ward
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Ward", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ward_id", referencedColumnName="ward_id", unique=true, nullable=true)
     * })
     */
    private $ward;

    /**
     * @var \NetworkPort\Entity\Hub
     *
     * @ORM\OneToOne(targetEntity="NetworkPort\Entity\Hub", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="hub_id", referencedColumnName="hub_id", unique=true, nullable=true)
     * })
     */
    private $hub;

    /**
     * @var \NetworkPort\Entity\Branch
     *
     * @ORM\OneToOne(targetEntity="NetworkPort\Entity\Branch", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="branch_id", referencedColumnName="branch_id", unique=true, nullable=true)
     * })
     */
    private $branch;


    /**
     * Get addressCodeId.
     *
     * @return int
     */
    public function getAddressCodeId()
    {
        return $this->addressCodeId;
    }

    /**
     * Set code.
     *
     * @param string $code
     *
     * @return AddressCode
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
     * Set countryId.
     *
     * @param int $countryId
     *
     * @return AddressCode
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
     * @return AddressCode
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
     * @return AddressCode
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
     * @return AddressCode
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
     * Set branchId.
     *
     * @param int $branchId
     *
     * @return AddressCode
     */
    public function setBranchId($branchId)
    {
        $this->branchId = $branchId;

        return $this;
    }

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
     * @return AddressCode
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
     * Set createdBy.
     *
     * @param int $createdBy
     *
     * @return AddressCode
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
     * @param \DateTime $createdAt
     *
     * @return AddressCode
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updateBy.
     *
     * @param int|null $updateBy
     *
     * @return AddressCode
     */
    public function setUpdateBy($updateBy = null)
    {
        $this->updateBy = $updateBy;

        return $this;
    }

    /**
     * Get updateBy.
     *
     * @return int|null
     */
    public function getUpdateBy()
    {
        return $this->updateBy;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime|null $updatedAt
     *
     * @return AddressCode
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
     * Set refAsBy.
     *
     * @param int|null $refAsBy
     *
     * @return AddressCode
     */
    public function setRefAsBy($refAsBy = null)
    {
        $this->refAsBy = $refAsBy;

        return $this;
    }

    /**
     * Get refAsBy.
     *
     * @return int|null
     */
    public function getRefAsBy()
    {
        return $this->refAsBy;
    }

    /**
     * Set country.
     *
     * @param \Address\Entity\Country|null $country
     *
     * @return AddressCode
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
     * Set city.
     *
     * @param \Address\Entity\City|null $city
     *
     * @return AddressCode
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
     * Set district.
     *
     * @param \Address\Entity\District|null $district
     *
     * @return AddressCode
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
     * Set ward.
     *
     * @param \Address\Entity\Ward|null $ward
     *
     * @return AddressCode
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
     * Set hub.
     *
     * @param \NetworkPort\Entity\Hub|null $hub
     *
     * @return AddressCode
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
     * Set branch.
     *
     * @param \NetworkPort\Entity\Branch|null $branch
     *
     * @return AddressCode
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
}
