<?php
namespace Management\Service;

use Management\Entity\PricingCod;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingCodManager {

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