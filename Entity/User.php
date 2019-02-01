<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="unique_username", columns={"username"})})
 * @ORM\Entity
 */
class User
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
    private $firstName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="last_name", type="string", length=100, nullable=true)
     */
    private $lastName;

    /**
     * @var int
     *
     * @ORM\Column(name="is_active", type="integer", nullable=false, options={"comment"="active=1,inactive=0"})
     */
    private $isActive = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="is_admin", type="integer", nullable=false)
     */
    private $isAdmin = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="is_ldap", type="integer", nullable=false)
     */
    private $isLdap = '0';

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
    private $passwordResetToken;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="password_reset_token_created_at", type="datetime", nullable=true)
     */
    private $passwordResetTokenCreatedAt;

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
    private $lastToken;

    /**
     * @var int|null
     *
     * @ORM\Column(name="created_by", type="integer", nullable=true)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $createdAt = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $updatedAt = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="last_token_created_at", type="datetime", nullable=true)
     */
    private $lastTokenCreatedAt;


}
