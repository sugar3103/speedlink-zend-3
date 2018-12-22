<?php

namespace Core;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

return [
    'router' => [
        'routes' => [
            '404' => [
                'type' => Segment::class,
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
                'type' => Segment::class,
                'options' => [
                    'route'    => '/',
                    'defaults' => [
                        'controller' => Controller\CoreController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'application' => [
                'type'    => Segment::class,
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
            Controller\CoreController::class => InvokableFactory::class,
            Controller\ApiController::class => InvokableFactory::class,
            Controller\RouteNotFoundController::class => InvokableFactory::class,
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
