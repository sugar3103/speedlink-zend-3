<?php
namespace Management\Service;

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
        $shipmentTypes = [];
        $totalShipmentType = 0;

        //get orm carrier
        $ormShipmentType = $this->entityManager->getRepository(Pricing::class)->getListPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormShipmentType){
            $ormPaginator = new ORMPaginator($ormShipmentType, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalShipmentType = $ormPaginator->count();
            $shipmentTypes = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($shipmentTypes as $key => $shipmentType) {
                $date_format = 'd/m/Y H:i:s';
                $shipmentTypes[$key]['created_at'] = Utils::checkDateFormat($shipmentType['created_at'], $date_format);
                $shipmentTypes[$key]['updated_at'] = Utils::checkDateFormat($shipmentType['updated_at'], $date_format);
            }
        }

        //set return data
        $dataShipmentType = [
            'listShipmentType' => $shipmentTypes,
            'totalShipmentType' => $totalShipmentType,
        ];
        return $dataShipmentType;
    }

}