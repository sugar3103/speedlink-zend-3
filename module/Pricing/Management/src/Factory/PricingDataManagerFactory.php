<?php
namespace Management\Factory;

use Management\Entity\PricingData;
use Management\Service\PricingDataManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingDataManagerFactory implements FactoryInterface {

    /**
     * The method creates the PricingDataManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingDataManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingDataManager(
            $entityManager
        );
    }
}