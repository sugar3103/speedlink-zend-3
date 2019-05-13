<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Entity\DomesticZone;
use PricingDomestic\Service\DomesticZoneManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticZoneManagerFactory implements FactoryInterface {

    /**
     * The method creates the DomesticZoneManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticZoneManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticZoneManager(
            $entityManager
        );
    }
}