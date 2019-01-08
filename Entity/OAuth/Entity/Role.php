<?php

namespace OAuth\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Role
 *
 * @ORM\Table(name="role")
 * @ORM\Entity(repositoryClass="\OAuth\Repository\RoleRepository")
 */
class Role
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", precision=0, scale=0, nullable=false, unique=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $description;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="deleted_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $deletedAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $updatedAt;

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
     * @return string
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
     * Set description.
     *
     * @param string $description
     *
     * @return Role
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

    /**
     * Set deletedAt.
     *
     * @param \DateTime $deletedAt
     *
     * @return Role
     */
    public function setDeletedAt($deletedAt)
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * Get deletedAt.
     *
     * @return \DateTime
     */
    public function getDeletedAt()
    {
        return $this->deletedAt;
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
     * Set updatedAt.
     *
     * @param \DateTime $updatedAt
     *
     * @return Role
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
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
