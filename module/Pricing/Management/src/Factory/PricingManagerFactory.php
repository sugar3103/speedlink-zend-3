<?php
namespace Management\Factory;

use Management\Entity\Pricing;
use Management\Service\PricingManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class PricingManagerFactory implements FactoryInterface {

    /**
     * The method creates the PricingManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return PricingManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new PricingManager(
            $entityManager
        );
    }
}