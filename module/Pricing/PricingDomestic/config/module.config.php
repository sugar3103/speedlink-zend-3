<?php
namespace PricingDomestic;

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
use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Core\Route\StaticRoute;

$router = [
    'routes' => [
        'domestic' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticPricingController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]         
        ],
        'domestic_data' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic/data[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticPricingDataController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ] 
        ],
        'domestic_vas' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic/vas[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticPricingVasController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ] 
        ],
        'area' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic/area[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticAreaController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]
        ],
        'area_city' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic/area_city[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticAreaCityController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]
        ],
        'zone' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic/zone[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticZoneController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]
        ],
        'range_weight' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/domestic/range-weight[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\DomesticRangeWeightController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]
        ]
    ]
];

$controllers = [
    'factories' => [
        Controller\DomesticPricingController::class => Factory\DomesticPricingControllerFactory::class,
        Controller\DomesticPricingDataController::class => Factory\DomesticPricingDataControllerFactory::class,
        Controller\DomesticPricingVasController::class => Factory\DomesticPricingVasControllerFactory::class,

        Controller\DomesticAreaCityController::class => Factory\DomesticAreaCityControllerFactory::class,
        Controller\DomesticAreaController::class => Factory\DomesticAreaControllerFactory::class,
        Controller\DomesticRangeWeightController::class => Factory\DomesticRangeWeightControllerFactory::class,
        Controller\DomesticZoneController::class => Factory\DomesticZoneControllerFactory::class
    ]
];

$service_manager = [
    'factories' => [
        Service\DomesticPricingManager::class => Factory\DomesticPricingManagerFactory::class,   
        Service\DomesticPricingDataManager::class => Factory\DomesticPricingDataManagerFactory::class,   
        Service\DomesticPricingVasManager::class => Factory\DomesticPricingVasManagerFactory::class,   

        Service\DomesticAreaManager::class => Factory\DomesticAreaManagerFactory::class,   
        Service\DomesticAreaCityManager::class => Factory\DomesticAreaCityManagerFactory::class,
        Service\DomesticRangeWeightManager::class => Factory\DomesticRangeWeightManagerFactory::class,
        Service\DomesticZoneManager::class => Factory\DomesticZoneManagerFactory::class    
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
    'service_manager' => $service_manager,
    'caches' => $caches,
    'doctrine' => $doctrine
];