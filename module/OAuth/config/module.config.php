<?php

/*
* Config OAuth Module
*/

namespace OAuth;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Doctrine\Common\Cache\FilesystemCache;
use Zend\Authentication\AuthenticationService;
use Zend\ServiceManager\Factory\InvokableFactory;

// Routes Module
$routes = [
    'auth' => [
        'type' => Segment::class,
        'options' => [
            'route' => '/auth',
            'defaults' => [
                'controller' => Controller\AuthController::class,
                'action' => 'index',
            ],
        ],
        'may_terminate' =>  true,
    ]
];

$childrens = [
    'login' => [
        'type' => Segment::class,
        'options' => [
            'route' => '/login',
            'defaults' => [
                'controller' => Controller\AuthController::class,
                'action' => 'login',                
            ],
        ]
    ],
    'change' => [
        'type'  => Segment::class,
        'options' => [
            'route' => '/change',
            'defaults' => [
                'controller' => Controller\AuthController::class,
                'action' => 'change',
                'isAuthorizationRequired' => true
            ],
        ]
    ]
];

//Route Child
$routes['auth']['child_routes'] = $childrens;

//Controllers
$controllers = [
    'factories' => [
        Controller\AuthController::class => InvokableFactory::class        
    ]
];
return [
    'router' => ['routes' => $routes],
    'controllers' => $controllers  
];