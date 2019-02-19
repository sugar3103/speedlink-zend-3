<?php
namespace Management\Service;

use Management\Entity\PricingVasSpec;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingVasSpecManager {

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