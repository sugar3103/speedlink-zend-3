<?php
namespace Address\Service;

use Address\Entity\District;
use Address\Entity\Ward;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;
class WardManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

    private function getReferenced(&$ward,$data) {
        $district = $this->entityManager->getRepository(District::class)->find($data['district_id']);
        if ($district == null)
            throw new \Exception('Not found District by ID');
        $ward->setDistrict($district);
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
            $ward->setNameEn($data['name_en']);
            $ward->setDescription($data['description']);
            $ward->setDescriptionEn($data['description_en']);
            $ward->setStatus($data['status']);
            $ward->setPostalCode($data['postal_code']);
            $ward->setDistrictId($data['district_id']);

            $currentDate = date('Y-m-d H:i:s');
            $ward->setCreatedAt($currentDate);
            $ward->setCreatedBy($user->id);

            $this->getReferenced($ward,$data);
           
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
     * Update Ward
     * 
     * @param $data
     * @return Ward|bool
     * @throws \Exception
     */
    public function updateWard($ward, $data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $ward->setName($data['name']);
            $ward->setNameEn($data['name_en']);
            $ward->setDescription($data['description']);
            $ward->setDescriptionEn($data['description_en']);
            $ward->setStatus($data['status']);
            $ward->setDistrictId($data['district_id']);
            $ward->setPostalCode($data['postal_code']);
            // $ward->setRefAsBy($data['ref_as_by']);

            $currentDate = date('Y-m-d H:i:s');
            $ward->setUpdatedAt($currentDate);
            $ward->setUpdatedBy($user->id);
           
            $this->getReferenced($ward,$data);

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
     * Remove Ward
     *
     * @param $ward
     * @return Ward|bool
     * @throws \Exception
     */
    public function deleteWard($ward) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $this->entityManager->remove($ward);
        
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
     * @param $start
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListWardByCondition(
        $start,
        $limit,
        $sortField = 'w.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $wards     = [];
        $totalWard = 0;                

        //get orm ward
        $ormWard = $this->entityManager->getRepository(Ward::class)
            ->getListWardByCondition($start,$limit,$sortField, $sortDirection, $filters);

        if($ormWard){
            $ormPaginator = new ORMPaginator($ormWard, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalWard = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $wards = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($wards as &$ward) {//loop

                //set created_at
                $ward['created_at'] =  ($ward['created_at']) ? Utils::checkDateFormat($ward['created_at'],'d/m/Y') : '';

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