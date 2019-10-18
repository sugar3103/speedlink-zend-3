<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Service\PricingSpecialDataManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingSpecialDataManagerFactory implements FactoryInterface {
    /**
     * The method creates the SpecialPricingDataManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingSpecialDataManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        return new PricingSpecialDataManager(
            $entityManager            
        );
    }
}