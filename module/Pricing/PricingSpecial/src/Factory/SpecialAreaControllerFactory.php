<?php
namespace PricingSpecial\Factory;

use PricingSpecial\Controller\SpecialAreaController;
use PricingSpecial\Service\SpecialAreaManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class SpecialAreaControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $specialAreaManager = $container->get(SpecialAreaManager::class);
        // instantiate the controller and inject dependencies.
        return new SpecialAreaController($entityManager,$specialAreaManager);
    }
}