<?php
namespace OAuth\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use OAuth\Entity\Role;

/**
 * User
 *
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="unique_username", columns={"username"})})
 * @ORM\Entity(repositoryClass="\OAuth\Repository\UserRepository")
 */
class User
{
    const ACTIVE = 1;
    const INACTIVE = 0;

    const LOCAL_USER = 0;
    const LDAP_USER = 1;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="email", type="string", length=100, nullable=true)
     */
    private $email;

    /**
     * @var string|null
     *
     * @ORM\Column(name="password", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="first_name", type="string", length=100, nullable=true)
     */
    private $first_name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="last_name", type="string", length=100, nullable=true)
     */
    private $last_name;

    /**
     * @var int
     *
     * @ORM\Column(name="is_active", type="integer", nullable=false, options={"comment"="active=1,inactive=0"})
     */
    private $is_active = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="is_admin", type="integer", nullable=false)
     */
    private $is_admin = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="is_ldap", type="integer", nullable=false)
     */
    private $is_ldap = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=100, nullable=false)
     */
    private $username;

    /**
     * @var string|null
     *
     * @ORM\Column(name="password_reset_token", type="string", length=32, nullable=true)
     */
    private $password_reset_token;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="password_reset_token_created_at", type="datetime", nullable=true)
     */
    private $password_reset_token_created_at;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", length=5, nullable=false, options={"default"="en_US","fixed"=true})
     */
    private $language = 'en_US';

    /**
     * @var string|null
     *
     * @ORM\Column(name="last_token", type="string", length=255, nullable=true)
     */
    private $last_token;

    /**
     * @var int|null
     *
     * @ORM\Column(name="created_by", type="integer", nullable=true)
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
     * @var \DateTime|null
     *
     * @ORM\Column(name="last_token_created_at", type="datetime", nullable=true)
     */
    private $last_token_created_at;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="OAuth\Entity\Role")
     * @ORM\JoinTable(name="user_role",
     *   joinColumns={
     *     @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="role_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $roles;

    /**
     *
     * @ORM\OneToOne(targetEntity="\OAuth\Entity\User")
     * @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=true)
     */
    private $join_updated;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->roles = new ArrayCollection();
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
     * @return string|null
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string|null $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return string|null
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string|null $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return string|null
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * @param string|null $first_name
     */
    public function setFirstName($first_name)
    {
        $this->first_name = $first_name;
    }

    /**
     * @return string|null
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * @param string|null $last_name
     */
    public function setLastName($last_name)
    {
        $this->last_name = $last_name;
    }

    /**
     * @return int
     */
    public function getisActive()
    {
        return $this->is_active;
    }

    /**
     * @param int $is_active
     */
    public function setIsActive($is_active)
    {
        $this->is_active = $is_active;
    }

    /**
     * @return int
     */
    public function getisAdmin()
    {
        return $this->is_admin;
    }

    /**
     * @param int $is_admin
     */
    public function setIsAdmin($is_admin)
    {
        $this->is_admin = $is_admin;
    }

    /**
     * @return int
     */
    public function getisLdap()
    {
        return $this->is_ldap;
    }

    /**
     * @param int $is_ldap
     */
    public function setIsLdap($is_ldap)
    {
        $this->is_ldap = $is_ldap;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return string|null
     */
    public function getPasswordResetToken()
    {
        return $this->password_reset_token;
    }

    /**
     * @param string|null $password_reset_token
     */
    public function setPasswordResetToken($password_reset_token)
    {
        $this->password_reset_token = $password_reset_token;
    }

    /**
     * @return \DateTime|null
     */
    public function getPasswordResetTokenCreatedAt()
    {
        return $this->password_reset_token_created_at;
    }

    /**
     * @param \DateTime|null $password_reset_token_created_at
     */
    public function setPasswordResetTokenCreatedAt($password_reset_token_created_at)
    {
        $this->password_reset_token_created_at = $password_reset_token_created_at;
    }

    /**
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @param string $language
     */
    public function setLanguage($language)
    {
        $this->language = $language;
    }

    /**
     * @return string|null
     */
    public function getLastToken()
    {
        return $this->last_token;
    }

    /**
     * @param string|null $last_token
     */
    public function setLastToken($last_token)
    {
        $this->last_token = $last_token;
    }

    /**
     * @return int|null
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * @param int|null $created_by
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
     * @return \DateTime|null
     */
    public function getLastTokenCreatedAt()
    {
        return $this->last_token_created_at;
    }

    /**
     * @param \DateTime|null $last_token_created_at
     */
    public function setLastTokenCreatedAt($last_token_created_at)
    {
        $this->last_token_created_at = $last_token_created_at;
    }

    /**
     * Add role.
     *
     * @param \OAuth\Entity\Role $role
     *
     * @return User
     */
    public function addRole(Role $role)
    {
        $this->roles[] = $role;

        return $this;
    }

    /**
     * Remove role.
     *
     * @param \OAuth\Entity\Role $role
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeRole(Role $role)
    {
        return $this->roles->removeElement($role);
    }

    /**
     * Get roles.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * Return roles list as string.
     *
     * @return string
     */
    public function getRolesAsString() {
        $roleList = '';        
        $count = count($this->roles);
        $i = 0;
        foreach ($this->roles as $role) {
            $roleList .= $role->getName();
            if ($i < $count-1)
                $roleList .= ', ';
            $i++;
        }
        return $roleList;
    }
    /**
     * Return roles list as ids.
     *
     * @return array
     */
    public function getRoleIds() {
        $roleList = array();        
        $count = count($this->roles);
        
        foreach ($this->roles as $role) {
            $roleList[] = $role->getId();            
        }

        return $roleList;
    }

    /**
     * Returns user status as string.
     * @return string
     */
    public function getIsActiveAsString()
    {
        $list = self::getIsActiveList();
        if (isset($list[$this->is_active]))
            return $list[$this->is_active];

        return 'Unknown';
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
     * @return mixed
     */
    public function getJoinUpdated()
    {
        return $this->join_updated;
    }

    /**
     * @param mixed $join_updated
     */
    public function setJoinUpdated($join_updated)
    {
        $this->join_updated = $join_updated;
    }
}
