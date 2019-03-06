<?php
namespace Address\Service;

use Address\Entity\City;
use Address\Entity\Country;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;
class CityManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

    private function getReferenced(&$city,$data) {
        $country = $this->entityManager->getRepository(Country::class)->find($data['country_id']);
        if ($country == null)
            throw new \Exception('Not found Country by ID');
        $city->setCountry($country);
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
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $city->setCreatedAt($addTime->format('Y-m-d H:i:s'));

            $city->setCreatedBy($user->id);
            
            $this->getReferenced($city,$data);
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
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $city->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            $city->setUpdatedBy($user->id);

            $this->getReferenced($city,$data);
           
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
        $start,
        $limit,
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $cities     = [];
        $totalCity = 0;        
        
        //get orm city
        $ormCity = $this->entityManager->getRepository(City::class)
            ->getListCityByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormCity){
            $ormPaginator = new ORMPaginator($ormCity, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCity = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $cities = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($cities as &$city) {//loop
                //set created_at
                $city['created_at'] =  ($city['created_at']) ? Utils::checkDateFormat($city['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $city['updated_at'] =  ($city['updated_at']) ? Utils::checkDateFormat($city['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
            }
           
        }

        //set data city
        $dataCity = [
            'listCity' => $cities,
            'totalCity' => $totalCity,
        ];
        return $dataCity;
    }

}