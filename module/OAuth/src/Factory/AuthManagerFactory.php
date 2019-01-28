<?php
namespace OAuth\Factory;

use OAuth\Service\AuthManager;
use OAuth\Service\RbacManager;
use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Session\SessionManager;


class AuthManagerFactory implements FactoryInterface {


    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        // instantiate dependencies.
        $sessionManager = $container->get(SessionManager::class);
        $authenticationService = $container->get(AuthenticationService::class);
        $rbacManager = $container->get(RbacManager::class);

        $config = $container->get('Config');
        if (isset($config['access_filter']))
            $config = $config['access_filter'];
        else
            $config = [];

        // instantiate the AuthManager service and inject dependencies to its constructor.
        return new AuthManager(
            $sessionManager,
            $authenticationService,
            $config,
            $rbacManager
        );
    }
}