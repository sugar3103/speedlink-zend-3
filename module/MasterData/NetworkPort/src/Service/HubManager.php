<?php
namespace NetworkPort\Service;

use NetworkPort\Entity\Hub;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Authentication\Result;
use Core\Utils\Utils;
use Address\Entity\Country;
use Address\Entity\City;
use OAuth\Entity\User;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\Service
 */
class HubManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $branchManager
   
     */
    public function __construct(
        $entityManager
    )
    {
        $this->entityManager = $entityManager;
    }   

     /**
     * Performs a login attempt. If $rememberMe argument is true, it forces the session
     * to last for one month (otherwise the session expires on one hour).
     * @param $code
     * @param $name
     * @param $hubId
     * @param $status
     * @param $createdBy
     * @param $createdAt
     * @param $countryId
     * @param $cityId
     * @param $districtId
     * @param $wardId
     * @param $includingWardIds
     * @param $description
     * @return Result
     * @throws \Exception
     */
    // public function add($code, $name, $hubId, $status, $createdBy, $createdAt, $countryId, $cityId, $districtId, $wardId, $includingWardIds, $description )
    public function addHub($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
        $hub = new Hub;
        $hub->setCountryId($data['country_id']);
        $hub->setCityId($data['city_id']);
        $hub->setCode($data['code']);
        $hub->setName($data['name']);
        $hub->setNameEn($data['name_en']);
        $hub->setStatus($data['status']);
        $hub->setCreatedBy($user->id);
        $currentDate = date('Y-m-d H:i:s');
        $hub->setCreatedAt($currentDate);
        $hub->setDescription($data['description']);
        $hub->setDescriptionEn($data['description_en']);
        $this->getReferenced($hub, $data, $user, 'add');

        $this->entityManager->persist($hub);

        $this->entityManager->flush();
        
        $this->entityManager->commit();
        return $hub;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateHub($hub, $data, $user) {

        $this->entityManager->beginTransaction();
        try {
            $hub->setCountryId($data['country_id']);
            $hub->setCityId($data['city_id']);
            $hub->setCode($data['code']);
            $hub->setName($data['name']);
            $hub->setNameEn($data['name_en']);
            $hub->setStatus($data['status']);
            $hub->setUpdatedBy($user->id);
            $currentDate = date('Y-m-d H:i:s');
            $hub->setUpdatedAt($currentDate);
            $hub->setDescription($data['description']);
            $hub->setDescriptionEn($data['description_en']);
            $this->getReferenced($hub, $data, $user);
            
            $this->entityManager->flush();
            
            $this->entityManager->commit();
            return $hub;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($hub,$data, $user, $mode = '') {

      $country = $this->entityManager->getRepository(Country::class)->find($data['country_id']);
      if ($country == null)
          throw new \Exception('Not found Country by ID');
      $hub->setCountry($country);

      $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
      if ($city == null)
          throw new \Exception('Not found City by ID');
      $hub->setCity($city);

      $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $hub->setUserCreate($user_data);
        }
        $hub->setUserUpdate($user_data);

    }

    /**
     * Get list hub by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListHubByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $hubs     = [];
        $totalHub = 0;

        $ormHub = $this->entityManager->getRepository(Hub::class)
            ->getListHubByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormHub){
            $ormPaginator = new ORMPaginator($ormHub, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalHub = $ormPaginator->count();

            $hubs = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($hubs as &$hub) {
                //set created_at
                $hub['created_at'] =  ($hub['created_at']) ? Utils::checkDateFormat($hub['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $hub['updated_at'] =  ($hub['updated_at']) ? Utils::checkDateFormat($hub['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $hub['full_name_created'] = trim($hub['full_name_created']);
                $hub['full_name_updated'] = trim($hub['full_name_updated']);
            }
        }

        //set data user
        $dataHub = [
            'listHub' => $hubs,
            'totalHub' => $totalHub,
        ];
        return $dataHub;
    }

     public function deleteHub($hub) {

        $this->entityManager->beginTransaction();
        try {
            $this->entityManager->remove($hub);
            $this->entityManager->flush();

            $this->entityManager->commit();
            return $hub;
          
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

}