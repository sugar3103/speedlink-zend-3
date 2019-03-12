<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\Pricing;
use Management\Entity\PricingData;
use Doctrine\ORM\EntityManager;
use OAuth\Entity\User;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;

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
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param PricingData $pricingData
     * @param array $data
     * @param Object $user
     * @param string $mode
     * @throws \Exception
     */
    private function getReferenced(&$pricingData, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }
        if ($mode == 'add') {
            $pricingData->setJoinCreated($user_data);
        }
        $pricingData->setJoinUpdated($user_data);

        if (!empty($data['service_id'])) {
            $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
            if ($service == null) {
                throw new \Exception('Not found Service Code');
            }
            $pricingData->setJoinService($service);
        }

        if (!empty($data['shipment_type_id'])) {
            $shipment_type = $this->entityManager->getRepository(ShipmentType::class)->find($data['shipment_type_id']);
            if ($shipment_type == null) {
                throw new \Exception('Not found Shipment Type');
            }
            $pricingData->setJoinShipmentType($shipment_type);
        }
    }
    public function getListPricingDataByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $pricingDataDataList = [];
        $totalPricingData = 0;

        $ormPricingData = $this->entityManager->getRepository(PricingData::class)->getListPricingDataByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormPricingData){
            $ormPaginator = new ORMPaginator($ormPricingData, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalPricingData = $ormPaginator->count();
            $pricingDataDataList = $ormPaginator->getIterator()->getArrayCopy();
            $pricingDataDataList = Utils::formatDateTime($pricingDataDataList);
        }

        //set return data
        $dataPricingData = [
            'listPricingData' => $pricingDataDataList,
            'totalPricingData' => $totalPricingData,
        ];
        return $dataPricingData;
    }

    /**
     * Update PricingData
     *
     * @param $pricingData PricingData
     * @param $data
     * @param $user
     * @return PricingData|bool
     * @throws \Exception
     */
    public function updatePricingData($pricingData, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingData->setPricingData(json_encode($data['pricing_data']));
            $pricingData->setStatus($data['status']);
            $pricingData->setUpdatedAt(new \DateTime());
            $pricingData->setUpdatedBy($user->id);
            $this->getReferenced($pricingData, $data, $user);

            $this->entityManager->persist($pricingData);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingData;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove PricingData
     *
     * @param $pricingData PricingData
     * @return PricingData|bool
     * @throws \Exception
     */
    public function deletePricingData($pricingData, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingData->setIsDeleted(1);
            $pricingData->setUpdatedAt(new \DateTime());
            $pricingData->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingData);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingData;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}