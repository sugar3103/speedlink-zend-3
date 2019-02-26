<?php
namespace OAuth\Controller\Plugin;

use OAuth\Entity\User;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\AuthenticationService;
use Zend\Mvc\Controller\Plugin\AbstractPlugin;

/**
 * This controller plugin is designed to let you get the currently logged in User entity
 * inside your controller.
 * @package OAuth\Controller\Plugin
 */
class CurrentUserPlugin extends AbstractPlugin {

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var AuthenticationService
     */
    private $authService;

    /**
     * @var User
     */
    private $user = null;

    /**
     * This method is called when you invoke this plugin in your controller: $user = $this->currentUser();
     * @param bool $useCachedUser if true, the user entity is fetched only on the first call (and cached on subsequent calls).
     * @return User|null
     * @throws \Exception
     */
    public function __invoke($useCachedUser = true)
    {
        // if current user is already fetched, return it
        if ($useCachedUser && $this->user !== null)
            return $this->user;

        // check if user is logged in
        if ($this->authService->hasIdentity()) {

            // fetch user entity form database.
            $this->user = $this->entityManager->getRepository(User::class)
                ->findOneByEmail($this->authService->getIdentity());

            if ($this->user == null)
                // Oops.. the identity presents in session, but there is no such user in database.
                // we throw an exception, because this is a possible security problem.
                throw new \Exception("Not found user with such email");

            // return found user
            return $this->user;
        }
        return null;
    }
}