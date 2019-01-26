<?php
namespace ServiceShipment\Factory;

use Interop\Container\ContainerInterface;
use ServiceShipment\Service\ShipmentTypeManager;
use Zend\ServiceManager\Factory\FactoryInterface;

class ShipmentTypeManagerFactory implements FactoryInterface
{
    /**
     * The method creates the HubManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return ServiceManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        return new ShipmentTypeManager($entityManager);
    }
}