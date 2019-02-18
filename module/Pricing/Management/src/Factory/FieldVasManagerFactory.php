<?php
namespace Management\Factory;

use Management\Entity\FieldVas;
use Management\Service\FieldVasManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class FieldVasManagerFactory implements FactoryInterface {

    /**
     * The method creates the FieldVasManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return FieldVasManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new FieldVasManager(
            $entityManager
        );
    }
}