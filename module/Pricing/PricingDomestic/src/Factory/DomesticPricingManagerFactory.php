<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Service\DomesticPricingManager;
use PricingDomestic\Service\DomesticPricingDataManager;
use PricingDomestic\Service\DomesticPricingVasManager;
use PricingDomestic\Service\DomesticRangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticPricingManagerFactory implements FactoryInterface {

    /**
     * The method creates the DomesticPricingManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticPricingManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticPricingManager(
            $entityManager,
            $container->get(DomesticPricingDataManager::class),
            $container->get(DomesticPricingVasManager::class),
            $container->get(DomesticRangeWeightManager::class)
        );
    }
}