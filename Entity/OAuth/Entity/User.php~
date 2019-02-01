<?php

namespace OAuth\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="unique_username", columns={"username"})})
 * @ORM\Entity(repositoryClass="\OAuth\Repository\UserRepository")
 */
class User
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
     * @var string|null
     *
     * @ORM\Column(name="email", type="string", length=100, precision=0, scale=0, nullable=true, unique=false)
     */
    private $email;

    /**
     * @var string|null
     *
     * @ORM\Column(name="password", type="string", length=60, precision=0, scale=0, nullable=true, options={"fixed"=true}, unique=false)
     */
    private $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="first_name", type="string", length=100, precision=0, scale=0, nullable=true, unique=false)
     */
    private $first_name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="last_name", type="string", length=100, precision=0, scale=0, nullable=true, unique=false)
     */
    private $last_name;

    /**
     * @var int
     *
     * @ORM\Column(name="is_active", type="integer", precision=0, scale=0, nullable=false, options={"comment"="active=1,inactive=0"}, unique=false)
     */
    private $is_active;

    /**
     * @var int
     *
     * @ORM\Column(name="is_admin", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_admin;

    /**
     * @var int
     *
     * @ORM\Column(name="is_ldap", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $is_ldap;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=100, precision=0, scale=0, nullable=false, unique=false)
     */
    private $username;

    /**
     * @var string|null
     *
     * @ORM\Column(name="password_reset_token", type="string", length=32, precision=0, scale=0, nullable=true, unique=false)
     */
    private $password_reset_token;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="password_reset_token_created_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $password_reset_token_created_at;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", length=5, precision=0, scale=0, nullable=false, options={"default"="en_US","fixed"=true}, unique=false)
     */
    private $language = 'en_US';

    /**
     * @var string|null
     *
     * @ORM\Column(name="last_token", type="string", length=255, precision=0, scale=0, nullable=true, unique=false)
     */
    private $last_token;

    /**
     * @var int|null
     *
     * @ORM\Column(name="created_by", type="integer", precision=0, scale=0, nullable=true, unique=false)
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
     * @var \DateTime|null
     *
     * @ORM\Column(name="last_token_created_at", type="datetime", precision=0, scale=0, nullable=true, unique=false)
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
     * Constructor
     */
    public function __construct()
    {
        $this->roles = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set email.
     *
     * @param string|null $email
     *
     * @return User
     */
    public function setEmail($email = null)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string|null
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password.
     *
     * @param string|null $password
     *
     * @return User
     */
    public function setPassword($password = null)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password.
     *
     * @return string|null
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set firstName.
     *
     * @param string|null $firstName
     *
     * @return User
     */
    public function setFirstName($firstName = null)
    {
        $this->first_name = $firstName;

        return $this;
    }

    /**
     * Get firstName.
     *
     * @return string|null
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * Set lastName.
     *
     * @param string|null $lastName
     *
     * @return User
     */
    public function setLastName($lastName = null)
    {
        $this->last_name = $lastName;

        return $this;
    }

    /**
     * Get lastName.
     *
     * @return string|null
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * Set isActive.
     *
     * @param int $isActive
     *
     * @return User
     */
    public function setIsActive($isActive)
    {
        $this->is_active = $isActive;

        return $this;
    }

    /**
     * Get isActive.
     *
     * @return int
     */
    public function getIsActive()
    {
        return $this->is_active;
    }

    /**
     * Set isAdmin.
     *
     * @param int $isAdmin
     *
     * @return User
     */
    public function setIsAdmin($isAdmin)
    {
        $this->is_admin = $isAdmin;

        return $this;
    }

    /**
     * Get isAdmin.
     *
     * @return int
     */
    public function getIsAdmin()
    {
        return $this->is_admin;
    }

    /**
     * Set isLdap.
     *
     * @param int $isLdap
     *
     * @return User
     */
    public function setIsLdap($isLdap)
    {
        $this->is_ldap = $isLdap;

        return $this;
    }

    /**
     * Get isLdap.
     *
     * @return int
     */
    public function getIsLdap()
    {
        return $this->is_ldap;
    }

    /**
     * Set username.
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username.
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set passwordResetToken.
     *
     * @param string|null $passwordResetToken
     *
     * @return User
     */
    public function setPasswordResetToken($passwordResetToken = null)
    {
        $this->password_reset_token = $passwordResetToken;

        return $this;
    }

    /**
     * Get passwordResetToken.
     *
     * @return string|null
     */
    public function getPasswordResetToken()
    {
        return $this->password_reset_token;
    }

    /**
     * Set passwordResetTokenCreatedAt.
     *
     * @param \DateTime|null $passwordResetTokenCreatedAt
     *
     * @return User
     */
    public function setPasswordResetTokenCreatedAt($passwordResetTokenCreatedAt = null)
    {
        $this->password_reset_token_created_at = $passwordResetTokenCreatedAt;

        return $this;
    }

    /**
     * Get passwordResetTokenCreatedAt.
     *
     * @return \DateTime|null
     */
    public function getPasswordResetTokenCreatedAt()
    {
        return $this->password_reset_token_created_at;
    }

    /**
     * Set language.
     *
     * @param string $language
     *
     * @return User
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * Get language.
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set lastToken.
     *
     * @param string|null $lastToken
     *
     * @return User
     */
    public function setLastToken($lastToken = null)
    {
        $this->last_token = $lastToken;

        return $this;
    }

    /**
     * Get lastToken.
     *
     * @return string|null
     */
    public function getLastToken()
    {
        return $this->last_token;
    }

    /**
     * Set createdBy.
     *
     * @param int|null $createdBy
     *
     * @return User
     */
    public function setCreatedBy($createdBy = null)
    {
        $this->created_by = $createdBy;

        return $this;
    }

    /**
     * Get createdBy.
     *
     * @return int|null
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
     * @return User
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
     * @return User
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
     * @return User
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
     * Set lastTokenCreatedAt.
     *
     * @param \DateTime|null $lastTokenCreatedAt
     *
     * @return User
     */
    public function setLastTokenCreatedAt($lastTokenCreatedAt = null)
    {
        $this->last_token_created_at = $lastTokenCreatedAt;

        return $this;
    }

    /**
     * Get lastTokenCreatedAt.
     *
     * @return \DateTime|null
     */
    public function getLastTokenCreatedAt()
    {
        return $this->last_token_created_at;
    }

    /**
     * Add role.
     *
     * @param \OAuth\Entity\Role $role
     *
     * @return User
     */
    public function addRole(\OAuth\Entity\Role $role)
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
    public function removeRole(\OAuth\Entity\Role $role)
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
}
