<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Service\DomesticPricingVasManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticPricingVasManagerFactory implements FactoryInterface {

    /**
     * The method creates the DomesticPricingVasManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticPricingVasManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticPricingVasManager(
            $entityManager
        );
    }
}