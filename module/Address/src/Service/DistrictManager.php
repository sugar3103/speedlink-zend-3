<?php
namespace Address\Service;

use Address\Entity\District;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
class DistrictManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

     /**
     * Add District
     *
     * @param $data
     * @return District|bool
     * @throws \Exception
     */
    public function addDistrict($data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $district = new District();
            $district->setName($data['name']);
            $district->setNameEn($data['name_en']);
            $district->setDescription($data['description']);
            $district->setDescriptionEn($data['description_en']);
            $district->setStatus($data['status']);            
            $district->setCountryId($data['district_id']);

            $currentDate = date('Y-m-d H:i:s');
            $district->setCreatedAt($currentDate);
            $district->setCreatedBy($user->id);
           
            // add the entity to the entity manager.
            $this->entityManager->persist($district);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $district;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Update District
     * 
     * @param $data
     * @return District|bool
     * @throws \Exception
     */
    public function updateDistrict($district, $data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $district->setName($data['name']);
            $district->setNameEn($data['name_en']);
            $district->setDescription($data['description']);
            $district->setDescriptionEn($data['description_en']);
            $district->setStatus($data['status']);
            $district->setCityId($data['city_id']);
            $district->setRefAsBy($data['ref_as_by']);

            $currentDate = date('Y-m-d H:i:s');
            $district->setUpdatedAt($currentDate);
            $district->setUpdatedBy($user->id);
           
            // add the entity to the entity manager.
            $this->entityManager->persist($district);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $district;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove District
     *
     * @param $district
     * @return District|bool
     * @throws \Exception
     */
    public function deleteDistrict($district) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $this->entityManager->remove($district);
        
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $district;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Get list district by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListDistrictByCondition(
        $offset,
        $limit,
        $sortField = 'd.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $cities     = [];
        $totalDistrict = 0;        
        //get orm district
        $ormDistrict = $this->entityManager->getRepository(District::class)
            ->getListDistrictByCondition($sortField, $sortDirection, $filters,$offset,$limit);

        if($ormDistrict){
            $ormPaginator = new ORMPaginator($ormDistrict, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalDistrict = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $cities = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($cities as &$district) {//loop
                //set status
                $district['status'] = District::getIsActiveList($district['status']);

                //set created_at
                $district['createdAt'] =  ($district['createdAt']) ? $this->checkDateFormat($district['createdAt'],'d/m/Y') : '';

                $countRow++;
            }
           
        }

        //set data district
        $dataDistrict = [
            'listDistrict' => $cities,
            'totalDistrict' => $totalDistrict,
        ];
        return $dataDistrict;
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
}