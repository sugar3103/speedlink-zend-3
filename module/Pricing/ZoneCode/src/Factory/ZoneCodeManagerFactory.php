<?php
namespace ZoneCode\Factory;

use ZoneCode\Entity\ZoneCode;
use ZoneCode\Service\ZoneCodeManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class ZoneCodeManagerFactory implements FactoryInterface {

    /**
     * The method creates the ZoneCodeManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return ZoneCodeManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new ZoneCodeManager(
            $entityManager
        );
    }
}