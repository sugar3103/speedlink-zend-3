<?php
namespace OAuth\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="\OAuth\Repository\PermissionRepository")
 * @ORM\Table(name="permission")
 */
class Permission {

    /**
     * @ORM\Id()
     * @ORM\Column(name="id")
     * @ORM\GeneratedValue()
     */
    protected $id;

    /**
     * @ORM\Column(name="name", type="string", unique=true)
     */
    protected $name;

    /**
     * @ORM\Column(name="description", type="string")
     */
    protected $description;

    /**
     * @ORM\Column(name="deleted_at",type="datetime")
     */
    protected $deletedAt;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="\OAuth\Entity\Role", mappedBy="permissions")
     * @ORM\JoinTable(name="role_permission",
     *      joinColumns={@ORM\JoinColumn(name="permission_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="role_id", referencedColumnName="id")}
     *      )
     */
    protected $roles;

    /**
     * Permission constructor.
     */
    public function __construct()
    {
        $this->roles = new ArrayCollection();
    }

    /**
     * Get Permission Id.
     *
     * @return mixed
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set Permission Id.
     *
     * @param $id
     */
    public function setId($id) {
        $this->id = $id;
    }

    /**
     * Get Permission Name.
     *
     * @return mixed
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set Permission Name.
     *
     * @param $name
     */
    public function setName($name) {
        $this->name = $name;
    }

    /**
     * Get Permission Description.
     *
     * @return mixed
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * Set Permission Description.
     *
     * @param $description
     * @return mixed
     */
    public function setDescription($description) {
        return $this->description = $description;
    }

    /**
     * Get Permission Created Date.
     *
     * @return mixed
     */
    public function getCreatedAt() {
        return $this->createdAt;
    }

    /**
     * Set Permission Created Date.
     *
     * @param $createdAt
     */
    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
    }

    /**
     * Get Deleted At.
     *
     * @return mixed
     */
    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    /**
     * Set Deleted At.
     *
     * @param updatedAt
     */
    public function setUpdatedAt($updatedAt) {
        $this->updatedAt = $updatedAt;
    }

    /**
     * Get Deleted At.
     *
     * @return mixed
     */
    public function getDeletedAt() {
        return $this->deletedAt;
    }

    /**
     * Set Deleted At.
     *
     * @param $deletedAt
     */
    public function setDeletedAt($deletedAt) {
        $this->deletedAt = $deletedAt;
    }


    /**
     * Get Roles belong to this permission.
     *
     * @return ArrayCollection
     */
    public function getRoles() {
        return $this->roles;
    }
}