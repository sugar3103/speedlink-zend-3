<?php

namespace OAuth\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Role
 *
 * @ORM\Table(name="role", uniqueConstraints={@ORM\UniqueConstraint(name="role_id_uindex", columns={"id"})})
 * @ORM\Entity(repositoryClass="\OAuth\Repository\RoleRepository")
 */
class Role
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="name_en", type="string", length=100, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name_en;

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
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, options={"default"="CURRENT_TIMESTAMP"}, unique=false)
     */
    private $created_at = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $updated_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=true, options={"default"="CURRENT_TIMESTAMP"}, unique=false)
     */
    private $updated_at = 'CURRENT_TIMESTAMP';

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description_en;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="OAuth\Entity\Role")
     * @ORM\JoinTable(name="role_hierarchy",
     *   joinColumns={
     *     @ORM\JoinColumn(name="child_role_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="parent_role_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $parentRoles;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="OAuth\Entity\Role")
     * @ORM\JoinTable(name="role_hierarchy",
     *   joinColumns={
     *     @ORM\JoinColumn(name="parent_role_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="child_role_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $childRoles;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="OAuth\Entity\Permission")
     * @ORM\JoinTable(name="role_permission",
     *   joinColumns={
     *     @ORM\JoinColumn(name="role_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="permission_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $permissions;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->parentRoles = new \Doctrine\Common\Collections\ArrayCollection();
        $this->childRoles = new \Doctrine\Common\Collections\ArrayCollection();
        $this->permissions = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set name.
     *
     * @param string $name
     *
     * @return Role
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
     * Set nameEn.
     *
     * @param string $nameEn
     *
     * @return Role
     */
    public function setNameEn($nameEn)
    {
        $this->name_en = $nameEn;

        return $this;
    }

    /**
     * Get nameEn.
     *
     * @return string
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return Role
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
     * @return Role
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
     * @return Role
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
     * @param \DateTime $createdAt
     *
     * @return Role
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
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
     * @return Role
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
     * @return Role
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
     * Set description.
     *
     * @param string|null $description
     *
     * @return Role
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
     * Set descriptionEn.
     *
     * @param string|null $descriptionEn
     *
     * @return Role
     */
    public function setDescriptionEn($descriptionEn = null)
    {
        $this->description_en = $descriptionEn;

        return $this;
    }

    /**
     * Get descriptionEn.
     *
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * Add parentRole.
     *
     * @param \OAuth\Entity\Role $parentRole
     *
     * @return Role
     */
    public function addParentRole(\OAuth\Entity\Role $parentRole)
    {
        $this->parentRoles[] = $parentRole;

        return $this;
    }

    /**
     * Remove parentRole.
     *
     * @param \OAuth\Entity\Role $parentRole
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeParentRole(\OAuth\Entity\Role $parentRole)
    {
        return $this->parentRoles->removeElement($parentRole);
    }

    /**
     * Get parentRoles.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParentRoles()
    {
        return $this->parentRoles;
    }

    /**
     * Add childRole.
     *
     * @param \OAuth\Entity\Role $childRole
     *
     * @return Role
     */
    public function addChildRole(\OAuth\Entity\Role $childRole)
    {
        $this->childRoles[] = $childRole;

        return $this;
    }

    /**
     * Remove childRole.
     *
     * @param \OAuth\Entity\Role $childRole
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeChildRole(\OAuth\Entity\Role $childRole)
    {
        return $this->childRoles->removeElement($childRole);
    }

    /**
     * Get childRoles.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildRoles()
    {
        return $this->childRoles;
    }

    /**
     * Add permission.
     *
     * @param \OAuth\Entity\Permission $permission
     *
     * @return Role
     */
    public function addPermission(\OAuth\Entity\Permission $permission)
    {
        $this->permissions[] = $permission;

        return $this;
    }

    /**
     * Remove permission.
     *
     * @param \OAuth\Entity\Permission $permission
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removePermission(\OAuth\Entity\Permission $permission)
    {
        return $this->permissions->removeElement($permission);
    }

    /**
     * Get permissions.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPermissions()
    {
        return $this->permissions;
    }
}
