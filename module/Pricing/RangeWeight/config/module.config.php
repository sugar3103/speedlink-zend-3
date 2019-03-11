<?php
namespace RangeWeight;

use Doctrine\Common\Cache\FilesystemCache;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use DoctrineExtensions\Query\Mysql\GroupConcat;
use Gedmo\SoftDeleteable\Filter\SoftDeleteableFilter;
use Gedmo\SoftDeleteable\SoftDeleteableListener;
use Gedmo\Timestampable\TimestampableListener;
use Zend\Cache\Storage\Adapter\Filesystem;
use Core\Route\StaticRoute;
use Core\DBAL\Types\UTCDateTimeType;

$router = [
    'routes' => [
        'rangeweight' => [
            'type' => StaticRoute::class,
            'options' => [
                'verb' => 'POST',
                'route' => '/range-weight[/:action]',
                'constraints' => [
                    'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                ],
                'defaults' => [
                    'controller' => Controller\RangeWeightController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ]
            ]
        ]
    ]
];
$controllers = [
    'factories' => [
        Controller\RangeWeightController::class => Factory\RangeWeightControllerFactory::class
    ]
];

$service_manager = [
    'factories' => [  
        Service\RangeWeightManager::class => Factory\RangeWeightManagerFactory::class
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

$access_filter =  [
    'options' => [
        'mode' => 'permissive'//restrictive or permissive
    ],
    'controllers' => [
        Controller\RangeWeightController::class => [
            ['actions' => '*', 'allow' => '+rangeweight.manage'],            
            ['actions' => ['index'], 'allow' => '+rangeweight.view'],
            ['actions' => ['edit'], 'allow' => '+rangeweight.edit']            
        ]
    ]    
];

return [
    'router' => $router,
    'controllers' => $controllers,
    'caches'    => $caches,
    'service_manager'   => $service_manager,
    'doctrine'          => $doctrine,
    'view_manager' => $view_manager,
    'access_filter' => $access_filter
];