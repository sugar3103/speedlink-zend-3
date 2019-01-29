<?php

namespace OAuth\Service;

use OAuth\Entity\User;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Adapter\Ldap;
use Zend\Authentication\Result;
use Zend\Crypt\Password\Bcrypt;

/**
 * Class AuthAdapter
 * @package OAuth\Service
 */
class AuthAdapter extends Ldap
{
    /**
     * User name.
     * @var string
     */
    protected $username;

    /**
     * Password.
     * @var string
     */
    protected $password;

    /**
     * Entity Manager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * LDAP Option.
     * @var $ldapOption
     */
    protected $ldapConfig;

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * AuthAdapter constructor.
     * @param EntityManager $entityManager
     * @param $ldapConfig
     * @param null|string $identity
     * @param null|string $credential
     */
    public function __construct(EntityManager $entityManager, $ldapConfig = [], ?string $identity = null, ?string $credential = null)
    {
        $this->ldapConfig = $ldapConfig;
        $this->entityManager = $entityManager;
        parent::__construct($ldapConfig, $identity, $credential);
    }

    /**
     * Do authentication for application
     *
     * @return Result
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function authenticate()
    {
        $this->setIdentity($this->username);
        $this->setCredential($this->password);
        $ldapResult = parent::authenticate();

        // check the database if there is a user with such username.
        $user = $this->entityManager->getRepository(User::class)->findOneByUsername($this->username);

        // ldap authenticate successfull
        if($ldapResult->getCode() == Result::SUCCESS) {
            if($user == null) {
                // If there is no such user in db, create new user ldap
                $ldapUser = new User();

                $ldapUser->setUsername($this->getIdentity());
                // Hash password
                $bcrypt = new Bcrypt();
                $passwordHash = $bcrypt->create($this->getPassword());
                $ldapUser->setPassword($passwordHash);
                $currentDate = date('Y-m-d H:i:s');
                $ldapUser->setCreatedAt($currentDate);
                $ldapUser->setIsActive(User::ACTIVE);
                $ldapUser->setIsLdap(User::LDAP_USER);
                $ldapUser->setLanguage('en_US');
                $ldapUser->setIsAdmin(0);

                $this->entityManager->persist($ldapUser);
                $this->entityManager->flush();
                return new Result(
                    Result::SUCCESS,
                    $this->username,
                    ['Authentication successfully.']
                );
            }
            else {
                // If the user with such email exists, we need to check if it is active or inactive.
                // Do not allow inactive users to log in.
                if ($user->getIsActive() == User::INACTIVE)
                    return new Result(
                        Result::FAILURE,
                        null,
                        ['User is inactive.']
                    );
                $bcrypt = new Bcrypt();
                $passwordHash = $bcrypt->create($this->getPassword());
                $user->setPassword($passwordHash);
                $user->setIsLdap(User::LDAP_USER);

                $this->entityManager->persist($user);
                $this->entityManager->flush();
                return new Result(
                    Result::SUCCESS,
                    $this->username,
                    ['Authentication successfully.']
                );
            }
        }
        // fail connect ldap
        else {
            // If there is no such user, return 'Identity Not Found' status.
            if($user == null)
                return new Result(
                    Result::FAILURE_IDENTITY_NOT_FOUND,
                    null,
                    ['Invalid credentials.']
                );
            else {
                // If the user with such email exists, we need to check if it is active or inactive.
                // Do not allow inactive users to log in.
                if ($user->getIsActive() == User::INACTIVE)
                    return new Result(
                        Result::FAILURE,
                        null,
                        ['User is inactive.']
                    );
                // Now we need to calculate hash based on user-entered password and compare
                // it with the password hash stored in database.
                $bcrypt = new Bcrypt();
                $passwordHash = $user->getPassword();

                if ($bcrypt->verify($this->password, $passwordHash))
                    // Great! The password hash matches. Return user identity (username) to be
                    // saved in session for later user.
                    return new Result(
                        Result::SUCCESS,
                        $this->username,
                        ['Authentication successfully.']
                    );

                return new Result(
                    Result::FAILURE_CREDENTIAL_INVALID,
                    null,
                    ['Invalid Credentials.']
                );
            }
        }
    }
}