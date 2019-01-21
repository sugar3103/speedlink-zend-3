<?php
namespace OAuth\Factory;

use OAuth\Controller\RoleController;
use OAuth\Service\RoleManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory for RoleController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package OAuth\Factory
 */
class RoleControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $roleManager = $container->get(RoleManager::class);
        // instantiate the controller and inject dependencies
        return new RoleController($entityManager, $roleManager);
    }
}