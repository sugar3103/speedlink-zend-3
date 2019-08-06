<?php
namespace PricingSpecial;

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
        'special' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/special[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingSpecialController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]         
        ],
        'special_data' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/special/data[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingSpecialDataController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ] 
        ],
        'specail_area' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/special/area[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\SpecialAreaController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]
        ],
        'specail_zone' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/special/zone[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\SpecialZoneController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => false
                ]               
            ]
        ],
        'special_vas' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/special/vas[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\PricingSpecialVasController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ] 
        ],
        'special_range_weight' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/pricing/special/range-weight[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\SpecialRangeWeightController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]               
            ]
        ]
    ]
];

$controllers = [
    'factories' => [
        Controller\PricingSpecialController::class => Factory\PricingSpecialControllerFactory::class,
        Controller\PricingSpecialDataController::class => Factory\PricingSpecialDataControllerFactory::class,
        Controller\PricingSpecialVasController::class => Factory\PricingSpecialVasControllerFactory::class,

        Controller\SpecialAreaController::class => Factory\SpecialAreaControllerFactory::class,
        Controller\SpecialZoneController::class => Factory\SpecialZoneControllerFactory::class,
        Controller\SpecialRangeWeightController::class => Factory\SpecialRangeWeightControllerFactory::class
    ]
];

$service_manager = [
    'factories' => [
        Service\PricingSpecialManager::class => Factory\PricingSpecialManagerFactory::class,  
        Service\PricingSpecialDataManager::class => Factory\PricingSpecialDataManagerFactory::class,   
        Service\PricingSpecialVasManager::class => Factory\PricingSpecialVasManagerFactory::class,   

        
        Service\SpecialAreaManager::class => Factory\SpecialAreaManagerFactory::class,   
        Service\SpecialZoneManager::class => Factory\SpecialZoneManagerFactory::class,   
        Service\SpecialRangeWeightManager::class => Factory\SpecialRangeWeightManagerFactory::class        
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
    'doctrine' => $doctrine,
];