<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Service\PricingSpecialManager;
use PricingSpecial\Service\PricingSpecialDataManager;
use PricingSpecial\Service\PricingSpecialVasManager;
use PricingSpecial\Service\SpecialRangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingSpecialManagerFactory implements FactoryInterface {

    /**
     * The method creates the SpecialPricingManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingSpecialManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingSpecialManager(
            $entityManager,
            $container->get(PricingSpecialDataManager::class),
            $container->get(PricingSpecialVasManager::class),
            $container->get(SpecialRangeWeightManager::class)
        );
    }
}