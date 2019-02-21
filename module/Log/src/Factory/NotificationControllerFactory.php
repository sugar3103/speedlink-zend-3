<?php
namespace Log\Factory;

use Log\Controller\NotificationController;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class NotificationControllerFactory implements FactoryInterface {
    /**
     * The method creates the service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $documentManager = $container->get('doctrine.documentmanager.odm_default');
        
        return new NotificationController($entityManager,$documentManager);
    }
}