<?php
namespace Customer\Factory;

use Pricing\Entity\RangeWeight;
use Pricing\Service\RangeWeightManager;
use Interop\Container\ContainerInterface;
use Zend\Config\Config;
use Zend\ServiceManager\Factory\FactoryInterface;

class CustomerManagerFactory implements FactoryInterface {

    /**
     * The method creates the RangeWeightManager service and returns its instance.
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param array|null $options
     * @return RangeWeightManager|object
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');

        return new RangeWeightManager(
            $entityManager
        );
    }
}