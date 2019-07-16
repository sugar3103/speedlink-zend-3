<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Controller\DomesticPricingController;
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
class DomesticPricingControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $domesticPricingManager = $container->get(DomesticPricingManager::class);
        // instantiate the controller and inject dependencies.
        return new DomesticPricingController($entityManager, $domesticPricingManager);
    }
}