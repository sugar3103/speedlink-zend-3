<?php
namespace Address\Service;

use Address\Entity\District;
use Address\Entity\Ward;
use Address\Entity\City;
use Address\Entity\Country;
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
           
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $ward->setCreatedAt($addTime->format('Y-m-d H:i:s'));
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

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $ward->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
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
            
            foreach ($wards as &$ward) {//loop
                $district = $this->entityManager->getRepository(District::class)->findOneById($ward['district_id']);
                $city = $this->entityManager->getRepository(City::class)->findOneById($district->getCityId());
                $country = $this->entityManager->getRepository(Country::class)->findOneById($city->getCountryId());

                $ward['country_id'] = $country->getId();
                $ward['city_id'] = $city->getId();                
                $ward['created_at'] =  ($ward['created_at']) ? Utils::checkDateFormat($ward['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $ward['updated_at'] =  ($ward['updated_at']) ? Utils::checkDateFormat($ward['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $ward['full_name_created'] = trim($ward['full_name_created']);
                $ward['full_name_updated'] = trim($ward['full_name_updated']);
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