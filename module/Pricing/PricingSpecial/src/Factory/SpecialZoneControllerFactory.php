<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Controller\SpecialZoneController;
use PricingSpecial\Service\SpecialZoneManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class SpecialZoneControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $domesticZoneManager = $container->get(SpecialZoneManager::class);
        $cache = $container->get(FilesystemCache::class);

        // instantiate the controller and inject dependencies.
        return new SpecialZoneController($entityManager,$domesticZoneManager,$cache);
    }
}