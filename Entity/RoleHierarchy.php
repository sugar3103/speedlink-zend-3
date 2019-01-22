<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * RoleHierarchy
 *
 * @ORM\Table(name="role_hierarchy", indexes={@ORM\Index(name="IDX_AB8EFB72A44B56EA", columns={"parent_role_id"}), @ORM\Index(name="IDX_AB8EFB72B4B76AB7", columns={"child_role_id"})})
 * @ORM\Entity
 */
class RoleHierarchy
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
     * @var \Role
     *
     * @ORM\ManyToOne(targetEntity="Role")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="child_role_id", referencedColumnName="id")
     * })
     */
    private $child_role;

    /**
     * @var \Role
     *
     * @ORM\ManyToOne(targetEntity="Role")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parent_role_id", referencedColumnName="id")
     * })
     */
    private $parent_role;

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
     * @return Role
     */
    public function getChildRole()
    {
        return $this->child_role;
    }

    /**
     * @param Role $child_role
     */
    public function setChildRole($child_role)
    {
        $this->child_role = $child_role;
    }

    /**
     * @return Role
     */
    public function getParentRole()
    {
        return $this->parent_role;
    }

    /**
     * @param Role $parent_role
     */
    public function setParentRole($parent_role)
    {
        $this->parent_role = $parent_role;
    }


}
