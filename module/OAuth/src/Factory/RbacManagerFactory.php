<?php
namespace OAuth\Factory;

use OAuth\Service\RbacManager;
use Doctrine\Common\Cache\FilesystemCache;
use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory class for RbacManager service. The purpose of the factory
 * is to instantiate the service and pass id dependencies (inject dependencies)
 * @package OAuth\Service\Factory
 */
class RbacManagerFactory implements FactoryInterface {
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $authService = $container->get(AuthenticationService::class);
        $cache = $container->get(FilesystemCache::class);

        $assertionManagers = [];
        $config = $container->get('Config');
        if (isset($config['rbac_manager']['assertions']))
            foreach ($config['rbac_manager']['assertions'] as $serviceName)
                if ($container->has($serviceName))
                    $assertionManagers[$serviceName] = $container->get($serviceName);

        return new RbacManager($entityManager, $authService, $cache, $assertionManagers);
    }
}