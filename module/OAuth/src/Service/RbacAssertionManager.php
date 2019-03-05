<?php
namespace OAuth\Service;

use OAuth\Entity\User;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\AuthenticationService;
use Zend\Permissions\Rbac\Rbac;

/**
 * This service is used for invoking user-defined RBAC dynamic assertions.
 * @package OAuth\Service
 */
class RbacAssertionManager {

    /**
     * Entity Manager.
     *
     * @var EntityManager
     */
    private $entityManager;

    /**
     * Authentication Service.
     *
     * @var AuthenticationService
     */
    private $authService;

    /**
     * RbacAssertionManager constructor.
     * @param EntityManager $entityManager
     * @param AuthenticationService $authService
     */
    public function __construct(EntityManager $entityManager, AuthenticationService $authService)
    {
        $this->entityManager = $entityManager;
        $this->authService = $authService;
    }

    /**
     * This method is used for dynamic assertions.
     *
     * @param Rbac $rbac
     * @param $permission
     * @param $params
     * @return bool
     */
    public function assert(Rbac $rbac, $permission, $params) {
        $currentUser = $this->entityManager->getRepository(User::class)
            ->findOneByEmail($this->authService->getIdentity()->getId());

        if ($permission == 'profile.own.view' && $params['user']->getId() == $currentUser->getId())
            return true;

        return false;
    }
}