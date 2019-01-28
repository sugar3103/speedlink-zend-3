<?php
namespace ServiceShipment\Service;

use ServiceShipment\Entity\Carrier;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Zend\Mail\Message;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Zend\Authentication\Result;
/**
 * This service is responsible for adding/editing users
 * and changing user password.s
 */
class CarrierManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * CarrierManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getListCarrierByCondition($currentPage, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $carriers = [];
        $totalCarrier = 0;

        //get orm carrier
        $ormCarrier = $this->entityManager->getRepository(Carrier::class)->getListCarrierByCondition($sortField,$sortDirection,$filters);

        if($ormCarrier){
            $ormPaginator = new ORMPaginator($ormCarrier, true);
            $ormPaginator->setUseOutputWalkers(false);

            $adapter = new DoctrineAdapter($ormPaginator);
            $paginator = new Paginator($adapter);
            //sets the current page number
            $paginator->setCurrentPageNumber($currentPage);
            //Sets the number of items per page
            $paginator->setItemCountPerPage($limit);

            //get carriers list
            $carriers = $paginator->getIterator()->getArrayCopy();
            //get total carriers list
            $totalCarrier = $paginator->getTotalItemCount();

        }

        //set return data
        $dataCarrier = [
            'listCarrier' => $carriers,
            'totalCarrier' => $totalCarrier,
        ];
        return $dataCarrier;
    }

    /**
     * Add Carrier
     *
     * @param $data
     * @param $user
     * @return Carrier|bool
     * @throws \Exception
     */
    public function addCarrier($data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $carrier = new Carrier();
            $carrier->setName($data['name']);
            $carrier->setNameEn($data['name_en']);
            $carrier->setDescription($data['description']);
            $carrier->setDescriptionEn($data['description_en']);
            $carrier->setStatus($data['status']);
            $carrier->setCode($data['code']);
            //TODO: check timezone
            $carrier->setCreatedAt(date('Y-m-d H:i:s'));
            //$carrier->setCreatedBy($user->id);
            $carrier->setCreatedBy('1');

            $this->entityManager->persist($carrier);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $carrier;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Carrier
     *
     * @param $carrier
     * @param $data
     * @param $user
     * @return Carrier|bool
     * @throws \Exception
     */
    public function updateCarrier($carrier, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $carrier->setName($data['name']);
            $carrier->setNameEn($data['name_en']);
            $carrier->setDescription($data['description']);
            $carrier->setDescriptionEn($data['description_en']);
            $carrier->setStatus($data['status']);
            $carrier->setCode($data['code']);
            //TODO: check timezone
            $carrier->setUpdatedAt(date('Y-m-d H:i:s'));
            //$carrier->setUpdatedBy($user->id);
            $carrier->setUpdatedBy('1');

            $this->entityManager->persist($carrier);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $carrier;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove Carrier
     *
     * @param $carrier
     * @return Carrier|bool
     * @throws \Exception
     */
    public function deleteCarrier($carrier) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $carrier->setIsDeleted('1');
            $carrier->setUpdatedAt(date('Y-m-d H:i:s'));
            //$carrier->setUpdatedBy($user->id);
            $carrier->setUpdatedBy('1');

            $this->entityManager->persist($carrier);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $carrier;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}