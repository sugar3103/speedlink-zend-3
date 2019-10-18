<?php
namespace Core;

use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Core\Route\StaticRoute;

return [
    'router' => [
        'routes' => [
            '404' => [
                'type' => StaticRoute::class,
                'options' => [
                    'route' => '/:*',
                    'defaults' => [
                        'controller' => Controller\RouteNotFoundController::class,
                        'action' => 'routenotfound',
                    ],
                ],
                'priority' => -1000,
            ],
            'home' => [
                'type' => StaticRoute::class,
                'options' => [
                    'route'    => '/',
                    'defaults' => [
                        'controller' => Controller\CoreController::class,
                        'action'     => 'index',
                    ],
                ],
            ]            
        ]
    ],
    
    'controllers' => [
        'factories' => [
            Controller\CoreController::class => Factory\CoreControllerFactory::class,
            Controller\ApiController::class => Factory\ApiControllerFactory::class,
            Controller\RouteNotFoundController::class => Factory\RouteNotFoundControllerFactory::class,
        ],
    ],

    // 'doctrine' => [
    //     'driver' => [
    //         __NAMESPACE__ . '_driver' => [
    //             'class' => AnnotationDriver::class,
    //             'cache' => 'array',
    //             'paths' => [
    //                 __DIR__ . '/../src/Entity'
    //             ]
    //         ],

    //         'orm_default' => [
    //             'drivers' => [
    //                 __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
    //             ]
    //         ],            
           
    //         'orm_report' => [
    //             'drivers' => [
    //                 __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
    //             ]
    //         ],

    //         'orm_read_only' => [
    //             'drivers' => [
    //                 __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
    //             ]
    //         ]
    //     ],
        
    // ],

    'view_manager' => [
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => [
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'core/core/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
        'strategies' => [
            'ViewJsonStrategy'        
        ]
    ]   
];
