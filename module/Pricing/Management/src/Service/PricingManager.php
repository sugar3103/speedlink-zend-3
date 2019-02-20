<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\Pricing;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingManager {

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

    public function getListPricingByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $pricingList = [];
        $totalPricing = 0;

        //get orm carrier
        $ormPricing = $this->entityManager->getRepository(Pricing::class)->getListPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormPricing){
            $ormPaginator = new ORMPaginator($ormPricing, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalPricing = $ormPaginator->count();
            $pricingList = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($pricingList as $key => $pricing) {
                $date_format = 'd/m/Y H:i:s';
                $pricingList[$key]['created_at'] = Utils::checkDateFormat($pricing['created_at'], $date_format);
                $pricingList[$key]['updated_at'] = Utils::checkDateFormat($pricing['updated_at'], $date_format);
                $pricingList[$key]['effected_date'] = Utils::checkDateFormat($pricing['effected_date'], $date_format);
                $pricingList[$key]['expired_date'] = Utils::checkDateFormat($pricing['expired_date'], $date_format);
            }
        }

        //set return data
        $dataPricing = [
            'listPricing' => $pricingList,
            'totalPricing' => $totalPricing,
        ];
        return $dataPricing;
    }

}