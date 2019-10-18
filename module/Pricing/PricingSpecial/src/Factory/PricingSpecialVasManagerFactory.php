<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Service\PricingSpecialVasManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingSpecialVasManagerFactory implements FactoryInterface {

    /**
     * The method creates the SpecialPricingVasManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingSpecialVasManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        return new PricingSpecialVasManager($entityManager);
    }
}