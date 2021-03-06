<?php
namespace Address\Service;

use Address\Entity\Country;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;
use OAuth\Entity\User;
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

           
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $country->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $country->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
  
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
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $country->setUpdatedAt($addTime->format('Y-m-d H:i:s'));           
            $country->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
           
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
        $start,
        $limit,
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $countries     = [];
        $totalCountry = 0;        
        
        //get orm country
        $ormCountry = $this->entityManager->getRepository(Country::class)
            ->getListCountryByCondition($start,$limit,$sortField, $sortDirection, $filters);

        if($ormCountry){
            $ormPaginator = new ORMPaginator($ormCountry, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCountry = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $countries = $ormPaginator->getIterator()->getArrayCopy();
            
            foreach ($countries as &$country) {//loop
                //set created_at
                $country['created_at'] =  ($country['created_at']) ? Utils::checkDateFormat($country['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $country['updated_at'] =  ($country['updated_at']) ? Utils::checkDateFormat($country['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $country['full_name_created'] = trim($country['full_name_created']);
                $country['full_name_updated'] = trim($country['full_name_updated']);
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