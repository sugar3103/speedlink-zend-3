<?php
namespace Core\Factory;

use Core\Service\SettingManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class SettingManagerFactory implements FactoryInterface {

    /**
     * The method creates the UserManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return UserManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        // $mongoManager = $container->get('doctrine.documentManager.odm_default');
        $documentManager = $container->get('doctrine.documentmanager.odm_default');

        return new settingManager(
            $entityManager,
            $documentManager
        );
    }
}