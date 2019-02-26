<?php
namespace OAuth\Factory;

use OAuth\Service\RbacAssertionManager;
use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory class for RbacAssertionManager service. The purpose of the factory
 * is to instantiate the service and pass it dependencies (inject dependencies)
 *
 * @package OAuth\Factory
 */
class RbacAssertionManagerFactory implements FactoryInterface {


    /**
     * This method creates the RbacManager service and returns its instantiate.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return RbacAssertionManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        $authService = $container->get(AuthenticationService::class);

        return new RbacAssertionManager($entityManager, $authService);
    }
}