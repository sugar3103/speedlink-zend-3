<?php
namespace Core\Factory;

use Doctrine\Common\Cache\FilesystemCache;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Core\Controller\CoreController;

class CoreControllerFactory implements FactoryInterface {
    
    /**
     * Invoke AuthController.
     *
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return CoreController|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new CoreController();
    }
}