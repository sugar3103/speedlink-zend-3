<?php
namespace OAuth\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="\OAuth\Repository\UserRepository")
 */
class User
{
    const ACTIVE = 1;
    const INACTIVE = 0;

    const LOCAL_USER = 0;
    const LDAP_USER = 1;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /**
     * @ORM\Column(type="string",name="username",unique=true)
     */
    protected $username;

    /**
     * @ORM\Column(type="string", name="email")
     */
    protected $email;

    /**
     * @ORM\Column(type="string",name="password")
     */
    protected $password;

    /**
     * @ORM\Column(type="string",name="first_name")
     */
    protected $firstName;

    /**
     * @ORM\Column(type="string",name="last_name")
     */
    protected $lastName;

    /**
     * @ORM\Column(type="string", name="language")
     */
    protected $language='en_US';

    /**
     * @ORM\Column(type="datetime",name="created_at")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime",name="updated_at")
     */
    protected $updatedAt;

    /**
     * @ORM\Column(type="integer",name="is_ldap")
     */
    protected $isLdap;

    /**
     * @ORM\Column(type="integer",name="is_admin")
     */
    protected $isAdmin = 0;

    /**
     * @ORM\Column(type="integer", name="is_active")
     */
    protected $isActive;

    /**
     * @ORM\Column(type="string", name="password_reset_token")
     */
    protected $passwordResetToken;

    /**
     * @ORM\Column(type="datetime",name="password_reset_token_created_at")
     */
    protected $passwordResetTokenCreatedAt;

    /**
     * @ORM\Column(type="string",name="last_token")
     */
    protected $lastToken;

     /**
     * @ORM\Column(type="datetime",name="last_token_create_at")
     */
    protected $lastTokenCreateAt;
    /**
     * @ORM\ManyToMany(targetEntity="\OAuth\Entity\Role")
     * @ORM\JoinTable(name="user_role",
     *     joinColumns={@ORM\JoinColumn(name="user_id",referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="role_id",referencedColumnName="id")})
     */
    protected $roles;


    /**
     * User constructor.
     */
    public function __construct()
    {
        $this->roles = new ArrayCollection();
    }

    /**
     * Get Id
     *
     * @return mixed
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set Id
     *
     * @param $id
     */
    public function setId($id) {
        $this->id = $id;
    }

    /**
     * Get username.
     * @return mixed
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * Set username.
     * @param $username
     */
    public function setUsername($username) {
        $this->username = $username;
    }

    /**
     * Get Password
     * @return mixed
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * Set Password.
     * @param $password
     */
    public function setPassword($password) {
        $this->password = $password;
    }

    /**
     * Get First Name.
     *
     * @return mixed
     */
    public function getFirstName() {
        return $this->firstName;
    }

    /**
     * Set First Name.
     *
     * @param $firstName
     */
    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }

    /**
     * Get Last Name.
     *
     * @return mixed
     */
    public function getLastName() {
        return $this->lastName;
    }

    /**
     * Set Last Name.
     *
     * @param $lastName
     */
    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    /**
     * Get Language.
     *
     * @return mixed
     */
    public function getLanguage() {
        return $this->language;
    }

    /**
     * Set Language.
     *
     * @param $language
     */
    public function setLanguage($language) {
        $this->language = $language;
    }

    /**
     * Get Created At.
     *
     * @return mixed
     */
    public function getCreatedAt() {
        return $this->createdAt;
    }

    /**
     * Set Created At.
     *
     * @param $createdAt
     */
    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
    }

    /**
     * Get Updated At.
     *
     * @return mixed
     */
    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    /**
     * Set Updated At.
     *
     * @param $updatedAt
     */
    public function setUpdatedAt($updatedAt) {
        $this->updatedAt = $updatedAt;
    }

    /**
     * Get Is Admin.
     *
     * @return mixed
     */
    public function getIsAdmin() {
        return $this->isAdmin;
    }

    /**
     * Set Is Admin.
     *
     * @param $isAdmin
     */
    public function setIsAdmin($isAdmin) {
        $this->isAdmin = $isAdmin;
    }

    /**
     * Get Is Ldap.
     *
     * @return mixed
     */
    public function getIsLdap() {
        return $this->isLdap;
    }

    /**
     * Set Is Ldap.
     *
     * @param $isLdap
     */
    public function setIsLdap($isLdap) {
        $this->isLdap = $isLdap;
    }

    /**
     * Get Is Active
     *
     * @return mixed
     */
    public function getIsActive() {
        return $this->isActive;
    }

    /**
     * Set Is Active.
     *
     * @param $isActive
     */
    public function setIsActive($isActive) {
        $this->isActive = $isActive;
    }

    /**
     * Get password reset token.
     *
     * @return mixed
     */
    public function getPasswordResetToken() {
        return $this->passwordResetToken;
    }

    /**
     * Set password reset token.
     *
     * @param $token
     */
    public function setPasswordResetToken($token) {
        $this->passwordResetToken = $token;
    }

    /**
     * Get Password Reset Token Created At.
     *
     * @return mixed
     */
    public function getPasswordResetTokenCreatedAt() {
        return $this->createdAt;
    }

    /**
     * Set Password Reset Token Created At.
     *
     * @param $date
     */
    public function setPasswordResetTokenCreatedAt($date) {
        $this->passwordResetTokenCreatedAt = $date;
    }

    /**
     * Return the array of roles assigned to this user.
     *
     * @return ArrayCollection
     */
    public function getRoles() {
        return $this->roles;
    }

    /**
     * Assigns a role to user.
     *
     * @param $role
     */
    public function addRole($role) {
        $this->roles->add($role);
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
     * Returns user status as string.
     * @return string
     */
    public function getIsActiveAsString()
    {
        $list = self::getIsActiveList();
        if (isset($list[$this->isActive]))
            return $list[$this->isActive];

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
     * Set Last Token Created At.
     *
     * @param $date
     */
    public function setLastTokenCreatedAt($date) {
        $this->lastTokenCreateAt = $date;
    }

    /**
     * Get Last Token Created At.
     *
     * @param $date
     */
    public function getLastTokenCreatedAt() {
        return $this->lastTokenCreateAt;
    }

    /**
     * Set Last Token.
     *
     * @param $date
     */
    public function setLastToken($lastToken) {
        $this->lastToken = $lastToken;
    }

    /**
     * Get Last Token Created At.
     *
     * @param $date
     */
    public function getLastToken() {
        return $this->lastToken;
    }

    /**
     * Set Email.
     *
     * @param $date
     */
    public function setEmail($email) {
        $this->email = $email;
    }

    /**
     * Get Email.
     *
     * @param $date
     */
    public function getEmail() {
        return $this->email;
    }
}