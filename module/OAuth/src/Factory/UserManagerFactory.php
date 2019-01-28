<?php
namespace OAuth\Factory;

use OAuth\Entity\Permission;
use OAuth\Service\PermissionManager;
use OAuth\Service\RoleManager;
use OAuth\Service\UserManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class UserManagerFactory implements FactoryInterface {

    /**
     * The method creates the UserManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return UserManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $roleManager = $container->get(RoleManager::class);
        $permissionManager = $container->get(PermissionManager::class);
        $viewRenderer = $container->get('ViewRenderer');
        $config = $container->get('Config');
        return new UserManager(
            $entityManager,
            $roleManager,
            $permissionManager,
            $viewRenderer,
            $config
        );
    }
}