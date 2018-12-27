<?php
namespace Address\Factory;

use Address\Controller\CountryController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class CountryControllerFactory implements FactoryInterface {
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
        
        return new CountryController($entityManager);
    }
}