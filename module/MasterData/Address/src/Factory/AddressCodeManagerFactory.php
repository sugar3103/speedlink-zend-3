<?php
namespace Address\Factory;

use Address\Service\AddressCodeManager;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory class for AuthAdapter service. The purpose of the factory
 * is to instantiate service and pass id dependencies (inject dependencies).
 * @package Address\Service\Factory
 */
class AddressCodeManagerFactory implements FactoryInterface {

    /**
     * This method creates the AuthAdapter service an returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return AuthAdapter|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        // Get doctrine entity manager for Service Manager.
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        // Create the AuthAdapter and inject dependency to its constructor.
        return new AddressCodeManager($entityManager);
    }
}