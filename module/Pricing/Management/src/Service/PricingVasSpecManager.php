<?php
namespace Management\Service;

use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
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
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getListVasSpecByCondition($filters)
    {
        $pricingVasSpecList = [];
        $ormVasSpec = $this->entityManager->getRepository(PricingVasSpec::class)->getListVasSpecByCondition($filters);
        if($ormVasSpec){
            $ormPaginator = new ORMPaginator($ormVasSpec, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingVasSpecList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingVasSpecList;
    }

}