<?php
namespace Address\Service;

use Address\Entity\Ward;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
class WardManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

     /**
     * Add Ward
     *
     * @param $data
     * @return Ward|bool
     * @throws \Exception
     */
    public function addWard($data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $ward = new Ward();
            $ward->setName($data['name']);
            $ward->setDescription($data['description']);
            $ward->setStatus($data['status']);
            $ward->setZipCode($data['zip_code']);
            $ward->setCountryId($data['country_id']);

            $currentDate = date('Y-m-d H:i:s');
            $ward->setCreatedAt($currentDate);
            $ward->setCreatedBy($user->id);

            $ward->setCreatedAt($currentDate);
            $ward->setCreatedBy($user->id);
           
            // add the entity to the entity manager.
            $this->entityManager->persist($ward);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $ward;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Get list ward by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListWardByCondition(
        $offset,
        $limit,
        $sortField = 'w.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $cities     = [];
        $totalWard = 0;
        
        //get orm ward
        $ormWard = $this->entityManager->getRepository(Ward::class)
            ->getListWardByCondition($sortField, $sortDirection, $filters,$offset,$limit);

        if($ormWard){
            $ormPaginator = new ORMPaginator($ormWard, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalWard = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $cities = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($cities as &$ward) {//loop
                //set status
                $ward['status'] = Ward::getIsActiveList($ward['status']);

                //set created_at
                $ward['createdAt'] =  ($ward['createdAt']) ? $this->checkDateFormat($ward['createdAt'],'d/m/Y') : '';

                $countRow++;
            }
           
        }

        //set data ward
        $dataWard = [
            'listWard' => $cities,
            'totalWard' => $totalWard,
        ];
        return $dataWard;
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
          
            if (isset($params['query']) && !empty($params['query'])){
                foreach ($params['query'] as $key => $column) {
                    if(isset($fieldsMap[$key]) && !empty($column)) {
                        $filters[$key] = $column;
                    }
                }
                 
              }
        }
       
        return $filters;
    }

    public function getListWardSelect(
        $sortField = 'w.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $wards     = [];
        $totalWard = 0;
        
        //get orm Hub
        $ormHub = $this->entityManager->getRepository(Ward::class)
            ->getListWardSelect($sortField, $sortDirection, $filters);

        if($ormHub){
            $ormPaginator = new ORMPaginator($ormHub, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalWard = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $wards = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($wards as &$ward) {//loop
                //set status
                $ward['status'] = Ward::getIsActiveList($ward['status']);
                $countRow++;
            }  
        }
        //set data ward
        $dataWard = [
            'listWard' => $wards,
            'totalWard' => $totalWard,
        ];
        return $dataWard;
    }

}