<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Controller\DomesticPricingDataController;
use PricingDomestic\Service\DomesticPricingDataManager;
use PricingDomestic\Service\DomesticPricingManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package PricingDomestic\Controller\Factory
 */
class DomesticPricingDataControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $domesticPricingManager = $container->get(DomesticPricingManager::class);
        $domesticPricingDataManager = $container->get(DomesticPricingDataManager::class);

        // instantiate the controller and inject dependencies.
        return new DomesticPricingDataController($entityManager, $domesticPricingManager, $domesticPricingDataManager);
    }
}