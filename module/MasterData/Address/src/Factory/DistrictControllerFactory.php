<?php
namespace Address\Factory;

use Address\Controller\DistrictController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Address\Service\DistrictManager;

class DistrictControllerFactory implements FactoryInterface {
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
        $districtManager = $container->get(DistrictManager::class);
        return new DistrictController($entityManager, $districtManager);
    }
}