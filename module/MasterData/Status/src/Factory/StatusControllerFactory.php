<?php
namespace Status\Factory;

use Zend\ServiceManager\Factory\FactoryInterface;
use Interop\Container\ContainerInterface;
use Status\Controller\StatusController;
use Status\Service\StatusManager;

class StatusControllerFactory implements FactoryInterface {

    /**
     * Invoke AuthController.
     *
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return StatusController|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $statusManager = $container->get(StatusManager::class);

        return new StatusController($entityManager, $statusManager);        
    }
}