<?php
namespace Status\Service;

use Status\Entity\Status;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

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
            //set countRow default
            $countRow = 1;
            
            foreach ($statuss as &$status) {
                //set status
                $status['status'] = Status::getIsActiveList($status['status']);

                //set created_at
                $status['created_at'] =  ($status['created_at']) ? $this->checkDateFormat($status['created_at'],'d/m/Y H:i:s') : '';

                $countRow++;
            }
           
        }

        //set data status
        $dataStatus = [
            'listStatus' => $statuss,
            'totalStatus' => $totalStatus,
        ];
        return $dataStatus;
    }

    /**
     * Check date format
     *
     * @param $dateAction
     * @param $dateFormat
     * @return string
     */
    public function checkDateFormat($dateAction,$dateFormat)
    {
        $dateLast = '';
        $dateCheck = ! empty($dateAction) ? $dateAction->format('Y-m-d H:i:s') : '';
        if ($dateCheck) {
            $datetime = new \DateTime($dateCheck, new \DateTimeZone('UTC'));
            $laTime = new \DateTimeZone('Asia/Ho_Chi_Minh');
            $datetime->setTimezone($laTime);
            $dateLast = $datetime->format($dateFormat);
        }
        return $dateLast;
    }

    /**
     * Get value filters search
     *
     * @param $params
     * @param $fieldsMap
     * @return array
     */
    public function getValueFiltersSearch($params,$fieldsMap)
    {
        $filters = [];

        if (isset($params['query']) && !empty($params['query'])){
          
            foreach ($fieldsMap as $field)
            {
                
                if(isset($params['query'][$field]) && $params['query'][$field] != -1)
                    $filters [$field] = trim($params['query'][$field]);
            }
        }
       
        return $filters;
    }

}

?>