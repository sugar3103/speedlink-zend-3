<?php

namespace OAuth\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user")
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
     * @var string
     *
     * @ORM\Column(name="username", type="string", precision=0, scale=0, nullable=false, unique=true)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $lastName;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $language;

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
     * @var int
     *
     * @ORM\Column(name="is_ldap", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $isLdap;

    /**
     * @var int
     *
     * @ORM\Column(name="is_admin", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $isAdmin;

    /**
     * @var int
     *
     * @ORM\Column(name="is_active", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $isActive;

    /**
     * @var string
     *
     * @ORM\Column(name="password_reset_token", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $passwordResetToken;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="password_reset_token_created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $passwordResetTokenCreatedAt;

    /**
     * @var string
     *
     * @ORM\Column(name="last_token", type="string", precision=0, scale=0, nullable=false, unique=false)
     */
    private $lastToken;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="last_token_create_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $lastTokenCreateAt;

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
     * Set email.
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password.
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password.
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set firstName.
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName.
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName.
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName.
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
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
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return User
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
     * @return User
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
     * Set isLdap.
     *
     * @param int $isLdap
     *
     * @return User
     */
    public function setIsLdap($isLdap)
    {
        $this->isLdap = $isLdap;

        return $this;
    }

    /**
     * Get isLdap.
     *
     * @return int
     */
    public function getIsLdap()
    {
        return $this->isLdap;
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
        $this->isAdmin = $isAdmin;

        return $this;
    }

    /**
     * Get isAdmin.
     *
     * @return int
     */
    public function getIsAdmin()
    {
        return $this->isAdmin;
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
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive.
     *
     * @return int
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * Set passwordResetToken.
     *
     * @param string $passwordResetToken
     *
     * @return User
     */
    public function setPasswordResetToken($passwordResetToken)
    {
        $this->passwordResetToken = $passwordResetToken;

        return $this;
    }

    /**
     * Get passwordResetToken.
     *
     * @return string
     */
    public function getPasswordResetToken()
    {
        return $this->passwordResetToken;
    }

    /**
     * Set passwordResetTokenCreatedAt.
     *
     * @param \DateTime $passwordResetTokenCreatedAt
     *
     * @return User
     */
    public function setPasswordResetTokenCreatedAt($passwordResetTokenCreatedAt)
    {
        $this->passwordResetTokenCreatedAt = $passwordResetTokenCreatedAt;

        return $this;
    }

    /**
     * Get passwordResetTokenCreatedAt.
     *
     * @return \DateTime
     */
    public function getPasswordResetTokenCreatedAt()
    {
        return $this->passwordResetTokenCreatedAt;
    }

    /**
     * Set lastToken.
     *
     * @param string $lastToken
     *
     * @return User
     */
    public function setLastToken($lastToken)
    {
        $this->lastToken = $lastToken;

        return $this;
    }

    /**
     * Get lastToken.
     *
     * @return string
     */
    public function getLastToken()
    {
        return $this->lastToken;
    }

    /**
     * Set lastTokenCreateAt.
     *
     * @param \DateTime $lastTokenCreateAt
     *
     * @return User
     */
    public function setLastTokenCreateAt($lastTokenCreateAt)
    {
        $this->lastTokenCreateAt = $lastTokenCreateAt;

        return $this;
    }

    /**
     * Get lastTokenCreateAt.
     *
     * @return \DateTime
     */
    public function getLastTokenCreateAt()
    {
        return $this->lastTokenCreateAt;
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
