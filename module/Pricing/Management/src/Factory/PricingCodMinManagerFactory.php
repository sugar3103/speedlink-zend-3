<?php
namespace Management\Factory;

use Management\Entity\PricingCodMin;
use Management\Service\PricingCodMinManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingCodMinManagerFactory implements FactoryInterface {

    /**
     * The method creates the PricingCodMinManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingCodMinManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingCodMinManager(
            $entityManager
        );
    }
}