<?php
namespace Core\Factory;

use Core\Plugin\AccessPlugin;
use OAuth\Service\RbacManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory for AccessPlugin. Its purpose is to instantiate the plugin
 * and inject dependencies into its constructor.
 * @package Core\Plugin\Factory
 */
class AccessPluginFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $rbacManager = $container->get(RbacManager::class);

        return new AccessPlugin($rbacManager);
    }
}