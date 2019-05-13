<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Entity\DomesticRangeWeight;
use PricingDomestic\Service\DomesticRangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticRangeWeightManagerFactory implements FactoryInterface {

    /**
     * The method creates the DomesticRangeWeightManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticRangeWeightManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticRangeWeightManager(
            $entityManager
        );
    }
}