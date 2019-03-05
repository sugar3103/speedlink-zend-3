<?php
namespace OAuth\Factory;

use OAuth\Controller\PermissionController;
use OAuth\Service\PermissionManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory for PermissionController. Its purpose is to instantiate the controller
 * and inject dependencies into it.
 * @package OAuth\Factory
 */
class PermissionControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $permissionManager = $container->get(PermissionManager::class);

        // Instantiate the controller and inject dependencies.
        return new PermissionController($entityManager, $permissionManager);
    }
}