<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Entity\SpecialArea;
use PricingSpecial\Service\SpecialAreaManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class SpecialAreaManagerFactory implements FactoryInterface {
    /**
     * The method creates the SpecialAreaManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return SpecialAreaManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        return new SpecialAreaManager($entityManager);
    }
}