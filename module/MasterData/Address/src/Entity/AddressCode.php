<?php
namespace Address\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AddressCode
 *
 * @ORM\Table(name="address_code", uniqueConstraints={@ORM\UniqueConstraint(name="unique_address_code_id", columns={"id", "code"})})
 * @ORM\Entity(repositoryClass="\Address\Repository\AddressCodeRepository")
 */
class AddressCode
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
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=50, nullable=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="country_id", type="integer", nullable=false)
     */
    private $country_id;

    /**
     * @var int
     *
     * @ORM\Column(name="city_id", type="integer", nullable=false)
     */
    private $city_id;

    /**
     * @var int
     *
     * @ORM\Column(name="district_id", type="integer", nullable=false)
     */
    private $district_id;

    /**
     * @var int
     *
     * @ORM\Column(name="ward_id", type="integer", nullable=false)
     */
    private $ward_id;

    /**
     * @var int
     *
     * @ORM\Column(name="branch_id", type="integer", nullable=false)
     */
    private $branch_id;

    /**
     * @var int
     *
     * @ORM\Column(name="hub_id", type="integer", nullable=false)
     */
    private $hub_id;

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
     * @var int|null
     *
     * @ORM\Column(name="ref_as_by", type="integer", nullable=true)
     */
    private $ref_as_by;

    /**
     * @var \Address\Entity\Country
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Country", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="country_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $country;

    /**
     * @var \Address\Entity\City
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\City", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="city_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $city;

    /**
     * @var \Address\Entity\District
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\District", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="district_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $district;

    /**
     * @var \Address\Entity\Ward
     *
     * @ORM\OneToOne(targetEntity="Address\Entity\Ward", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ward_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $ward;

    /**
     * @var \NetworkPort\Entity\Hub
     *
     * @ORM\OneToOne(targetEntity="NetworkPort\Entity\Hub", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="hub_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $hub;

    /**
     * @var \NetworkPort\Entity\Branch
     *
     * @ORM\OneToOne(targetEntity="NetworkPort\Entity\Branch", inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="branch_id", referencedColumnName="id", unique=true, nullable=true)
     * })
     */
    private $branch;

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
    public function getCountryId()
    {
        return $this->country_id;
    }

    /**
     * @param int $country_id
     */
    public function setCountryId($country_id)
    {
        $this->country_id = $country_id;
    }

    /**
     * @return int
     */
    public function getCityId()
    {
        return $this->city_id;
    }

    /**
     * @param int $city_id
     */
    public function setCityId($city_id)
    {
        $this->city_id = $city_id;
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
     * @return int
     */
    public function getWardId()
    {
        return $this->ward_id;
    }

    /**
     * @param int $ward_id
     */
    public function setWardId($ward_id)
    {
        $this->ward_id = $ward_id;
    }

    /**
     * @return int
     */
    public function getBranchId()
    {
        return $this->branch_id;
    }

    /**
     * @param int $branch_id
     */
    public function setBranchId($branch_id)
    {
        $this->branch_id = $branch_id;
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
     * @return DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param DateTime $created_at
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
     * @return DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param DateTime|null $updated_at
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

}
