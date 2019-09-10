<?php
namespace Customer;

use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Core\Route\StaticRoute;

return [
    'router' => [ 
        'routes' => [
            'customer' => [
                'type' => StaticRoute::class,
                'options' => [
                    'verb' => 'POST',
                    'route' => '/customer[/:action]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                    ],
                    'defaults' => [
                        'controller' => Controller\CustomerController::class,
                        'action' => 'index',
                        'isAuthorizationRequired' => true
                    ],
                ]            
            ],
        ]
    ],
    'controllers' => [
        'factories' => [
            Controller\CustomerController::class => Factory\CustomerControllerFactory::class
        ]
    ],
    'service_manager'   => [
        'factories' => [
            Service\CustomerManager::class => Factory\CustomerManagerFactory::class,        
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
            Controller\CustomerController::class => [
                ['actions' => '*', 'allow' => '+customer.manage'],            
                ['actions' => ['edit'], 'allow' => '+customer.edit'],
                ['actions' => ['index'], 'allow' => '+customer.view']
            ]
        ]
    ]
];