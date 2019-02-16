<?php
namespace Customer\Factory;

use Customer\Entity\Customer;
use Customer\Service\CustomerManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class CustomerManagerFactory implements FactoryInterface {

    /**
     * The method creates the CustomerManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return CustomerManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new CustomerManager(
            $entityManager
        );
    }
}