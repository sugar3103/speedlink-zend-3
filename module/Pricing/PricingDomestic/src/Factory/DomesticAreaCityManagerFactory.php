<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Entity\DomesticAreaCity;
use PricingDomestic\Service\DomesticAreaCityManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticAreaCityManagerFactory implements FactoryInterface {

    /**
     * The method creates the DomesticAreaCityManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticAreaCityManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticAreaCityManager(
            $entityManager
        );
    }
}