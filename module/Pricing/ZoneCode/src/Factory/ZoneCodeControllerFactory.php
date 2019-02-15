<?php
namespace ZoneCode\Factory;

use ZoneCode\Controller\ZoneCodeController;
use ZoneCode\Service\ZoneCodeManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\ServiceManager\ServiceManager;
use Doctrine\Common\Cache\FilesystemCache;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package Base\Controller\Factory
 */
class ZoneCodeControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $ZoneCodeManager = $container->get(ZoneCodeManager::class);

        // instantiate the controller and inject dependencies.
        return new ZoneCodeController($entityManager,$rangeweightManager);
    }
}