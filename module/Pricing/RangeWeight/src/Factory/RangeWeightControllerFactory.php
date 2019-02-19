<?php
namespace RangeWeight\Factory;

use RangeWeight\Controller\RangeWeightController;
use RangeWeight\Service\RangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class RangeWeightControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $rangeweightManager = $container->get(RangeWeightManager::class);

        // instantiate the controller and inject dependencies.
        return new RangeWeightController($entityManager,$rangeweightManager);
    }
}