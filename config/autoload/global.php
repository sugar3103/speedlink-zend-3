<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */
use Zend\Session\Validator\HttpUserAgent;
use Zend\Session\Validator\RemoteAddr;
use Zend\Session\Storage\SessionArrayStorage;
use Zend\Cache\Storage\Adapter\Filesystem;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\AdapterServiceFactory;

return [
    // Session manager configuration.
    'session_manager' => [
        // Session validators (used for security).
        'validators' => [
            RemoteAddr::class,
            HttpUserAgent::class,
        ]
    ],
    'service_manager' => [
        'abstract_factories' => [
        ],
        'factories' => [
            HttpUserAgent::class,
            RemoteAddr::class,
            Adapter::class => AdapterServiceFactory::class
        ]        
    ],
    
    'session_config' => [],
    'session_storage' => ['type' => SessionArrayStorage::class],
    'ldap' => [
        'primary' => [
            'host'                   => '192.168.0.103',
            'port' => 389,
            'username'               => 'monitor@itl.com',
            'password'               => 'Itlus3r@2013',
            'bindRequiresDn'         => false,
            'accountDomainName'      => 'itl.com',
            'baseDn'                 => 'OU=Central Management,DC=itl,DC=com'
        ],
        'secondary' => [
            'host'                   => '192.168.22.14',
            'port' => 389,
            'username'               => 'mlc-itl\monitor',
            'password'               => 'Itlus3r@2013',
            'bindRequiresDn'         => false,
            'accountDomainName'      => 'mlc-itl.com',
            'baseDn'                 => 'OU=Users,DC=mlc-itl,DC=local'
        ],
    ],
    'default_timezone' => 'Asia/Ho_Chi_Minh',
];
