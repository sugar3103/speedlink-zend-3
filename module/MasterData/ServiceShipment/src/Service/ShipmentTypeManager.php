<?php
namespace ServiceShipment\Service;

use Core\Utils\Utils;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use OAuth\Entity\User;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;
use ServiceShipment\Entity\ShipmentType;
use ServiceShipment\Entity\Category;
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
            throw new \Exception('Not found Carrier Id');
        }
        $shipment_type->setCarrier($carrier_data);

        $service_data = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service_data == null) {
            throw new \Exception('Not found Service Id');
        }
        $shipment_type->setService($service_data);

        $category_data = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
        if ($category_data == null) {
            throw new \Exception('Not found Category Id');
        }
        $shipment_type->setCategory($category_data);

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

            foreach ($shipmentTypes as &$shipmentType) {
                //set created_at
                $shipmentType['created_at'] =  ($shipmentType['created_at']) ? Utils::checkDateFormat($shipmentType['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $shipmentType['updated_at'] =  ($shipmentType['updated_at']) ? Utils::checkDateFormat($shipmentType['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $shipmentType['full_name_created'] = trim($shipmentType['full_name_created']);
                $shipmentType['full_name_updated'] = trim($shipmentType['full_name_updated']);
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
        $ormShipmentType = $this->entityManager->getRepository(ShipmentType::class)->getListShipmentTypeCodeByCondition();
        if($ormShipmentType){
            $ormPaginator = new ORMPaginator($ormShipmentType, true);
            $ormPaginator->setUseOutputWalkers(false);
            $shipmentType = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $shipmentType;
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
            $shipmentType->setProductTypeCode($data['product_type_code']);
            $shipmentType->setVolumetricNumber($data['volumetric_number']);
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $shipmentType->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $shipmentType->setCreatedBy($user->id);
            $this->getReferenced($shipmentType, $data, $user, 'add');

            $shipmentType->setIsDeleted(0);

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
            $shipmentType->setProductTypeCode($data['product_type_code']);
            $shipmentType->setVolumetricNumber($data['volumetric_number']);
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $shipmentType->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $shipmentType->setUpdatedBy($user->id);
            $this->getReferenced($shipmentType, $data, $user);
            $shipmentType->setIsDeleted(0);

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
            $shipmentType->setIsDeleted(1);
            $shipmentType->setStatus(-1);
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $shipmentType->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
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

    public function getListCodeByCondition($field, $params)
    {
        $shipmentType = [];
        $ormShipmentType = $this->entityManager->getRepository(ShipmentType::class)->getListCodeByCondition($field, $params);
        if($ormShipmentType){
            $ormPaginator = new ORMPaginator($ormShipmentType, true);
            $ormPaginator->setUseOutputWalkers(false);
            $shipmentType = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $shipmentType;
    }
}