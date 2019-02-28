<?php
namespace Status\Service;

use Status\Entity\Status;
use OAuth\Entity\User;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;
/**
 * @package Status\Service
 */
class StatusManager {

     /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * StatusManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager) {
        $this->entityManager = $entityManager;
    }

    private function getReferenced(&$status, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $status->setJoinCreated($user_data);
        }
        $status->setJoinUpdated($user_data);

    }

    /**
     * Add Status
     *
     * @param $data
     * @param $user
     * @return Status|bool
     * @throws \Exception
     */
    public function addStatus($data,$user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $status = new Status();
            $status->setName($data['name']);
            $status->setNameEn($data['name_en']);
            $status->setDescription($data['description']);
            $status->setDescriptionEn($data['description_en']);
            $status->setStatus($data['status']);

            $currentDate = date('Y-m-d H:i:s');
            $status->setCreatedAt($currentDate);

            $status->setCreatedBy($user->id);
            $this->getReferenced($status, $data, $user, 'add');
           
            // add the entity to the entity manager.
            $this->entityManager->persist($status);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $status;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Update Status
     *
     * @param $status
     * @param $data
     * @param $user
     * @return Status|bool
     * @throws \Exception
     */
    public function updateStatus($status, $data,$user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $status->setName($data['name']);
            $status->setNameEn($data['name_en']);
            $status->setDescription($data['description']);
            $status->setDescriptionEn($data['description_en']);
            $status->setStatus($data['status']);
            
            $currentDate = date('Y-m-d H:i:s');
            $status->setUpdatedAt($currentDate);
            $status->setUpdatedBy($user->id);
            $this->getReferenced($status, $data, $user);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $status;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Remove Status
     *
     * @param $status
     * @return Status|bool
     * @throws \Exception
     */
    public function removeStatus($status) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $this->entityManager->remove($status);
        
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $status;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Get list status by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sort
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListStatusByCondition($start,$limit,$sortField = '',$sortDirection = 'asc',$filters = []){
        $statuss     = [];
        $totalStatus = 0;        
        //get orm status
        $ormStatus = $this->entityManager->getRepository(Status::class)
            ->getListStatusByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormStatus){
            $ormPaginator = new ORMPaginator($ormStatus, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalStatus = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $statuss = $ormPaginator->getIterator()->getArrayCopy();
            
            foreach ($statuss as &$status) {
                //set created_at
                $status['created_at'] =  ($status['created_at']) ? Utils::checkDateFormat($status['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $status['updated_at'] =  ($status['updated_at']) ? Utils::checkDateFormat($status['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
            }           
        }

        //set data status
        $dataStatus = [
            'listStatus' => $statuss,
            'totalStatus' => $totalStatus,
        ];
        return $dataStatus;
    }
}
