<?php
namespace OAuth;

use Zend\Log\Logger;
use Zend\Log\LoggerAbstractServiceFactory;
use Zend\ModuleManager\Feature\ConfigProviderInterface;

/**
 * Class Module
 *
 * @package OAuth
 */
class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}