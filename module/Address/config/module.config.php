<?php
namespace Address;

use Doctrine\Common\Cache\FilesystemCache;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use DoctrineExtensions\Query\Mysql\GroupConcat;
use Gedmo\SoftDeleteable\Filter\SoftDeleteableFilter;
use Gedmo\SoftDeleteable\SoftDeleteableListener;
use Gedmo\Timestampable\TimestampableListener;
use Zend\Authentication\AuthenticationService;
use Zend\Cache\Storage\Adapter\Filesystem;
use Zend\Log\Formatter\Simple;
use Zend\Log\Logger;
use Zend\Log\LoggerAbstractServiceFactory;
use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

$router = [
    'routes' => [
        'address' => [
            'type' => Segment::class,
            'options' => [
                'route' => '/address',
                'defaults' => [
                    'controller' => Controller\AddressController::class,
                    'action' => 'index',
                    'isAuthorizationRequired' => true
                ],
            ],
            'may_terminate' => true,
            'child_routes'  => [
                'country' => [
                    'type'  => Segment::class,
                    'options' => [
                        'route' => '/country',
                        'defaults' => [
                            'controller' => Controller\CountryController::class,
                            'action' => 'list',
                            'isAuthorizationRequired' => true
                        ]
                    ],
                    'may_terminate' => true,
                    'child_routes'  => [
                        'list' => [
                            'type'  => Segment::class,
                            'options' => [
                                'route' => '/add',
                                'defaults' => [
                                    'controller' => Controller\CountryController::class,
                                    'action' => 'add',
                                    'isAuthorizationRequired' => true
                                ]
                            ]
                        ]
                    ]
                ],
                'city' => [
                    'type'  => Segment::class,
                    'options' => [
                        'route' => '/city',
                        'defaults' => [
                            'controller' => Controller\CityController::class,
                            'action' => 'list',
                            'isAuthorizationRequired' => true
                        ]
                    ],
                    'may_terminate' => true,
                    'child_routes'  => [
                        'list' => [
                            'type'  => Segment::class,
                            'options' => [
                                'route' => '/add',
                                'defaults' => [
                                    'controller' => Controller\CityController::class,
                                    'action' => 'add',
                                    'isAuthorizationRequired' => true
                                ]
                            ]
                        ]
                    ]
                ]               
            ]
        ],
    ]
];
$controllers = [
    'factories' => [
        Controller\CountryController::class => Factory\CountryControllerFactory::class,
        Controller\CityController::class => Factory\CityControllerFactory::class,
        Controller\DistrictController::class => Factory\DistrictControllerFactory::class,
        Controller\WardController::class => Factory\WardControllerFactory::class,
        Controller\AddressController::class => Factory\AddressControllerFactory::class,
    ]
];

$view_manager = [
    'strategies' => [
        'ViewJsonStrategy'        
    ]
];

$service_manager = [
    'factories' => [
        Service\CountryManager::class => Factory\CountryManagerFactory::class,
        Service\CityManager::class => Factory\CityManagerFactory::class,
        Service\DistrictManager::class => Factory\DistrictManagerFactory::class,
        Service\WardManager::class => Factory\WardManagerFactory::class,
        Service\AddressCodeManager::class => Factory\AddressCodeManagerFactory::class
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