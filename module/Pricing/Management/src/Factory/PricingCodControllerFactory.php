<?php
namespace Management\Factory;

use Management\Controller\PricingCodController;
use Management\Service\PricingCodManager;
use Interop\Container\ContainerInterface;
use Management\Service\PricingCodMinManager;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class PricingCodControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $pricingCodManager = $container->get(PricingCodManager::class);
        $pricingCodMinManager = $container->get(PricingCodMinManager::class);

        // instantiate the controller and inject dependencies.
        return new PricingCodController($entityManager, $pricingCodManager, $pricingCodMinManager);
    }
}