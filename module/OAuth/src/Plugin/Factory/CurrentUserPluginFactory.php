<?php
namespace OAuth\Controller\Plugin\Factory;

use OAuth\Controller\Plugin\CurrentUserPlugin;
use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;
use Zend\ServiceManager\Factory\FactoryInterface;

class CurrentUserPluginFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $authService = $container->get(AuthenticationService::class);

        return new CurrentUserPlugin($entityManager, $authService);
    }
}