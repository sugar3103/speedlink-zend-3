<?php
namespace Core\Factory;

use Core\Controller\CoreController;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class CoreControllerFactory implements FactoryInterface {

    /**
     * The method creates the UserManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        
        return new CoreController($entityManager);
    }
}