<?php
namespace Address\Factory;

use Address\Controller\AddressController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Address\Service\AddressCodeManager;

class AddressControllerFactory implements FactoryInterface {
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
        $codeManager = $container->get(AddressCodeManager::class);
        return new AddressController($entityManager, $codeManager);
    }
}