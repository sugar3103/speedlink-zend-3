<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Service\DomesticPricingDataManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticPricingDataManagerFactory implements FactoryInterface {
    /**
     * The method creates the DomesticPricingDataManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticPricingDataManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticPricingDataManager(
            $entityManager            
        );
    }
}