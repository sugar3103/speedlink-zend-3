<?php
namespace CustomerService\Service;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use CustomerService\Entity\Service;
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

    public function getListServiceByCondition($currentPage, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $services = [];
        $totalService = 0;

        //get orm carrier
        $ormService = $this->entityManager->getRepository(Service::class)->getListServiceByCondition($sortField,$sortDirection,$filters);

        if($ormService){
            $ormPaginator = new ORMPaginator($ormService, true);
            $ormPaginator->setUseOutputWalkers(false);

            $adapter = new DoctrineAdapter($ormPaginator);
            $paginator = new Paginator($adapter);
            //sets the current page number
            $paginator->setCurrentPageNumber($currentPage);
            //Sets the number of items per page
            $paginator->setItemCountPerPage($limit);

            //get carriers list
            $services = $paginator->getIterator()->getArrayCopy();
            //get total carriers list
            $totalService = $paginator->getTotalItemCount();

        }

        //set return data
        $dataService = [
            'listService' => $services,
            'totalService' => $totalService,
        ];
        return $dataService;
    }

    /**
     * Add Service
     *
     * @param $data
     * @param $user
     * @return Service|bool
     * @throws \Exception
     */
    public function addService($data, $user) {

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
            //$service->setCreatedBy($user->id);
            $service->setCreatedBy('1');

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
    public function updateService($service, $data, $user) {

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
            //$service->setUpdatedBy($user->id);
            $service->setUpdatedBy('1');

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
     * @return Service|bool
     * @throws \Exception
     */
    public function deleteService($service) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $service->setIsDeleted('1');
            $service->setUpdatedAt(date('Y-m-d H:i:s'));
            //$service->setUpdatedBy($user->id);
            $service->setUpdatedBy('1');

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