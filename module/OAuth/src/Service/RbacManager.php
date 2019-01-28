<?php
namespace OAuth\Service;

use OAuth\Entity\Role;
use OAuth\Entity\User;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\AuthenticationService;
use Zend\Cache\Storage\StorageInterface;
use Zend\Permissions\Rbac\Rbac;

class RbacManager {

    /**
     * Entity Manager
     *
     * @var EntityManager
     */
    private $entityManager;

    /**
     * Rbac Service.
     *
     * @var Rbac
     */
    private $rbac;

    /**
     * Auth Service.
     *
     * @var AuthenticationService
     */
    private $authService;

    /**
     * Filesystem cache.
     *
     * @var StorageInterface
     */
    private $cache;

    /**
     * Assertions manager.
     *
     * @var array
     */
    private $assertionManagers;

    /**
     * RbacManager constructor.
     * @param $entityManager
     * @param $authService
     * @param $cache
     * @param $assertionManagers
     */
    public function __construct($entityManager, $authService, $cache, $assertionManagers) {
        $this->entityManager = $entityManager;
        $this->authService = $authService;
        $this->cache = $cache;
        $this->assertionManagers = $assertionManagers;
    }

    /**
     * Initializes the Rbac container.
     *
     * @param bool $forceCreate
     * @return bool
     */
    public function init($forceCreate = false) {
        if ($this->rbac != null && !$forceCreate)
            // already initialized, do nothing.
            return false;

        // if user wants us to re-init RBAC container, clear cache now.
        if ($forceCreate)
            $this->cache->removeItem('rbac_container');

        // try to load Rbac container from cache.
        $this->rbac = $this->cache->getItem('rbac_container', $result);

        if (!$result) {
            // create Rbac container.
            $rbac = new Rbac();
            $this->rbac = $rbac;

            // construct role hierarchy by loading roles and permissions from database.
            $rbac->setCreateMissingRoles(true);

            $roles = $this->entityManager->getRepository(Role::class)
                ->findBy([], ['id' => 'ASC']);

            foreach ($roles as $role) {
                $roleName = $role->getName();

                $parentRoleNames = [];

                foreach ($role->getParentRoles() as $parentRole) {
                    $parentRoleNames[] = $parentRole->getName();
                }

                $rbac->addRole($roleName, $parentRoleNames);

                foreach ($role->getPermissions() as $permission) {
                    $rbac->getRole($roleName)->addPermission($permission->getName());
                }
            }

            // Save Rbac container to cache.
            $this->cache->setItem('rbac_container', $rbac);
        }
    }

    public function isGranted($user, $permission, $params = null) {
        if ($this->rbac == null)
            $this->init();


        if ($user == null) {

            $identity = $this->authService->getIdentity();
            if ($identity == null)
                return false;

            $user = $this->entityManager->getRepository(User::class)
                ->findOneByUsername($identity);

            if ($user == null)
                // Oops.. the identity presents in session, but there is no such user in database.
                // We throw an exception, because this is a possible security problem.
                throw new \Exception("There is no user with such identity.");
        }

        $roles = $user->getRoles();
        // loop through all roles of current user to check permission.
        foreach ($roles as $role) {
            if ($this->rbac->isGranted($role->getName(), $permission)) {

                if ($params == null)
                    return true;
                // Check assertion
                foreach ($this->assertionManagers as $assertionManager) {
                    if ($assertionManager->assert($this->rbac, $permission, $params))
                        return true;
                }
            }

            // since we are pulling the user form the database again the init() function above is overridden?
            // we don't seem to be taking into account the parent roles without the following code.
            $parentRoles = $role->getParentRoles();

            foreach ($parentRoles as $parentRole)
                if ($this->rbac->isGranted($parentRole->getName(), $permission))
                    return true;
        }
        return false;
    }
}