<?php
namespace Core\Factory;

use Core\Controller\ApiController;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class ApiControllerFactory implements FactoryInterface {

    /**
     * The method creates the UserManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options     
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');  
        $documentManager = $container->get('doctrine.documentmanager.odm_default');

        return new ApiController($entityManager,$documentManager);
    }
}