<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Core;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

$router =  [
    'routes' => [
        'home' => [
            'type' => Literal::class,
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
];

$controllers = [
    'factories' => [
        Controller\CoreController::class => Factory\CoreControllerFactory::class,
    ]
];

$view_manager = [
    'display_not_found_reason' => true,
    'display_exceptions'       => true,
    'doctype'                  => 'HTML5',
    'not_found_template'       => 'error/404',
    'exception_template'       => 'error/index',
    'template_map' => [
        'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
        'core/core/index' => __DIR__ . '/../view/core/index/index.phtml',
        'error/404'               => __DIR__ . '/../view/error/404.phtml',
        'error/index'             => __DIR__ . '/../view/error/index.phtml',
    ],
    'template_path_stack' => [
        __DIR__ . '/../view',
    ],
    'strategies' => array(
        'ViewJsonStrategy',
    ),
];

return [
    'router' => $router,
    'controllers' => $controllers,
    'view_manager' => $view_manager,
];
