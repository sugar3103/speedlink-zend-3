<?php
namespace Management\Service;

use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     */
    public function __construct(
        $entityManager
    )
    {
        $this->entityManager = $entityManager;
    }   

}