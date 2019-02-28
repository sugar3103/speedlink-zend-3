<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\Pricing;
use Management\Entity\PricingData;
use Doctrine\ORM\EntityManager;
use OAuth\Entity\User;
use RangeWeight\Entity\RangeWeight;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use ZoneCode\Entity\ZoneCode;

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

        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found Service Code');
        }
        $pricingData->setJoinService($service);

        $shipment_type = $this->entityManager->getRepository(ShipmentType::class)->find($data['shipment_type_id']);
        if ($shipment_type == null) {
            throw new \Exception('Not found Shipment Type');
        }
        $pricingData->setJoinShipmentType($shipment_type);
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
     * Add PricingData
     *
     * @param Pricing $data
     * @param $user
     * @return PricingData|bool
     * @throws \Exception
     */
    public function addPricingData($data, $user)
    {
        try {
            // begin transaction
            $this->entityManager->beginTransaction();
            $date = new \DateTime();
            $where = [
                'category_code' => $data->getCategoryCode(),
                'carrier_id' => $data->getCarrierId(),
            ];
            $shipment_type = $this->entityManager->getRepository(ShipmentType::class)->findBy($where, ['service_id'=>'ASC','id'=>'ASC']);
            $where = [
                'category' => $data->getCategoryCode(),
                'carrier_id' => $data->getCarrierId(),
            ];
            foreach ($shipment_type as $shipment) {
                $where['service_id'] = $shipment->getServiceId();
                $where['shipment_type_id'] = $shipment->getId();
                $pricingTable = $this->generatePricingDataTable($where);

                $pricingData = new PricingData();
                $pricingData->setServiceId($shipment->getServiceId());
                $pricingData->setPricingId($data->getId());
                $pricingData->setShipmentTypeId($shipment->getId());
                $pricingData->setPricingData($pricingTable);
                $pricingData->setStatus(1);
                $pricingData->setCreatedAt($date);
                $pricingData->setCreatedBy($user->id);
                $pricingData->setUpdatedAt($date);
                $pricingData->setUpdatedBy($user->id);
                $this->getReferenced($pricingData, $where, $user, 'add');
                $this->entityManager->persist($pricingData);
                $this->entityManager->flush();
            }

            $this->entityManager->commit();
            return true;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
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
            $pricingData->setServiceId($data['service_id']);
            $pricingData->setPricingId($data['pricing_id']);
            $pricingData->setShipmentTypeId($data['shipment_type_id']);
            $pricingData->setPricingData($data['pricing_data']);
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

    public function generatePricingDataTable($where, $mode = 'new')
    {
        $rangeWeight = $this->entityManager->getRepository(RangeWeight::class)->findBy($where, ['from'=> 'ASC','to'=>'ASC']);
        $zoneCode = $this->entityManager->getRepository(ZoneCode::class)->findBy($where, ['code' => 'ASC']);
        $result = ['title' => [], 'data' => []];
        if (count($rangeWeight) <= 0) {
            return json_encode($result, false);
        }

        $title['weight'] = 'Weight';
        foreach ($zoneCode as $zone) {
            $temp = array();
            if (in_array($zone->getCode(),$temp)) {
                continue;
            }
            $title[$zone->getCode()] = $zone->getCode();
        }
        $data = array();
        foreach ($rangeWeight as $range) {
            $data[$range->getId()]['weight'] = $range->getFrom() . ' - ' . $range->getTo();
            $temp = array();
            foreach ($zoneCode as $zone) {
                if (in_array($zone->getCode(),$temp) ) {
                    continue;
                }
                $data[$range->getId()][$zone->getCode()] = 0;
                $temp[] = $zone->getCode();
            }
        }

        $result = ['title' => $title, 'data' => $data];
        return json_encode($result, false);
    }

}