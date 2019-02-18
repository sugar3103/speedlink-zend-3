<?php
namespace Management\Service;

use Management\Entity\PricingCodMin;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingCodMinManager {

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