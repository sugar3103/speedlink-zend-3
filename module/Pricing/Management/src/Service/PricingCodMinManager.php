<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
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
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getListCodMinByCondition($filters)
    {
        $pricingCodMinList = [];
        $ormCodMin = $this->entityManager->getRepository(PricingCodMin::class)->getListCodMinByCondition($filters);
        if($ormCodMin){
            $ormPaginator = new ORMPaginator($ormCodMin, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingCodMinList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingCodMinList;
    }

}