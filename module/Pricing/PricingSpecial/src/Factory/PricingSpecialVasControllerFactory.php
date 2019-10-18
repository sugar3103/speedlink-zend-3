<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Controller\PricingSpecialVasController;
use PricingSpecial\Service\PricingSpecialVasManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package PricingSpecial\Controller\Factory
 */
class PricingSpecialVasControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $domesticPricingVasManager = $container->get(PricingSpecialVasManager::class);

        // instantiate the controller and inject dependencies.
        return new PricingSpecialVasController($entityManager, $domesticPricingVasManager);
    }
}