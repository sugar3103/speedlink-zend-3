<?php
namespace System;

use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Core\Route\StaticRoute;

return [
    'router' => [ 
        'routes' => [
            'setting' => [
                'type' => StaticRoute::class,
                'options' => [
                    'verb' => 'POST',
                    'route' => '/setting[/:action]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                    ],
                    'defaults' => [
                        'controller' => Controller\SettingController::class,
                        'action' => 'index',
                        'isAuthorizationRequired' => true
                    ],
                ]            
            ],
            'info' => [
                'type' => StaticRoute::class,
                'options' => [
                    'verb' => 'POST',
                    'route' => '/system/info',                    
                    'defaults' => [
                        'controller' => Controller\SettingController::class,
                        'action' => 'info',
                        'isAuthorizationRequired' => false
                    ],
                ]            
            ],
        ]
    ],
    'controllers' => [
        'factories' => [
            Controller\SettingController::class => Factory\SettingControllerFactory::class
        ]
    ],
    'service_manager'   => [
        'factories' => [
            Service\SettingManager::class => Factory\SettingManagerFactory::class,        
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
            Controller\SettingController::class => [
                ['actions' => '*', 'allow' => '+setting.manage'],                 
                ['actions' => ['index'], 'allow' => '+setting.view'],
                ['actions' => ['info'], 'allow' => '+setting.any.view']
            ]
        ]
    ]
];