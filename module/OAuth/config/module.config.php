<?php
namespace OAuth;

use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Zend\Authentication\AuthenticationService;
use Core\Route\StaticRoute;

$router = [
    'routes' => [
        'auth' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/auth[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                ],                       
                'defaults' => [
                    'controller' => Controller\AuthController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => false
                ]
            ]
         
        ],
        'users' => [
            'type' => StaticRoute::class,
            'options' => [
                'route' => '/users',                
                'defaults' => [
                    'controller' => Controller\UserController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
         
        ],
        'user' => [
            'type' => StaticRoute::class,
            'options' => [
                'route' => '/user[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                ],                       
                'defaults' => [
                    'controller' => Controller\UserController::class,
                    'action' => 'info',
                    'isAuthorizationRequired' => true
                ]
            ]
         
        ],
        'roles' => [
            'type' => StaticRoute::class,
            'options' => [
                'route' => '/roles[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\RoleController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'permission' => [
            'type' => StaticRoute::class,
            'options' => [
                'route' => '/permission[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PermissionController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
    ]
];

$controllers = [
    'factories' => [
        Controller\AuthController::class        => Factory\AuthControllerFactory::class,
        Controller\UserController::class        => Factory\UserControllerFactory::class,
        Controller\RoleController::class        => Factory\RoleControllerFactory::class,
        Controller\PermissionController::class  => Factory\PermissionControllerFactory::class
    ]
];

$service_manager = [
    'factories' => [
        AuthenticationService::class => Factory\AuthenticationServiceFactory::class,
        Service\RbacAssertionManager::class => Factory\RbacAssertionManagerFactory::class,
        Service\AuthAdapter::class  => Factory\AuthAdapterFactory::class,
        Service\AuthManager::class  => Factory\AuthManagerFactory::class,
        Service\PermissionManager::class => Factory\PermissionManageFactory::class,
        Service\RbacManager::class  =>  Factory\RbacManagerFactory::class,
        Service\RoleManager::class => Factory\RoleManagerFactory::class,
        Service\UserManager::class => Factory\UserManagerFactory::class,        
    ],
];

$doctrine = [
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
];

$access_filter = [
    'options' => [
        'mode' => 'permissive'//restrictive or permissive
    ],
    'controllers' => [
        Controller\UserController::class => [
            ['actions' => ['index','edit','view'], 'allow' => '+user.manage'],
            ['actions' => ['edit'], 'allow' => '+user.edit'],
            ['actions' => ['index'], 'allow' => '+user.view'],
        ],
        Controller\RoleController::class => [
            ['actions' => ['index', 'add', 'edit'], 'allow' => '+role.manage'],
            ['actions' => ['index'], 'allow' => '+role.view']
        ],
        Controller\PermissionController::class => [            
            ['actions' => ['index','add','edit'], 'allow' => '+permission.manage'],
            ['actions' => ['index'], 'allow' => '+permission.view'],
            ['actions' => ['add'], 'allow' => '+permission.add'],
        ]
    ]
];

return [
    'router'            => $router,
    'controllers'       => $controllers,        
    'service_manager'   => $service_manager,
    'doctrine'          => $doctrine,
    'access_filter'     => $access_filter
];