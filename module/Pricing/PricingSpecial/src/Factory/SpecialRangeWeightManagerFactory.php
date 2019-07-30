<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Entity\SpecialRangeWeight;
use PricingSpecial\Service\SpecialRangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class SpecialRangeWeightManagerFactory implements FactoryInterface {

    /**
     * The method creates the SpecialRangeWeightManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return SpecialRangeWeightManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new SpecialRangeWeightManager($entityManager);
    }
}