<?php
namespace Address\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="ward")
 * @ORM\Entity(repositoryClass="\Address\Repository\WardRepository")
 */
class Ward {

    const ACTIVE = 1;
    const INACTIVE = 0;

    /**
     * @ORM\Id()
     * @ORM\Column(name="ward_id")
     * @ORM\GeneratedValue()
     */
    protected $ward_id;

    /**
     * @ORM\Column(name="city_id", type="integer", unique=true)
     */
    protected $city_id;

    /**
     * @ORM\Column(name="name", type="string", unique=true)
     */
    protected $name;

    /**
     * @ORM\Column(name="description", type="string")
     */
    protected $description;

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
    protected $updated_at;

    /**
     * @ORM\Column(type="integer", name="status")
     */
    protected $status;
    
    /**
     * @ORM\Column(type="text", name="zip_code")
     */
    protected $zip_code;

    /**
     * Role constructor.
     */
    public function __construct()
    {
    }

    /**
     * Returns role Id.
     *
     * @return integer
     */
    public function getId() {
        return $this->ward_id;
    }

    /**
     * Set Role Id.
     *
     * @param $id
     */
    public function setId($id) {
        $this->ward_id = $id;
    }

    /**
     * Get Role Name.
     *
     * @return mixed
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set Role Name.
     *
     * @param $name
     */
    public function setName($name) {
        $this->name = $name;
    }

    /**
     * Get Role Description.
     *
     * @return mixed
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * Set Role Description.
     *
     * @param $description
     */
    public function setDescription($description) {
        $this->description = $description;
    }

    /**
     * Get Role Created Date.
     *
     * @return mixed
     */
    public function getCreatedAt() {
        return $this->created_at;
    }

    /**
     * Set Role Created Date.
     *
     * @param $created_at
     */
    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
    }

    /**
     * Get Role Created Date.
     *
     * @return mixed
     */
    public function getCreatedBy() {
        return $this->created_by;
    }

    /**
     * Set Role Created Date.
     *
     * @param $created_at
     */
    public function setCreatedBy($created_by) {
        $this->created_by = $created_by;
    }

    /**
     * Get Role Updated Date.
     *
     * @return mixed
     */
    public function getUpdatedAt() {
        return $this->updated_at;
    }

    /**
     * Set Role Updated Date.
     *
     * @param $updated_at
     */
    public function setUpdatedAt($updated_at) {
        $this->updated_at = $updated_at;
    }

    
    /**
     * Get Is Active
     *
     * @return mixed
     */
    public function getStatus() {
        return $this->status;
    }

    /**
     * Set Is Active.
     *
     * @param $status
     */
    public function setStatus($status) {
        $this->status = $status;
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

        if(!empty($value) && isset($status[$value])) {
            return $status[$value];
        }
        return $status;
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

    
}