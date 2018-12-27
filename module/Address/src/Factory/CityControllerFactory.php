<?php
namespace Address\Factory;

use Address\Controller\CityController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Address\Service\CityManager;

class CityControllerFactory implements FactoryInterface {
    /**
     * This method creates the AuthAdapter service an returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        // Get doctrine entity manager for Service Manager.
        $entityManager = $container->get('doctrine.entitymanager.orm_default');        
        $cityManager = $container->get(CityManager::class);
        return new CityController($entityManager, $cityManager);
    }
}