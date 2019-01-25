<?php
namespace ServiceShipment\Factory;

use Interop\Container\ContainerInterface;
use ServiceShipment\Service\ServiceManager;
use Zend\ServiceManager\Factory\FactoryInterface;

class ServiceManagerFactory implements FactoryInterface
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
        return new ServiceManager($entityManager);
    }
}