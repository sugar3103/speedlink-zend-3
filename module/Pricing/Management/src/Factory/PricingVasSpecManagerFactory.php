<?php
namespace Management\Factory;

use Management\Entity\PricingVasSpec;
use Management\Service\PricingVasSpecManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingVasSpecManagerFactory implements FactoryInterface {

    /**
     * The method creates the PricingVasSpecManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingVasSpecManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingVasSpecManager(
            $entityManager
        );
    }
}