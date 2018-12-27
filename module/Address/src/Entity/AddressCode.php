<?php
namespace Address\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="address_code")
 * @ORM\Entity(repositoryClass="\Address\Repository\AddressCodeRepository")
 */
class AddressCode {

    /**
     * @ORM\Id()
     * @ORM\Column(name="address_code_id")
     * @ORM\GeneratedValue()
     */
    protected $address_code_id;

    /**
     * @ORM\Column(name="code", type="string")
     */
    protected $code;

    /**
     * @ORM\Column(name="country_id", type="integer")
     */
    protected $country_id;

    /**
     * @ORM\Column(name="city_id", type="integer")
     */
    protected $city_id;

    /**
     * @ORM\Column(name="district_id", type="integer")
     */
    protected $district_id;

    /**
     * @ORM\Column(name="ward_id", type="integer")
     */
    protected $ward_id;

    /**
     * @ORM\Column(name="branch_id", type="integer")
     */
    protected $branch_id;

    /**
     * @ORM\Column(type="integer", name="hub_id")
     */
    protected $hub_id;
    
    
    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $created_at;

    /**
     * @ORM\Column(name="created_by", type="integer")
     */
    protected $created_by;

    /**
     * @ORM\Column(name="updated_at", type="datetime")
     */

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\City" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="city_id", referencedColumnName="city_id", nullable=true)
     */
    protected $city;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\District" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="district_id", referencedColumnName="district_id", nullable=true)
     */
    protected $district;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\Ward" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="ward_id", referencedColumnName="ward_id", nullable=true)
     */
    protected $ward;

    public function __construct()
    {
    }

    /**
     * Returns address code Id.
     *
     * @return integer
     */
    public function getId() {
        return $this->address_code_id;
    }

    /**
     * Set Address Code Id.
     *
     * @param $id
     */
    public function setId($id) {
        $this->address_code_id = $id;
    }

    /**
     * Get Address Code Name.
     *
     * @return mixed
     */
    public function getCode() {
        return $this->code;
    }

    /**
     * Set Address Code Name.
     *
     * @param $name
     */
    public function setCode($code) {
        $this->code = $code;
    }

    /**
     * Get Address Code Created Date.
     *
     * @return mixed
     */
    public function getCreatedAt() {
        return $this->created_at;
    }

    /**
     * Set Address Code Created Date.
     *
     * @param $created_at
     */
    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
    }

    /**
     * Get Address Code Created Date.
     *
     * @return mixed
     */
    public function getCreatedBy() {
        return $this->created_by;
    }

    /**
     * Set Address Code Created Date.
     *
     * @param $created_at
     */
    public function setCreatedBy($created_by) {
        $this->created_by = $created_by;
    }

  
    /**
     * Set Country Id
     * 
     * @param $country_id
     */
    public function setCountryId($country_id)
    {
        $this->country_id = $country_id;
    }

    /**
     * Get Country Id
     * 
     * @return integer
     */
    public function getCountryId()
    {
        return $this->country_id;
    }

    
    /**
     * Set City Id
     * 
     * @param $city_id
     */
    public function setCityId($city_id)
    {
        $this->city_id = $city_id;
    }

    /**
     * Get City Id
     * 
     * @return integer
     */
    public function getCityId()
    {
        return $this->city_id;
    }

     /**
     * Set District Id
     * 
     * @param $district_id
     */
    public function setDistrictId($district_id)
    {
        $this->district_id = $district_id;
    }

    /**
     * Get District Id
     * 
     * @return integer
     */
    public function getDistrictId()
    {
        return $this->district_id;
    }

     /**
     * Set Ward Id
     * 
     * @param $ward_id
     */
    public function setWardId($ward_id)
    {
        $this->ward_id = $ward_id;
    }

    /**
     * Get Ward Id
     * 
     * @return integer
     */
    public function getWardId()
    {
        return $this->ward_id;
    }

     /**
     * Set Branch Id
     * 
     * @param $branch_id
     */
    public function setBranchId($branch_id)
    {
        $this->branch_id = $branch_id;
    }

    /**
     * Get Branch Id
     * 
     * @return integer
     */
    public function getBranchId()
    {
        return $this->branch_id;
    }

     /**
     * Set Hub Id
     * 
     * @param $hub_id
     */
    public function setHubId($hub_id)
    {
        $this->hub_id = $hub_id;
    }

    /**
     * Get Hub Id
     * 
     * @return integer
     */
    public function getHubId()
    {
        return $this->hub_id;
    }

    
}