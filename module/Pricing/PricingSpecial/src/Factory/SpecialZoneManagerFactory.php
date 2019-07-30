<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Entity\SpecialZone;
use PricingSpecial\Service\SpecialZoneManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class SpecialZoneManagerFactory implements FactoryInterface {

    /**
     * The method creates the SpecialZoneManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return SpecialZoneManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new SpecialZoneManager($entityManager);
    }
}