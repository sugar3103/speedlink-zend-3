<?php
namespace NetworkPort\Factory;

use NetworkPort\Controller\BranchAreaController;
use NetworkPort\Service\BranchAreaManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class BranchAreaControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $branchareaManager = $container->get(BranchAreaManager::class);

        // instantiate the controller and inject dependencies.
        return new BranchAreaController($entityManager,$branchareaManager);
    }
}