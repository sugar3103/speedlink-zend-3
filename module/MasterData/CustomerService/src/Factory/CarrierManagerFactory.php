<?php
namespace CustomerService\Factory;

use Interop\Container\ContainerInterface;
use CustomerService\Service\CarrierManager;
use Zend\ServiceManager\Factory\FactoryInterface;

class CarrierManagerFactory implements FactoryInterface
{
    /**
     * The method creates the BranchManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return CarrierManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        return new CarrierManager($entityManager);
    }
}