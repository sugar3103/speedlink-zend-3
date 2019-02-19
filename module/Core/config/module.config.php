<?php
namespace Core;

use Doctrine\Common\Cache\FilesystemCache;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use DoctrineExtensions\Query\Mysql\GroupConcat;
use Gedmo\SoftDeleteable\Filter\SoftDeleteableFilter;
use Gedmo\SoftDeleteable\SoftDeleteableListener;
use Gedmo\Timestampable\TimestampableListener;
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
            'setting' => [
                'type'    => StaticRoute::class,
                'options' => [
                    'route' => '/setting[/:action]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                    ],
                    'defaults' => [
                        'controller' => Controller\SettingController::class,
                        'action'     => 'index',
                        'isAuthorizationRequired' => true
                    ],
                ],
            ],
        ],
    ],
    
    'controllers' => [
        'factories' => [
            Controller\CoreController::class => Factory\CoreControllerFactory::class,
            Controller\ApiController::class => Factory\ApiControllerFactory::class,
            Controller\SettingController::class => Factory\SettingControllerFactory::class,
            Controller\RouteNotFoundController::class => Factory\RouteNotFoundControllerFactory::class,
        ],
    ],

    'service_manager' => [
        'factories' => [
            Service\SettingManager::class => Factory\SettingManagerFactory::class
        ]
    ],
    'doctrine' => [
        'driver' => [
            __NAMESPACE__ . '_driver' => [
                'class' => AnnotationDriver::class,
                'cache' => 'array',
                'paths' => [
                    __DIR__ . '/../src/Entity'
                ]
            ],
            __NAMESPACE__ . '_driver_document' => [
                'class' => 'Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => [
                    __DIR__ . '/../src/Entity'
                ]
            ],
            'orm_default' => [
                'drivers' => [
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                ]
            ],
            
            'odm_default' => [
                'drivers' => [
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver_document'
                ]
            ],
            'orm_report' => [
                'drivers' => [
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                ]
            ],
            'orm_read_only' => [
                'drivers' => [
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                ]
            ]
        ],
        'eventmanager' => [
            'orm_default' => [
                'subscribers' => [
                    SoftDeleteableListener::class,
                    TimestampableListener::class,
                ],
            ],
            'orm_report' => [
                'subscribers' => [
                    SoftDeleteableListener::class,
                    TimestampableListener::class,
                ],
            ],
            'orm_read_only' => [
                'subscribers' => [
                    SoftDeleteableListener::class,
                    TimestampableListener::class,
                ],
            ],
        ],
        'configuration' => [
            'orm_default' => [
                'datetime_functions' => [
                    'DATE' => \Zend\Validator\Date::class,
                ],
                'filters' => [
                    'soft-deletable' => SoftDeleteableFilter::class,
                ],
                'types' => [
                    'datetime' => UTCDateTimeType::class,
                ],
                'string_functions' => [
                    'GROUP_CONCAT' => GroupConcat::class
                ]
            ],
            'orm_read_only' => [
                'datetime_functions' => [
                    'DATE' => Date::class,
                ],
                'filters' => [
                    'soft-deletable' => SoftDeleteableFilter::class,
                ],
                'types' => [
                    'datetime' => UTCDateTimeType::class,
                ],
            ],
            'orm_report' => [
                'datetime_functions' => [
                    'DATE' => Date::class,
                ],
                'filters' => [
                    'soft-deletable' => SoftDeleteableFilter::class,
                ],
                'types' => [
                    'datetime' => UTCDateTimeType::class,
                ],
            ]
        ]
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
