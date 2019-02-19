<?php
namespace Management\Factory;

use Management\Controller\PricingDataController;
use Management\Service\PricingDataManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class PricingDataControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $pricingDataManager = $container->get(PricingDataManager::class);

        // instantiate the controller and inject dependencies.
        return new PricingDataController($entityManager,$pricingDataManager);
    }
}