<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
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

    public function getListPricingDataByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $pricingDataList = [];
        $totalPricingData = 0;

        $ormPricingData = $this->entityManager->getRepository(PricingData::class)->getListPricingDataByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormPricingData){
            $ormPaginator = new ORMPaginator($ormPricingData, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalPricingData = $ormPaginator->count();
            $pricingDataList = $ormPaginator->getIterator()->getArrayCopy();
            $pricingDataList = Utils::formatDateTime($pricingDataList);
        }

        //set return data
        $dataPricingData = [
            'listPricingData' => $pricingDataList,
            'totalPricingData' => $totalPricingData,
        ];
        return $dataPricingData;
    }

}