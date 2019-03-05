<?php
namespace Management\Factory;

use Management\Controller\PricingCodMinController;
use Management\Service\PricingCodMinManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class PricingCodMinControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $pricingCodMinManager = $container->get(PricingCodMinManager::class);

        // instantiate the controller and inject dependencies.
        return new PricingCodMinController($entityManager,$pricingCodMinManager);
    }
}