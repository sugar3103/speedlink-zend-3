<?php
namespace OAuth\Factory;

use OAuth\Service\RbacManager;
use OAuth\Service\RoleManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory class for RoleManager service. The purpose of the factory
 * is to instantiate the service and pass it dependencies (inject dependencies).
 * @package OAuth\Service\Factory
 */
class RoleManagerFactory implements FactoryInterface {

    /**
     * This method creates the RoleManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return RoleManager
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $rbacManager = $container->get(RbacManager::class);

        return new RoleManager($entityManager, $rbacManager);
    }
}