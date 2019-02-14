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
        $headers->addHeaderLine('Access-Control-Expose-Headers: Content-Length');
        $headers->addHeaderLine('Access-Control-Allow-Methods: POST');
        $headers->addHeaderLine('Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept');        

        $serviceManager = $event->getApplication()->getServiceManager();

        $eventManager = $event->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
        $shareEventManager = $eventManager->getSharedManager();
        $shareEventManager->attach(AbstractActionController::class, MvcEvent::EVENT_DISPATCH,
            [$this,'onDispatch'], 101);             
    }

      /**
     * Event listener method for the 'Dispatch' event. We listen to the Dispatch
     * event to call the access filter. The access filter allows to determine if
     * the current visitor is allowed to see the page or not. If he/she
     * is not authenticated and is not allowed to see the page, we redirect the user
     * to the login page.
     *
     * @param MvcEvent $event
     * @return mixed
     */
    public function onDispatch(MvcEvent $event)
    {
        // get controller and action to which the HTTP request was dispatched.
        $controller = $event->getTarget();

        $controllerName = $event->getRouteMatch()->getParam('controller', null);
        $actionName = $event->getRouteMatch()->getParam('action', null);
        // convert dash-style action name to camel-case.
        $actionName = str_replace('-', '', lcfirst(ucwords($actionName, '-')));
       
        
    }
}
