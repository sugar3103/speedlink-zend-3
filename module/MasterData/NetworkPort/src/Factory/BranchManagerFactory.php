<?php
namespace NetworkPort\Factory;

use NetworkPort\Entity\Branch;
use NetworkPort\Service\BranchManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class BranchManagerFactory implements FactoryInterface {

    /**
     * The method creates the BranchManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return BranchManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new BranchManager(
            $entityManager
        );
    }
}