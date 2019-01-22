<?php
namespace Address\Service;

use Address\Entity\Country;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;
class CountryManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

     /**
     * Add Country
     *
     * @param $data
     * @return Country|bool
     * @throws \Exception
     */
    public function addCountry($data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $country = new Country();
            $country->setName($data['name']);
            $country->setNameEn($data['name_en']);
            $country->setDescription($data['description']);
            $country->setDescriptionEn($data['description_en']);
            $country->setStatus($data['status']);
            $country->setIsoCode($data['iso_code']);
            // $country->setRefAsBy($data['ref_as_by']);

            $currentDate = date('Y-m-d H:i:s');
            $country->setCreatedAt($currentDate);
            $country->setCreatedBy($user->id);
  
            // add the entity to the entity manager.
            $this->entityManager->persist($country);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $country;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Update Country
     * 
     * @param $data
     * @return Country|bool
     * @throws \Exception
     */
    public function updateCountry($country, $data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $country->setName($data['name']);
            $country->setNameEn($data['name_en']);
            $country->setDescription($data['description']);
            $country->setDescriptionEn($data['description_en']);
            $country->setStatus($data['status']);
            $country->setIsoCode($data['iso_code']);
            // $country->setRefAsBy($data['ref_as_by']);

            $currentDate = date('Y-m-d H:i:s');
            $country->setUpdatedAt($currentDate);
            $country->setUpdatedBy($user->id);
           
            // add the entity to the entity manager.
            $this->entityManager->persist($country);

            // apply changes to database.
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $country;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove Country
     *
     * @param $country
     * @return Country|bool
     * @throws \Exception
     */
    public function deleteCountry($country) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $this->entityManager->remove($country);
        
            $this->entityManager->flush();

            $this->entityManager->commit();

            return $country;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }
    /**
     * Get list country by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListCountryByCondition(
        $currentPage,
        $limit,
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $countries     = [];
        $totalCountry = 0;
        $offset = ($currentPage * $limit) - $limit;      
        
        //get orm country
        $ormCountry = $this->entityManager->getRepository(Country::class)
            ->getListCountryByCondition($sortField, $sortDirection, $filters,$offset,$limit);

        if($ormCountry){
            $ormPaginator = new ORMPaginator($ormCountry, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCountry = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $countries = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($countries as &$country) {//loop
                //set status
                $country['status'] = Country::getIsActiveList($country['status']);

                //set created_at
                $country['createdAt'] =  ($country['createdAt']) ? Utils::checkDateFormat($country['createdAt'],'d/m/Y') : '';

                $countRow++;
            }
           
        }

        //set data country 
        $dataCountry = [
            'listCountry' => $countries,
            'totalCountry' => $totalCountry,
        ];

        return $dataCountry;
    }

    public function getListCountrySelect(
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $countries     = [];
        $totalCountry = 0;
        
        //get orm Hub
        $ormCountry = $this->entityManager->getRepository(Country::class)
            ->getListCountrySelect($sortField, $sortDirection, $filters);

        if($ormCountry){
            $ormPaginator = new ORMPaginator($ormCountry, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCountry = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $countries = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($countries as &$country) {//loop
                //set status
                $country['status'] = Country::getIsActiveList($country['status']);
                $countRow++;
            }  
        }
        //set data country
        $dataCountry = [
            'listCountry' => $countries,
            'totalCountry' => $totalCountry,
        ];
        return $dataCountry;
    }

}