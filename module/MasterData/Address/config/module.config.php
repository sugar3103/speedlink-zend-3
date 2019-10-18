<?php
namespace Address;

use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Core\Route\StaticRoute;
use Zend\Router\Http\Segment;

$router = [
    'routes' => [
        'address' => [
            'type' => StaticRoute::class,
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
                        'route' => '/country[/:action]',
                        'constraints' => [
                            'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                        ],                       
                        'defaults' => [
                            'controller' => Controller\CountryController::class,
                            'action' => 'index',
                            'isAuthorizationRequired' => true
                        ]
                    ]                    
                ],
                'city' => [
                    'type'  => Segment::class,
                    'options' => [
                        'route' => '/city[/:action]',
                        'constraints' => [
                            'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                        ],
                        'defaults' => [
                            'controller' => Controller\CityController::class,
                            'action' => 'index',
                            'isAuthorizationRequired' => true
                        ]
                    ]                  
                ],
                'district' => [
                    'type'  => Segment::class,
                    'options' => [
                        'route' => '/district[/:action]',
                        'constraints' => [
                            'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                        ],
                        'defaults' => [
                            'controller' => Controller\DistrictController::class,
                            'action' => 'index',
                            'isAuthorizationRequired' => true
                        ]
                    ]                  
                ],
                'ward' => [
                    'type'  => Segment::class,
                    'options' => [
                        'route' => '/ward[/:action]',
                        'constraints' => [
                            'action' => '[a-zA-Z][a-zA-Z0-9_-]*'                            
                        ],
                        'defaults' => [
                            'controller' => Controller\WardController::class,
                            'action' => 'index',
                            'isAuthorizationRequired' => true
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

$service_manager = [
    'factories' => [
        Service\CountryManager::class => Factory\CountryManagerFactory::class,
        Service\CityManager::class => Factory\CityManagerFactory::class,
        Service\DistrictManager::class => Factory\DistrictManagerFactory::class,
        Service\WardManager::class => Factory\WardManagerFactory::class,
        Service\AddressCodeManager::class => Factory\AddressCodeManagerFactory::class
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
        ]        
    ]
        
];

$access_filter =  [
    'options' => [
        'mode' => 'permissive'//restrictive or permissive
    ],
    'controllers' => [
        Controller\AddressController::class => [
            ['actions' => ['index'], 'allow' => '+masterdata_address.code'],            
        ],
        Controller\CountryController::class => [
            ['actions' => '*', 'allow' => '+masterdata_country.manage'],            
            ['actions' => ['index'], 'allow' => '+masterdata_country.view'],
            ['actions' => ['edit'], 'allow' => '+masterdata_country.edit']            
        ],
        Controller\CityController::class => [
            ['actions' => '*', 'allow' => '+masterdata_city.manage'],            
            ['actions' => ['index'], 'allow' => '+masterdata_city.view'],
            ['actions' => ['edit'], 'allow' => '+masterdata_city.edit']            
        ],
        Controller\DistrictController::class => [
            ['actions' => '*', 'allow' => '+masterdata_district.manage'],            
            ['actions' => ['index'], 'allow' => '+masterdata_ditrict.view'],
            ['actions' => ['edit'], 'allow' => '+masterdata_district.edit']            
        ],
        Controller\WardController::class => [
            ['actions' => '*', 'allow' => '+masterdata_ward.manage'],            
            ['actions' => ['index'], 'allow' => '+masterdata_ward.view'],
            ['actions' => ['edit'], 'allow' => '+masterdata_ward.edit']            
        ]
    ]    
];

return [
    'router' => $router,
    'controllers' => $controllers,    
    'service_manager'   => $service_manager,
    'doctrine'          => $doctrine,
    'access_filter'     => $access_filter
];