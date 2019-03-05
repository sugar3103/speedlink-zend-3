<?php
namespace Status;

use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Core\Route\StaticRoute;

return [
    'router' => [ 
        'routes' => [
            'status' => [
                'type' => StaticRoute::class,
                'options' => [
                    'verb' => 'POST',
                    'route' => '/status[/:action]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                    ],
                    'defaults' => [
                        'controller' => Controller\StatusController::class,
                        'action' => 'index',
                        'isAuthorizationRequired' => true
                    ],
                ]            
            ],
        ]
    ],
    'controllers' => [
        'factories' => [
            Controller\StatusController::class => Factory\StatusControllerFactory::class
        ]
    ],
    'service_manager'   => [
        'factories' => [
            Service\StatusManager::class => Factory\StatusManagerFactory::class,        
        ],
    ],
    'doctrine'          => [
        'driver' => [
            __NAMESPACE__ . '_driver' => [
                'class' => AnnotationDriver::class,
                'cache' => 'array',
                'paths' => [
                    __DIR__ . '/../src/Entity'
                ]
            ],
            'orm_default' => [
                'drivers' => [
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                ]
            ]       
        ]  
    ],
    'access_filter' => [
        'options' => [
            'mode' => 'permissive'//restrictive or permissive
        ],
        'controllers' => [
            Controller\StatusController::class => [
                ['actions' => '*', 'allow' => '+status.manage'],            
                ['actions' => ['edit'], 'allow' => '+status.edit'],
                ['actions' => ['index'], 'allow' => '+status.view']
            ]
        ]
    ]
];