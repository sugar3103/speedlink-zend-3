<?php
namespace Address\Service;

use Address\Entity\City;
use Address\Entity\District;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;

class DistrictManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

    private function getReferenced(&$district,$data) {
        $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
        if ($city == null)
            throw new \Exception('Not found City by ID');
        $district->setCity($city);
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
            $district->setCityId($data['city_id']);
    
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $district->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $district->setCreatedBy($user->id);

            $this->getReferenced($district,$data);
           
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
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $district->setUpdatedAt($addTime->format('Y-m-d H:i:s'));       
            $district->setUpdatedBy($user->id);
           
            $this->getReferenced($district,$data);

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
        $start,
        $limit,
        $sortField = 'd.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $districts     = [];
        $totalDistrict = 0;                

        //get orm district
        $ormDistrict = $this->entityManager->getRepository(District::class)
            ->getListDistrictByCondition($start,$limit,$sortField, $sortDirection, $filters);

        if($ormDistrict){
            $ormPaginator = new ORMPaginator($ormDistrict, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalDistrict = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $districts = $ormPaginator->getIterator()->getArrayCopy();
            
            foreach ($districts as &$district) {//loop
                $city = $this->entityManager->getRepository(City::class)->findOneById($district['city_id']);
                $district['country_id'] = $city->getCountryId();
                $district['created_at'] =  ($district['created_at']) ? Utils::checkDateFormat($district['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $district['updated_at'] =  ($district['updated_at']) ? Utils::checkDateFormat($district['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $district['full_name_created'] = trim($district['full_name_created']);
                $district['full_name_updated'] = trim($district['full_name_updated']);
            }
           
        }

        //set data district
        $dataDistrict = [
            'listDistrict' => $districts,
            'totalDistrict' => $totalDistrict,
        ];
        return $dataDistrict;
    }

}