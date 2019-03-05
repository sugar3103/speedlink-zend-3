<?php
namespace ServiceShipment\Service;

use Core\Utils\Utils;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use OAuth\Entity\User;
use ServiceShipment\Entity\Service;
use Zend\Mail\Message;
use Zend\Mail\Transport\SmtpOptions;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\Service
 */
class ServiceManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * ServiceManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    private function getReferenced(&$service, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $service->setJoinCreated($user_data);
        }
        $service->setJoinUpdated($user_data);

    }

    public function getListServiceByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $services = [];
        $totalService = 0;

        //get orm carrier
        $ormService = $this->entityManager->getRepository(Service::class)->getListServiceByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormService){
            $ormPaginator = new ORMPaginator($ormService, true);
            $ormPaginator->setUseOutputWalkers(false);

            //get total carriers list
            $totalService = $ormPaginator->count();
            $services = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($services as $key => $service) {
                $date_format = 'd/m/Y H:i:s';
                $services[$key]['created_at'] = Utils::checkDateFormat($service['created_at'], $date_format);
                $services[$key]['updated_at'] = Utils::checkDateFormat($service['updated_at'], $date_format);
            }
        }

        //set return data
        $dataService = [
            'listService' => $services,
            'totalService' => $totalService,
        ];
        return $dataService;
    }

    public function getListServiceCodeByCondition()
    {
        $services = [];
        $ormService = $this->entityManager->getRepository(Service::class)->getListServiceCodeByCondition();
        if($ormService){
            $ormPaginator = new ORMPaginator($ormService, true);
            $ormPaginator->setUseOutputWalkers(false);
            $services = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $services;
    }

    /**
     * Add Service
     *
     * @param $data
     * @param $user
     * @return Service|bool
     * @throws \Exception
     */
    public function addService($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $service = new Service();
            $service->setName($data['name']);
            $service->setNameEn($data['name_en']);
            $service->setDescription($data['description']);
            $service->setDescriptionEn($data['description_en']);
            $service->setStatus($data['status']);
            $service->setCode($data['code']);
            //TODO: check timezone
            $service->setCreatedAt(date('Y-m-d H:i:s'));
            $service->setCreatedBy($user->id);
            $service->setUpdatedAt(date('Y-m-d H:i:s'));
            $service->setUpdatedBy($user->id);
            $this->getReferenced($service, $data, $user, 'add');

            $this->entityManager->persist($service);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $service;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Service
     *
     * @param $service
     * @param $data
     * @param $user
     * @return Service|bool
     * @throws \Exception
     */
    public function updateService($service, $data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $service->setName($data['name']);
            $service->setNameEn($data['name_en']);
            $service->setDescription($data['description']);
            $service->setDescriptionEn($data['description_en']);
            $service->setStatus($data['status']);
            $service->setCode($data['code']);
            //TODO: check timezone
            $service->setUpdatedAt(date('Y-m-d H:i:s'));
            $service->setUpdatedBy($user->id);
            $this->getReferenced($service, $data, $user);

            $this->entityManager->persist($service);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $service;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove Service
     *
     * @param $service
     * @param $user
     * @return Service|bool
     * @throws \Exception
     */
    public function deleteService($service, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $service->setIsDeleted('1');
            $service->setUpdatedAt(date('Y-m-d H:i:s'));
            $service->setUpdatedBy($user->id);

            $this->entityManager->persist($service);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $service;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}