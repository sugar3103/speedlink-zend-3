<?php
namespace Customer\Factory;

use Pricing\Controller\RangeWeightController;
use Pricing\Service\RangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class CustomerControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $rangeweightManager = $container->get(RangeWeightManager::class);

        // instantiate the controller and inject dependencies.
        return new CustomerController($entityManager,$rangeweightManager);
    }
}