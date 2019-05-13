<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Controller\DomesticAreaController;
use PricingDomestic\Service\DomesticAreaManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class DomesticAreaControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $domesticAreaManager = $container->get(DomesticAreaManager::class);
        // instantiate the controller and inject dependencies.
        return new DomesticAreaController($entityManager,$domesticAreaManager);
    }
}