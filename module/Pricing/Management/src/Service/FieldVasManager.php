<?php
namespace Management\Service;

use Management\Entity\FieldVas;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class FieldVasManager {

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