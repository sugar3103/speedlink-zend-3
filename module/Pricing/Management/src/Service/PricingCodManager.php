<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
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
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getListCodByCondition($param)
    {
        $pricingCodList = [];
        $ormCod = $this->entityManager->getRepository(PricingCod::class)->getListCodByCondition($param);
        if($ormCod){
            $ormPaginator = new ORMPaginator($ormCod, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingCodList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingCodList;
    }

}