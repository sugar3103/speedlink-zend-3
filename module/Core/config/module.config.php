<?php
namespace Core;

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
            ],
            'application' => [
                'type'    => StaticRoute::class,
                'options' => [
                    'route'    => '/application[/:action]',
                    'defaults' => [
                        'controller' => Controller\CoreController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        ],
    ],
    
    'controllers' => [
        'factories' => [
            Controller\CoreController::class => Factory\CoreControllerFactory::class,
            Controller\ApiController::class => Factory\ApiControllerFactory::class,
            Controller\RouteNotFoundController::class => Factory\RouteNotFoundControllerFactory::class,
        ],
    ],

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
    ],
];
