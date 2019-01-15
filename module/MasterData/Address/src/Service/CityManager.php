<?php
namespace Address\Service;

use Address\Entity\City;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
class CityManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

     /**
     * Add City
     *
     * @param $data
     * @return City|bool
     * @throws \Exception
     */
    public function addCity($data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $city = new City();
            $city->setName($data['name']);
            $city->setNameEn($data['name_en']);
            $city->setDescription($data['description']);
            $city->setDescriptionEn($data['description_en']);
            $city->setStatus($data['status']);
            $city->setZipCode($data['zip_code']);
            $city->setCountryId($data['country_id']);
            $city->setRefAsBy($data['ref_as_by']);

            $currentDate = date('Y-m-d H:i:s');
            $city->setCreatedAt($currentDate);
            $city->setCreatedBy($user->id);

            // add the entity to the entity manager.
            $this->entityManager->persist($city);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $city;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

     /**
     * Update City
     * 
     * @param $data
     * @return City|bool
     * @throws \Exception
     */
    public function updateCity($city, $data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $city->setName($data['name']);
            $city->setNameEn($data['name_en']);
            $city->setDescription($data['description']);
            $city->setDescriptionEn($data['description_en']);
            $city->setStatus($data['status']);
            $city->setZipCode($data['zip_code']);
            $city->setCountryId($data['country_id']);
            $city->setRefAsBy($data['ref_as_by']);

            $currentDate = date('Y-m-d H:i:s');
            $city->setUpdatedAt($currentDate);
            $city->setUpdatedBy($user->id);
           
            // add the entity to the entity manager.
            $this->entityManager->persist($city);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $city;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove City
     *
     * @param $city
     * @return City|bool
     * @throws \Exception
     */
    public function deleteCity($city) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $this->entityManager->remove($city);
        
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $city;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }


    /**
     * Get list city by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListCityByCondition(
        $currentPage,
        $limit,
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $cities     = [];
        $totalCity = 0;
        $offset = ($currentPage * $limit) - $limit;     
        
        //get orm city
        $ormCity = $this->entityManager->getRepository(City::class)
            ->getListCityByCondition($sortField, $sortDirection, $filters,$offset,$limit);

        if($ormCity){
            $ormPaginator = new ORMPaginator($ormCity, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCity = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $cities = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($cities as &$city) {//loop
                //set status
                $city['status'] = City::getIsActiveList($city['status']);

                //set created_at
                $city['createdAt'] =  ($city['createdAt']) ? $this->checkDateFormat($city['createdAt'],'d/m/Y') : '';

                $countRow++;
            }
           
        }

        //set data city
        $dataCity = [
            'listCity' => $cities,
            'totalCity' => $totalCity,
        ];
        return $dataCity;
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