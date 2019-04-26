<?php
namespace Log;

use Zend\Cache\Storage\Adapter\Filesystem;
use Zend\Log\Formatter\Simple;
use Core\Route\StaticRoute;
use Core\DBAL\Types\UTCDateTimeType;


$router = [
    'routes' => [
        'notification' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/notification[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                ],                       
                'defaults' => [
                    'controller' => Controller\NotificationController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => false
                ]
            ]
         
        ]        
    ]
];


$view_manager = [
    'strategies' => [
        'ViewJsonStrategy'        
    ]
];

$controllers = [
    'factories'=> [
        Controller\NotificationController::class => Factory\NotificationControllerFactory::class
    ]
];

$service_manager = [];

$doctrine = [
    'driver' => [
        __NAMESPACE__ . '_driver' => [
            'class' => 'Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver',
            'cache' => 'array',
            'paths' => [
                __DIR__ . '/../src/Entity'
            ]
        ],
        'odm_default' => [
            'drivers' => [
                __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
            ]
        ],       
    ]
];


return [
    'router'            => $router,
    'controllers'       => $controllers,    
    // 'service_manager'   => $service_manager,
    'doctrine'          => $doctrine,
    'view_manager'      => $view_manager
];