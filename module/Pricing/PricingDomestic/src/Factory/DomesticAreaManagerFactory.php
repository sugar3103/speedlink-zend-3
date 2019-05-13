<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Entity\DomesticArea;
use PricingDomestic\Service\DomesticAreaManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class DomesticAreaManagerFactory implements FactoryInterface {
    /**
     * The method creates the DomesticAreaManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return DomesticAreaManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new DomesticAreaManager(
            $entityManager
        );
    }
}