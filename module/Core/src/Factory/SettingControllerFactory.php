<?php
namespace Core\Factory;

use Core\Controller\SettingController;
use Core\Service\SettingManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class SettingControllerFactory implements FactoryInterface {

    /**
     * The method creates the UserManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options     
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');        
        $settingManager = $container->get(SettingManager::class);
        
        return new SettingController($entityManager,$settingManager);
    }
}