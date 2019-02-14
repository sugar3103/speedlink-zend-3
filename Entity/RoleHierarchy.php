<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * RoleHierarchy
 *
 * @ORM\Table(name="role_hierarchy", indexes={@ORM\Index(name="IDX_AB8EFB72B4B76AB7", columns={"child_role_id"}), @ORM\Index(name="IDX_AB8EFB72A44B56EA", columns={"parent_role_id"})})
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
    private $childRole;

    /**
     * @var \Role
     *
     * @ORM\ManyToOne(targetEntity="Role")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parent_role_id", referencedColumnName="id")
     * })
     */
    private $parentRole;


}
