<?php
namespace NetworkPort\Factory;

use NetworkPort\Entity\Hub;
use NetworkPort\Service\HubManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class HubManagerFactory implements FactoryInterface {

    /**
     * The method creates the HubManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return HubManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new HubManager(
            $entityManager
        );
    }
}