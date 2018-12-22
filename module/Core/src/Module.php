<?php
namespace Core;

use Zend\Log\Logger;
use Zend\Log\LoggerAbstractServiceFactory;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
use Zend\Mvc\Application;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Session\Container;
use Zend\Session\SessionManager;

class Module
{
    const VERSION = '3.0.3-dev';

    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function onBootstrap(MvcEvent $event)
    {
        // Set CORS headers to allow all requests
        $headers = $event->getResponse()->getHeaders();
        $headers->addHeaderLine('Access-Control-Allow-Origin: *');
        $headers->addHeaderLine('Access-Control-Allow-Methods: PUT, GET, POST, PATCH, DELETE, OPTIONS');
        $headers->addHeaderLine('Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept');
    }
}
