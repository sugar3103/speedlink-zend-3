<?php
namespace OAuth\Factory;

use OAuth\Controller\UserController;
use OAuth\Service\UserManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package OAuth\Factory
 */
class UserControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $userManager = $container->get(UserManager::class);

        // instantiate the controller and inject dependencies.
        return new UserController($entityManager, $userManager);
    }
}