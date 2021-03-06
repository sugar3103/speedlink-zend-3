<?php
namespace OAuth\Service;

use Core\Utils\Utils;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\Role;
use OAuth\Entity\User;
use Zend\Crypt\Password\Bcrypt;
use Zend\Mail\Message;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;
use Zend\Math\Rand;
use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;
use Zend\View\Renderer\PhpRenderer;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package OAuth\Service
 */
class UserManager
{

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var RoleManager
     */
    private $roleManager;

    /**
     * @var PermissionManager
     */
    private $permissionManager;

    /**
     * @var PhpRenderer
     */
    private $viewRenderer;

    /**
     * App config.
     * @var array
     */
    private $config;

    /**
     * UserManager constructor.
     * @param $entityManager
     * @param $roleManager
     * @param $permissionManager
     * @param $viewRenderer
     * @param $config
     */
    public function __construct(
        $entityManager,
        $roleManager,
        $permissionManager,
        $viewRenderer,
        $config
    ) {
        $this->entityManager = $entityManager;
        $this->roleManager = $roleManager;
        $this->permissionManager = $permissionManager;
        $this->viewRenderer = $viewRenderer;
        $this->config = $config;
    }

    private function getReferenced(&$user, $data, $assignee, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($assignee->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        $user->setJoinUpdated($user_data);

    }

    /**
     * Add user
     *
     * @param $data
     * @return User|bool
     * @throws \Exception
     */
    public function addUser($data)
    {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $user = new User();
            $user->setUsername($data['username']);
            $user->setFirstName($data['first_name']);
            $user->setLastName($data['last_name']);

            // encrypt password and store the password in encrypted state.
            $bcrypt = new Bcrypt();
            $passwordHash = $bcrypt->create($data['password']);
            $user->setPassword($passwordHash);

            $user->setIsActive($data['is_active']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $user->setCreatedAt($addTime->format('Y-m-d H:i:s'));

            // assign roles to user.
            $this->assignRoles($user, $data['roles']);

            //set ldap default
            $user->setIsLdap(0);

            // add the entity to the entity manager.
            $this->entityManager->persist($user);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $user;
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return false;
        }

    }

    /**
     * This method updates data of an existing user.
     * @param $user User
     * @param $data array
     * @throws \Exception
     * @return bool
     */
    public function updateUser($user, $data, $assignee)
    {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $user->setUsername($data['username']);
            $user->setFirstName($data['first_name']);
            $user->setLastName($data['last_name']);
            $user->setIsActive($data['is_active']);
            $user->setEmail($data['email']);

            $updatedTime = new \DateTime('now', new \DateTimeZone('UTC'));

            $user->setUpdatedAt($updatedTime->format('Y-m-d H:i:s'));
            $user->setUpdatedBy($assignee->id);
            $this->getReferenced($user, $data, $assignee);

            // Assign roles to user.
            $this->assignRoles($user, $data['roles']);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return true;
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * A helper method which assigns new roles to the user.
     *
     * @param $user
     * @param $roleIds
     * @throws \Exception
     */

    private function assignRoles($user, $roleIds)
    {
        // remove old user role(s).
        $user->getRoles()->clear();

        // assign new role(s).
        foreach ($roleIds as $roleId) {
            $role = $this->entityManager->getRepository(Role::class)
                ->find($roleId);

            if ($role == null) {
                throw new \Exception('Not found role by ID');
            }

            $user->addRole($role);
        }
    }

    /**
     * This method checks if at least on user presents, and if not, creates
     * 'Admin' user with username 'admin' and password 'P@ssw0rdM1c!'
     */
    public function createAdminUserIfNotExists()
    {
        $user = $this->entityManager->getRepository(User::class)
            ->findOneBy([]);

        if ($user == null) {
            $user = new User();
            $user->setUsername('administrator');
            $user->setFirstName('Administrator');
            $bcrypt = new Bcrypt();
            $passwordHash = $bcrypt->create('Admin@20!9');
            $user->setPassword($passwordHash);
            $user->setIsActive(User::ACTIVE);
            $user->setIsLdap(User::LOCAL_USER);
            $user->setIsAdmin(1);
            $user->setCreatedAt(date('Y-m-d H:i:s'));

            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }

        $this->permissionManager->createDefaultPermissionsIfNotExist();
        $this->roleManager->createDefaultRolesIfNotExist();

        // assign user Administrator role
        $adminRole = $this->entityManager->getRepository(Role::class)
            ->findOneByName('Administrator');

        if ($adminRole == null) {
            throw new \Exception("Administrator role doesn't exist");
        }

        $user->getRoles()->add($adminRole);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

    }

    /**
     * Checks that the given password is correct.
     * @param $user
     * @param $password
     * @return bool
     */
    public function validatePassword($user, $password)
    {
        $bcrypt = new Bcrypt();
        $passwordHash = $user->getPassword();

        if ($bcrypt->verify($password, $passwordHash)) {
            return true;
        }

        return false;
    }

    /**
     * Generates a password reset token for the user. This token is then stored in database and
     * sent to the user's E-mail address. When the user clicks the link in E-mail message, he is
     * directed to the Set Password page.
     * @param $user User
     * @throws \Exception
     */
    public function generatePasswordResetToken($user)
    {
        if ($user->getIsActive() != User::ACTIVE) {
            throw new \Exception("Cannot generate password reset token for inactive user " . $user->getUsername());
        }

        // Generate a token.
        $token = Rand::getString(32, '0123456789abcdefghijklmnopqrstuvwxyz', true);

        // encrypt the token before storing it in DB.
        $bcrypt = new Bcrypt();
        $tokenHash = $bcrypt->create($token);

        // save token to DB
        $user->setPasswordResetToken($tokenHash);

        // save token creation date to DB.
        $currentDate = date('Y-m-d H:i:s');
        $user->setPasswordResetTokenCreatedAt($currentDate);

        // apply changes to DB.
        $this->entityManager->flush();

        // Send an email to user.
        $subject = 'Password Reset';

        $httpHost = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost';
        $passwordResetUrl = 'http://' . $httpHost . '/set-password?token=' . $token . '&email=' . $user->getEmail();

        // produce HTML of password reset email
        $bodyHtml = $this->viewRenderer->render(
            'user/email/reset-password-email',
            [
                'passwordResetUrl' => $passwordResetUrl,
            ]
        );

        $html = new MimePart($bodyHtml);
        $html->type = 'text/html';

        $body = new MimeMessage();
        $body->addPart($html);

        $mail = new Message();
        $mail->setEncoding('UTF-8');
        $mail->setBody($body);
        $mail->setFrom('no-reply@wms-mlc.itlvn.com', 'No-reply');
        $mail->addTo($user->getEmail(), $user->getFirstName());
        $mail->setSubject($subject);

        // Setup SMTP transport
        $transport = new SmtpTransport();
        $options = new SmtpOptions($this->config['smtp']);
        $transport->setOptions($options);

        $transport->send($mail);
    }

    /**
     * Checks whether the given password reset token is a valid one.
     * @param $email
     * @param $passwordResetToken
     * @return bool
     */
    public function validatePasswordResetToken($email, $passwordResetToken)
    {
        // find user by email.
        $user = $this->entityManager->getRepository(User::class)
            ->findOneByEmail($email);

        if ($user == null || $user->getIsActive() != User::ACTIVE) {
            return false;
        }

        // check that token hash matches the token hash in our DB.
        $bcrypt = new Bcrypt();
        $tokenHash = $user->getPasswordResetToken();

        if (!$bcrypt->verify($passwordResetToken, $tokenHash)) {
            return false;
        }
        // mismatch

        // check that token was created not too long ago
        $tokenCreateAt = $user->getPasswordResetTokenCreatedAt();
        $tokenCreateAt = strtotime($tokenCreateAt);

        $currentDate = strtotime('now');

        if ($currentDate - $tokenCreateAt > 24 * 60 * 60) {
            return false;
        }
        // expired

        return true;
    }

    /**
     * This method sets new password by password reset token.
     */
    public function setNewPasswordByToken($email, $passwordResetToken, $newPassword)
    {
        if ($this->validatePasswordResetToken($email, $passwordResetToken)) {
            return false;
        }

        // find user with the given email.
        $user = $this->entityManager->getRepository(User::class)
            ->findOneByEmail($email);

        if ($user == null || $user->getIsActive() != User::ACTIVE) {
            return false;
        }

        // set new password for user
        $bcrypt = new Bcrypt();
        $passwordHash = $bcrypt->create($newPassword);
        $user->setPassword($passwordHash);

        // Remove password reset token
        $user->setPasswordResetToken(null);
        $user->setPasswordResetTokenCreatedAt(null);

        $this->entityManager->flush();

        return true;
    }

    /**
     * This method is used to changed the password for the given user. To change the password,
     * one must know the old password
     * @param $user
     * @param $data
     * @return bool
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function changePassword($user, $data)
    {
        $oldPassword = $data['old_password'];

        // check that old password is correct
        if (!$this->validatePassword($user, $oldPassword)) {
            return false;
        }

        $newPassword = $data['new_password'];

        // Check password length
        if (strlen($newPassword) < 6 || strlen($newPassword) > 64) {
            return false;
        }

        // Set new password for user
        $bcrypt = new Bcrypt();
        $passwordHash = $bcrypt->create($newPassword);
        $user->setPassword($passwordHash);

        // apply changes
        $this->entityManager->flush();

        return true;
    }

    /**
     * Get list user by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListUserByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {

        $users = [];
        $totalUser = 0;

        //get orm user
        $ormUser = $this->entityManager->getRepository(User::class)
            ->getListUserByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if ($ormUser) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormUser, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalUser = $ormPaginator->count();

            //get user list
            $users = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($users as &$user) { //loop
                //set status
                $user['status'] = $user['is_active'];
                //set created_at
                $user['created_at'] = ($user['created_at']) ? Utils::checkDateFormat($user['created_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $user['updated_at'] = ($user['updated_at']) ? Utils::checkDateFormat($user['updated_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $user['full_name_created'] = trim($user['full_name_created']);
                $user['full_name_updated'] = trim($user['full_name_updated']);
            }

        }

        //set data user
        $dataUser = [
            'listUser' => $users,
            'totalUser' => $totalUser,
        ];

        return $dataUser;
    }
}
