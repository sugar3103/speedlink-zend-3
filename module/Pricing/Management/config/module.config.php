<?php
namespace Management;

use Doctrine\Common\Cache\FilesystemCache;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use DoctrineExtensions\Query\Mysql\GroupConcat;
use Gedmo\SoftDeleteable\Filter\SoftDeleteableFilter;
use Gedmo\SoftDeleteable\SoftDeleteableListener;
use Gedmo\Timestampable\TimestampableListener;
use Zend\Cache\Storage\Adapter\Filesystem;
use Zend\Log\Formatter\Simple;
use Zend\Log\Logger;
use Zend\Log\LoggerAbstractServiceFactory;
use Core\Route\StaticRoute;

use Core\DBAL\Types\UTCDateTimeType;

$router = [
    'routes' => [
        'field_vas' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/field_vas[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\FieldVasController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'pricing' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'pricing_code' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing_code[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingCodController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'pricing_code_min' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing_code_min[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingCodMinController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'pricing_data' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing_data[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingDataController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'pricing_vas' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing_vas[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingVasController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        'pricing_vas_spec' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing_vas_spec[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingVasSpecController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ],
        
    ]
];
$controllers = [
    'factories' => [
        Controller\FieldVasController::class => Factory\FieldVasControllerFactory::class,
        Controller\PricingController::class => Factory\PricingControllerFactory::class,
        Controller\PricingCodController::class => Factory\PricingCodControllerFactory::class,
        Controller\PricingCodMinController::class => Factory\PricingCodMinControllerFactory::class,
        Controller\PricingDataController::class => Factory\PricingDataControllerFactory::class,
        Controller\PricingVasController::class => Factory\PricingVasControllerFactory::class,
        Controller\PricingVasSpecController::class => Factory\PricingVasSpecControllerFactory::class
    ]
];

$service_manager = [
    'factories' => [  
        Service\FieldVasManager::class => Factory\FieldVasManagerFactory::class,        
        Service\PricingManager::class => Factory\PricingManagerFactory::class,        
        Service\PricingCodManager::class => Factory\PricingCodManagerFactory::class,        
        Service\PricingCodMinManager::class => Factory\PricingCodMinManagerFactory::class,        
        Service\PricingDataManager::class => Factory\PricingDataManagerFactory::class,        
        Service\PricingVasManager::class => Factory\PricingVasManagerFactory::class,        
        Service\PricingVasSpecManager::class => Factory\PricingVasSpecManagerFactory::class,        
    ],
];
$view_manager = [
    'strategies' => [
        'ViewJsonStrategy'        
    ]
];

$caches = [
    FilesystemCache::class => [
        'adapter' => [
            'name' => Filesystem::class,
            'options' => [
                // store cache data in directory.
                'cache_dir' => './data/cache',
                // store cached data for 1 hour
                'ttl' => 60*60*1
            ]
        ],
        'plugins' => [
            [
                'name' => 'serializer',
                'options' => []
            ]
        ]
    ]
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
];
return [
    'router' => $router,
    'controllers' => $controllers,
    'caches'    => $caches,
    'service_manager'   => $service_manager,
    'doctrine'          => $doctrine,
    'view_manager' => $view_manager
];