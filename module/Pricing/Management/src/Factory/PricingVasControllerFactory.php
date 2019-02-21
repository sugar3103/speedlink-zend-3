<?php
namespace Management\Factory;

use Management\Controller\PricingVasController;
use Management\Service\PricingVasManager;
use Interop\Container\ContainerInterface;
use Management\Service\PricingVasSpecManager;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class PricingVasControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $pricingVasManager = $container->get(PricingVasManager::class);
        $pricingVasSpecManager = $container->get(PricingVasSpecManager::class);

        // instantiate the controller and inject dependencies.
        return new PricingVasController($entityManager,$pricingVasManager,$pricingVasSpecManager);
    }
}