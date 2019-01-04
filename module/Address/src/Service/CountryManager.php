<?php
namespace Address\Service;

use Address\Entity\Country;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

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
            $country->setDescription($data['description']);
            $country->setStatus($data['status']);
            $country->setZipCode($data['zip_code']);
            $country->setCountryId($data['country_id']);

            $currentDate = date('Y-m-d H:i:s');
            $country->setCreatedAt($currentDate);
            $country->setCreatedBy($user->id);

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
        $offset,
        $limit,
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $countries     = [];
        $totalCountry = 0;
        
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
                $country['createdAt'] =  ($country['createdAt']) ? $this->checkDateFormat($country['createdAt'],'d/m/Y') : '';

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
            foreach ($params['query'] as $key => $column) {
                if(isset($fieldsMap[$key]) && !empty($column)) {
                    $filters[$key] = $column;
                }
            }
          }
       
        return $filters;
    }
}