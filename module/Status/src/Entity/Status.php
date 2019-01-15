<?php 
namespace Status\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="status")
 * @ORM\Entity(repositoryClass="\Status\Repository\StatusRepository")
 */
class Status 
{

    const ACTIVE = 1;
    const INACTIVE = 0;
    
    /**
     * @ORM\Id
     * @ORM\Column(name="status_id", type="integer")
     * @ORM\GeneratedValue
     */
    protected $status_id;

    /**
     * @ORM\Column(type="string",name="name",unique=true)
     */
    protected $name;

    /**
     * @ORM\Column(type="string",name="name_en",unique=true)
     */
    protected $name_en;

    /**
     * @ORM\Column(type="text", name="description")
     */
    protected $description;

    /**
     * @ORM\Column(type="text", name="description_en")
     */
    protected $description_en;

    /**
     * @ORM\Column(type="integer", name="status")
     */
    protected $status;

    /**
     * @ORM\Column(type="integer", name="created_by")
     */
    protected $created_by;

    /**
     * @ORM\Column(type="datetime",name="created_at")
     */
    protected $created_at;

     /**
     * @ORM\Column(type="integer", name="updated_by")
     */
    protected $updated_by;

    /**
     * @ORM\Column(type="datetime",name="updated_at")
     */
    protected $updated_at;

    /**
     * Get Id
     *
     * @return mixed
     */
    public function getId() {
        return $this->status_id;
    }

    /**
     * Set Id
     *
     * @param $id
     */
    public function setId($id) {
        $this->status_id = $id;
    }

    /**
     * Get name
     *
     * @return mixed
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set name
     *
     * @param $name
     */
    public function setName($name) {
        $this->name = $name;
    }

    /**
     * Get name en
     *
     * @return mixed
     */
    public function getNameEn() {
        return $this->name_en;
    }

    /**
     * Set name english
     *
     * @param $nameEn
     */
    public function setNameEn($nameEn) {
        $this->name_en = $nameEn;
    }

    /**
     * Get description
     *
     * @return mixed
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * Set description
     *
     * @param $description
     */
    public function setDescription($description) {
        $this->description = $description;
    }

    /**
     * Get description en
     *
     * @return mixed
     */
    public function getDescriptionEn() {
        return $this->description_en;
    }

    /**
     * Set description en
     *
     * @param $descriptionEn
     */
    public function setDescriptionEn($descriptionEn) {
        $this->description_en = $descriptionEn;
    }

    /**
     * Get status
     *
     * @return mixed
     */
    public function getStatus() {
        return $this->status;
    }

    /**
     * Set status
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

        if(isset($value) && isset($status[$value])) {
            return $status[$value];
        }
        return $status;
    }

    /**
     * Get Created By
     *
     * @return mixed
     */
    public function getCreatedBy() {
        return $this->created_by;
    }

    /**
     * Set Created By
     *
     * @param $created_by
     */
    public function setCreatedBy($created_by) {
        $this->created_by = $created_by;
    }

    /**
     * Get Created At
     *
     * @return mixed
     */
    public function getCreatedAt() {
        return $this->created_at;
    }

    /**
     * Set Created At
     *
     * @param $created_at
     */
    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
    }

    /**
     * Get Updated By
     *
     * @return mixed
     */
    public function getUpdatedBy() {
        return $this->updated_by;
    }

    /**
     * Set Updated By
     *
     * @param $updated_by
     */
    public function setUpdatedBy($updated_by) {
        $this->updated_by = $updated_by;
    }

    /**
     * Get Updated At
     *
     * @return mixed
     */
    public function getUpdatedAt() {
        return $this->updated_at;
    }

    /**
     * Set Updated At
     *
     * @param $updated_at
     */
    public function setUpdatedAt($updated_at) {
        $this->updated_at = $updated_at;
    }

}

?>