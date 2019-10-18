<?php
namespace Management\Factory;

use Management\Entity\PricingCod;
use Management\Service\PricingCodManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingCodManagerFactory implements FactoryInterface {

    /**
     * The method creates the PricingCodManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingCodManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingCodManager(
            $entityManager
        );
    }
}