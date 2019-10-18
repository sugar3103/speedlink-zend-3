<?php
namespace ServiceShipment\Factory;

use Interop\Container\ContainerInterface;
use ServiceShipment\Controller\ShipmentTypeController;
use ServiceShipment\Service\ShipmentTypeManager;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class ShipmentTypeControllerFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $shipmentTypeManager = $container->get(ShipmentTypeManager::class);
        
        // instantiate the controller and inject dependencies.
        return new ShipmentTypeController($entityManager, $shipmentTypeManager);
    }
}