<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Controller\PricingSpecialController;
use PricingSpecial\Service\PricingSpecialManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package PricingSpecial\Controller\Factory
 */
class PricingSpecialControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $pricingSpecialManager = $container->get(PricingSpecialManager::class);
        // instantiate the controller and inject dependencies.
        return new PricingSpecialController($entityManager, $pricingSpecialManager);
    }
}