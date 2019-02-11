<?php
namespace ServiceShipment\Service;

use Core\Utils\Utils;
use OAuth\Entity\User;
use ServiceShipment\Entity\Carrier;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Zend\Mail\Message;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
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

    private function getReferenced(&$carrier, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $carrier->setJoinCreated($user_data);
        }
        $carrier->setJoinUpdated($user_data);

    }

    public function getListCarrierByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $carriers = [];
        $totalCarrier = 0;

        //get orm carrier
        $ormCarrier = $this->entityManager->getRepository(Carrier::class)
            ->getListCarrierByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormCarrier){
            $ormPaginator = new ORMPaginator($ormCarrier, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalCarrier = $ormPaginator->count();
            $carriers = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($carriers as $key => $carrier) {
                $date_format = 'd/m/Y H:i:s';
                $carriers[$key]['created_at'] = Utils::checkDateFormat($carrier['created_at'], $date_format);
                $carriers[$key]['updated_at'] = Utils::checkDateFormat($carrier['updated_at'], $date_format);
            }
        }

        //set return data
        $dataCarrier = [
            'listCarrier' => $carriers,
            'totalCarrier' => $totalCarrier,
        ];
        return $dataCarrier;
    }

    public function getListCarrierCodeByCondition()
    {
        $carriers = [];

        //get orm carrier
        $ormCarrier = $this->entityManager->getRepository(Carrier::class)->getListCarrierCodeByCondition();

        if($ormCarrier){
            $ormPaginator = new ORMPaginator($ormCarrier, true);
            $ormPaginator->setUseOutputWalkers(false);
            $carriers = $ormPaginator->getIterator()->getArrayCopy();
        }

        //set return data
        $dataCarrier = [
            'listCarrier' => $carriers,
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
    public function addCarrier($data, $user)
    {
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
            $carrier->setCreatedBy($user->id);
            $carrier->setUpdatedAt(date('Y-m-d H:i:s'));
            $carrier->setUpdatedBy($user->id);
            $this->getReferenced($carrier, $data, $user, 'add');

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
            $carrier->setUpdatedAt(date('Y-m-d H:i:s'));
            $carrier->setUpdatedBy($user->id);
            $this->getReferenced($carrier, $data, $user);

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
    public function deleteCarrier($carrier, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $carrier->setIsDeleted(1);
            $carrier->setUpdatedAt(date('Y-m-d H:i:s'));
            $carrier->setUpdatedBy($user->id);

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