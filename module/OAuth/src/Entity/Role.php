<?php
namespace OAuth\Entity;

use Doctrine\Common\Collections\ArrayCollection;
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
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="name_en", type="string", length=100, nullable=false)
     */
    private $name_en;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="CURRENT_TIMESTAMP"})
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
     * @ORM\Column(name="updated_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $updated_at;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, nullable=true)
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
        $this->parentRoles = new ArrayCollection();
        $this->childRoles = new ArrayCollection();
        $this->permissions = new ArrayCollection();
    }

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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * @param string $name_en
     */
    public function setNameEn($name_en)
    {
        $this->name_en = $name_en;
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
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param \DateTime $created_at
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
     * @return \DateTime|null
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param \DateTime|null $updated_at
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }

    /**
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string|null
     */
    public function getDescriptionEn()
    {
        return $this->description_en;
    }

    /**
     * @param string|null $description_en
     */
    public function setDescriptionEn($description_en)
    {
        $this->description_en = $description_en;
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
