<?php
namespace CustomerService\Factory;

use Interop\Container\ContainerInterface;
use CustomerService\Controller\CarrierController;
use CustomerService\Service\CarrierManager;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class CarrierControllerFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $carrierManager = $container->get(CarrierManager::class);

        // instantiate the controller and inject dependencies.
        return new CarrierController($entityManager, $carrierManager);
    }
}