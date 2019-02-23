<?php
namespace OAuth\Factory;

use OAuth\Service\AuthAdapter;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factory class for AuthAdapter service. The purpose of the factory
 * is to instantiate service and pass id dependencies (inject dependencies).
 * @package OAuth\Service\Factory
 */
class AuthAdapterFactory implements FactoryInterface {

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
        $config = $container->get('config');

        // if(!empty($config['ldap'])) {
        //     $ldapConfig = $config['ldap'];
        // } else {
            $ldapConfig = [];
        // }

        // Create the AuthAdapter and inject dependency to its constructor.
        return new AuthAdapter($entityManager, $ldapConfig);
    }
}