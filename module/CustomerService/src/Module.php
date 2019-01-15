<?php
namespace CustomerService;

use Zend\Log\Logger;
use Zend\Log\LoggerAbstractServiceFactory;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
use Zend\Mvc\Application;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Session\Container;
use Zend\Session\SessionManager;

class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}