<?php
namespace Management\Service;

use Management\Entity\PricingData;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingDataManager {

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