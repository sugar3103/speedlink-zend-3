<?php
namespace OAuth\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="role")
 * @ORM\Entity(repositoryClass="\OAuth\Repository\RoleRepository")
 */
class Role {

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
     * @ORM\ManyToMany(targetEntity="\OAuth\Entity\Role")
     * @ORM\JoinTable(name="role_hierarchy",
     *     joinColumns={@ORM\JoinColumn(name="child_role_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="parent_role_id", referencedColumnName="id")})
     */
    protected $parentRoles;

    /**
     * @ORM\ManyToMany(targetEntity="\OAuth\Entity\Role")
     * @ORM\JoinTable(name="role_hierarchy",
     *     joinColumns={@ORM\JoinColumn(name="parent_role_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="child_role_id", referencedColumnName="id")})
     */
    protected $childRoles;

    /**
     * @ORM\ManyToMany(targetEntity="\OAuth\Entity\Permission")
     * @ORM\JoinTable(name="role_permission",
     *     joinColumns={@ORM\JoinColumn(name="role_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="permission_id", referencedColumnName="id")})
     */
    private $permissions;

    /**
     * Role constructor.
     */
    public function __construct()
    {
        $this->parentRoles = new ArrayCollection();
        $this->childRoles = new ArrayCollection();
        $this->permissions = new ArrayCollection();
    }

    /**
     * Returns role Id.
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set Role Id.
     *
     * @param $id
     */
    public function setId($id) {
        $this->id = $id;
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
        return $this->createdAt;
    }

    /**
     * Set Role Created Date.
     *
     * @param $createdAt
     */
    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
    }

    /**
     * Get Role Updated Date.
     *
     * @return mixed
     */
    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    /**
     * Set Role Updated Date.
     *
     * @param $updatedAt
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
     * Get Parent Roles.
     *
     * @return ArrayCollection
     */
    public function getParentRoles() {
        return $this->parentRoles;
    }

    /**
     * Get Child Roles.
     *
     * @return ArrayCollection
     */
    public function getChildRoles() {
        return $this->childRoles;
    }

    /**
     * Get Permissions.
     *
     * @return ArrayCollection
     */
    public function getPermissions() {
        return $this->permissions;
    }

    /**
     * Add Parent Role.
     *
     * @param Role $role
     * @return bool
     */
    public function addParent(Role $role) {

        if ((int) $this->getId() == (int) $role->getId())
            return false;


        if (!$this->hasParent($role)) {
            $this->parentRoles[] = $role;
            return true;
        }

        return false;
    }

    /**
     * Clear all parent Roles.
     */
    public function clearParentRoles() {
        $this->parentRoles = new ArrayCollection();
    }

    /**
     * Check if this Role has parent role.
     *
     * @param Role $role
     * @return bool
     */
    public function hasParent(Role $role) {
        if ($this->getParentRoles()->contains($role))
            return true;

        return false;
    }
}