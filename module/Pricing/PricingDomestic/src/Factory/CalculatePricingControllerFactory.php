<?php
namespace PricingDomestic\Factory;

use PricingDomestic\Controller\CalculatePricingController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * This is the factor for UserController. Its purpose is to instantiate the
 * controller and inject dependencies into it.
 * @package PricingDomestic\Controller\Factory
 */
class CalculatePricingControllerFactory implements FactoryInterface {

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $entityManager = $container->get('doctrine.entitymanager.orm_default');
        // instantiate the controller and inject dependencies.
        return new CalculatePricingController($entityManager);
    }
}