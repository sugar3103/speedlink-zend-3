<?php
namespace Management\Factory;

use Management\Entity\PricingVas;
use Management\Service\PricingVasManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingVasManagerFactory implements FactoryInterface {

    /**
     * The method creates the PricingVasManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingVasManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingVasManager(
            $entityManager
        );
    }
}