<?php
namespace OAuth\Factory;

use Zend\ServiceManager\Factory\FactoryInterface;
use Doctrine\Common\Cache\FilesystemCache;
use Interop\Container\ContainerInterface;
use OAuth\Controller\AuthController;
use OAuth\Service\AuthManager;
use OAuth\Service\UserManager;

class AuthControllerFactory implements FactoryInterface {

    /**
     * Invoke AuthController.
     *
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return AuthController|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $authManager = $container->get(AuthManager::class);
        $userManager = $container->get(UserManager::class);
        $cache = $container->get(FilesystemCache::class);

        return new AuthController($entityManager, $authManager, $userManager,$cache);        
    }
}