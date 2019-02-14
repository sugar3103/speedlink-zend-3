<?php
namespace NetworkPort\Factory;

use NetworkPort\Entity\BranchArea;
use NetworkPort\Service\BranchAreaManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class BranchAreaManagerFactory implements FactoryInterface {

    /**
     * The method creates the BranchManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return BranchAreaManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new BranchAreaManager(
            $entityManager
        );
    }
}