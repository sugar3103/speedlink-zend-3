<?php
namespace OAuth\Factory;

use OAuth\Service\PermissionManager;
use OAuth\Service\RbacManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory for PermissionManager service. The purpose of the factory
 * is to instantiate the service and pass it dependencies (inject dependencies).
 * @package OAuth\Service\Factory
 */
class PermissionManageFactory implements FactoryInterface {

    /**
     * This method creates the PermissionManager service and return its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PermissionManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $rbacManager = $container->get(RbacManager::class);

        return new PermissionManager($entityManager, $rbacManager);
    }
}