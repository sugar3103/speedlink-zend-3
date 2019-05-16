<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Controller\DomesticPricingVasController;
use PricingDomestic\Service\DomesticPricingVasManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package PricingDomestic\Controller\Factory
 */
class DomesticPricingVasControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $domesticPricingVasManager = $container->get(DomesticPricingVasManager::class);

        // instantiate the controller and inject dependencies.
        return new DomesticPricingVasController($entityManager, $domesticPricingVasManager);
    }
}