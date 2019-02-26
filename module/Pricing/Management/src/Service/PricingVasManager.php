<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingVas;
use Doctrine\ORM\EntityManager;

/**
 * @package Managerment\Service
 */
class PricingVasManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function getListVasByCondition($filters)
    {
        $pricingVasList = [];
        $ormVas = $this->entityManager->getRepository(PricingVas::class)->getListVasByCondition($filters);
        if($ormVas){
            $ormPaginator = new ORMPaginator($ormVas, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingVasList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingVasList;
    }
}