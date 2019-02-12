<?php
namespace ServiceShipment\Service;

use Core\Utils\Utils;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use OAuth\Entity\User;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use Zend\Mail\Message;
use Zend\Mail\Transport\SmtpOptions;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\ShipmentType
 */
class ShipmentTypeManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * ShipmentTypeManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    private function getReferenced(&$shipment_type, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $shipment_type->setJoinCreated($user_data);
        }
        $shipment_type->setJoinUpdated($user_data);

        $carrier_data = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier_data == null) {
            throw new \Exception('Not found Carrier Code');
        }
        $shipment_type->setJoinCarrier($carrier_data);

        $service_data = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service_data == null) {
            throw new \Exception('Not found Service Code');
        }
        $shipment_type->setJoinService($service_data);

    }

    public function getListShipmentTypeByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $shipmentTypes = [];
        $totalShipmentType = 0;

        //get orm carrier
        $ormShipmentType = $this->entityManager->getRepository(ShipmentType::class)->getListShipmentTypeByCondition($start, $limit, $sortField, $sortDirection, $filters);

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

    public function getListShipmentTypeCodeByCondition()
    {
        $shipmentType = [];

        //get orm carrier
        $ormShipmentType = $this->entityManager->getRepository(ShipmentType::class)->getListShipmentTypeCodeByCondition();

        if($ormShipmentType){
            $ormPaginator = new ORMPaginator($ormShipmentType, true);
            $ormPaginator->setUseOutputWalkers(false);
            $shipmentType = $ormPaginator->getIterator()->getArrayCopy();
        }

        //set return data
        $dataShipmentType = [
            'listShipmentType' => $shipmentType,
        ];
        return $dataShipmentType;
    }

    /**
     * Add ShipmentType
     *
     * @param $data
     * @param $user
     * @return ShipmentType|bool
     * @throws \Exception
     */
    public function addShipmentType($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $shipmentType = new ShipmentType();
            $shipmentType->setName($data['name']);
            $shipmentType->setNameEn($data['name_en']);
            $shipmentType->setDescription($data['description']);
            $shipmentType->setDescriptionEn($data['description_en']);
            $shipmentType->setStatus($data['status']);
            $shipmentType->setCode($data['code']);
            $shipmentType->setCategoryCode($data['category_code']);
            $shipmentType->setProductTypeCode($data['product_type_code']);
            $shipmentType->setCarrierId($data['carrier_id']);
            $shipmentType->setServiceId($data['service_id']);
            $shipmentType->setVolumetricNumber($data['volumetric_number']);
            //TODO: check timezone
            $shipmentType->setCreatedAt(date('Y-m-d H:i:s'));
            $shipmentType->setCreatedBy($user->id);
            $shipmentType->setUpdatedAt(date('Y-m-d H:i:s'));
            $shipmentType->setUpdatedBy($user->id);
            $this->getReferenced($shipmentType, $data, $user, 'add');

            $this->entityManager->persist($shipmentType);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $shipmentType;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update ShipmentType
     *
     * @param $shipmentType
     * @param $data
     * @param $user
     * @return ShipmentType|bool
     * @throws \Exception
     */
    public function updateShipmentType($shipmentType, $data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $shipmentType->setName($data['name']);
            $shipmentType->setNameEn($data['name_en']);
            $shipmentType->setDescription($data['description']);
            $shipmentType->setDescriptionEn($data['description_en']);
            $shipmentType->setStatus($data['status']);
            $shipmentType->setCode($data['code']);
            $shipmentType->setCategoryCode($data['category_code']);
            $shipmentType->setProductTypeCode($data['product_type_code']);
            $shipmentType->setCarrierId($data['carrier_id']);
            $shipmentType->setServiceId($data['service_id']);
            $shipmentType->setVolumetricNumber($data['volumetric_number']);
            //TODO: check timezone
            $shipmentType->setUpdatedAt(date('Y-m-d H:i:s'));
            $shipmentType->setUpdatedBy($user->id);
            $this->getReferenced($shipmentType, $data, $user);

            $this->entityManager->persist($shipmentType);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $shipmentType;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove ShipmentType
     *
     * @param $shipmentType
     * @param $user
     * @return ShipmentType|bool
     * @throws \Exception
     */
    public function deleteShipmentType($shipmentType, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $shipmentType->setIsDeleted('1');
            $shipmentType->setUpdatedAt(date('Y-m-d H:i:s'));
            $shipmentType->setUpdatedBy($user->id);

            $this->entityManager->persist($shipmentType);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $shipmentType;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}