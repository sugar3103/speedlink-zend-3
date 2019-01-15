<?php
namespace CustomerService\Service;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use CustomerService\Entity\ShipmentType;
use Zend\Mail\Message;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Zend\Authentication\Result;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\Service
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

    public function getListShipmentTypeByCondition($currentPage, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $shipmentTypes = [];
        $totalShipmentType = 0;

        //get orm carrier
        $ormShipmentType = $this->entityManager->getRepository(ShipmentType::class)->getListShipmentTypeByCondition($sortField,$sortDirection,$filters);

        if($ormShipmentType){
            $ormPaginator = new ORMPaginator($ormShipmentType, true);
            $ormPaginator->setUseOutputWalkers(false);

            $adapter = new DoctrineAdapter($ormPaginator);
            $paginator = new Paginator($adapter);
            //sets the current page number
            $paginator->setCurrentPageNumber($currentPage);
            //Sets the number of items per page
            $paginator->setItemCountPerPage($limit);

            //get carriers list
            $shipmentTypes = $paginator->getIterator()->getArrayCopy();
            //get total carriers list
            $totalShipmentType = $paginator->getTotalItemCount();

        }

        //set return data
        $dataShipmentType = [
            'listShipmentType' => $shipmentTypes,
            'totalShipmentType' => $totalShipmentType,
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
    public function addShipmentType($data, $user) {

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
            //TODO: check timezone
            $shipmentType->setCreatedAt(date('Y-m-d H:i:s'));
            //$shipmentType->setCreatedBy($user->id);
            $shipmentType->setCreatedBy('1');

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
    public function updateShipmentType($shipmentType, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $shipmentType->setName($data['name']);
            $shipmentType->setNameEn($data['name_en']);
            $shipmentType->setDescription($data['description']);
            $shipmentType->setDescriptionEn($data['description_en']);
            $shipmentType->setStatus($data['status']);
            $shipmentType->setCode($data['code']);
            //TODO: check timezone
            $shipmentType->setUpdatedAt(date('Y-m-d H:i:s'));
            //$shipmentType->setUpdatedBy($user->id);
            $shipmentType->setUpdatedBy('1');

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
     * @return ShipmentType|bool
     * @throws \Exception
     */
    public function deleteShipmentType($shipmentType) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $shipmentType->setIsDeleted('1');
            $shipmentType->setUpdatedAt(date('Y-m-d H:i:s'));
            //$shipmentType->setUpdatedBy($user->id);
            $shipmentType->setUpdatedBy('1');

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