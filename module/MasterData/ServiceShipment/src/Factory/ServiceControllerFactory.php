<?php
namespace ServiceShipment\Factory;

use Interop\Container\ContainerInterface;
use ServiceShipment\Controller\ServiceController;
use ServiceShipment\Service\ServiceManager;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class ServiceControllerFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $serviceManager = $container->get(ServiceManager::class);
        
        // instantiate the controller and inject dependencies.
        return new ServiceController($entityManager, $serviceManager);
    }
}