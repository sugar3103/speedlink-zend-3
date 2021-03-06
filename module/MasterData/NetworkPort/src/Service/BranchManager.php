<?php
namespace NetworkPort\Service;

use NetworkPort\Entity\Branch;
use NetworkPort\Entity\Hub;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Authentication\Result;
use Core\Utils\Utils;
use Address\Entity\Country;
use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
use OAuth\Entity\User;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\Service
 */
class BranchManager {

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
    public function addBranch($data, $user)
    {
        $this->entityManager->beginTransaction();
        try {
        $branch = new Branch;
        $branch->setCode($data['code']);
        $branch->setName($data['name']);
        $branch->setNameEn($data['name_en']);
        $branch->setHubId($data['hub_id']);
        $branch->setStatus($data['status']);
        $branch->setCreatedBy($user->id);
        $branch->setCreatedAt(date('Y-m-d H:i:s'));
        $branch->setCountryId($data['country_id']);
        $branch->setCityId($data['city_id']);
        $branch->setDistrictId($data['district_id']);
        $branch->setWardId($data['ward_id']);
        $branch->setDescription($data['description']);
        $branch->setDescriptionEn($data['description_en']);
        $this->getReferenced($branch, $data, $user, 'add');
        
        $this->entityManager->persist($branch);

        $this->entityManager->flush();        
        
        $this->entityManager->commit();
        return $branch;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateBranch($branch, $data, $user) {

        $this->entityManager->beginTransaction();
        try {
            $branch->setCode($data['code']);
            $branch->setName($data['name']);
            $branch->setNameEn($data['name_en']);
            $branch->setHubId($data['hub_id']);
            $branch->setStatus($data['status']);
            $branch->setUpdatedBy($user->id);
            $currentDate = date('Y-m-d H:i:s');
            $branch->setUpdatedAt($currentDate);
            $branch->setCountryId($data['country_id']);
            $branch->setCityId($data['city_id']);
            $branch->setDistrictId($data['district_id']);
            $branch->setWardId($data['ward_id']);
            $branch->setDescription($data['description']);
            $branch->setDescriptionEn($data['description_en']);
            $this->getReferenced($branch, $data, $user);
            
            // apply changes to database.
            $this->entityManager->flush();
            $this->entityManager->commit();
           return $branch;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($branch,$data, $user, $mode = '') {
       
        $country = $this->entityManager->getRepository(Country::class)->find($data['country_id']);
        if ($country == null)
            throw new \Exception('Not found Country by ID');

        $branch->setCountry($country);

        $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
        if ($city == null)
            throw new \Exception('Not found City by ID');

        $branch->setCity($city);
        
        $district = $this->entityManager->getRepository(District::class)->find($data['district_id']);
        if ($district == null)
            throw new \Exception('Not found District by ID');

        $branch->setDistrict($district);

        $ward = $this->entityManager->getRepository(Ward::class)->find($data['ward_id']);
        if ($ward == null)
            throw new \Exception('Not found Ward by ID');

        $branch->setWard($ward);

        $hub = $this->entityManager->getRepository(Hub::class)->find($data['hub_id']);
        if ($hub == null)
            throw new \Exception('Not found Hub by ID');
        $branch->setHub($hub);

        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $branch->setUserCreate($user_data);
        }
        $branch->setUserUpdate($user_data);

    }

    /**
     * Get list branch by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListBranchByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $branches     = [];
        $totalBranch = 0;

        //get orm branch
        $ormBranch = $this->entityManager->getRepository(Branch::class)
            ->getListBranchByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormBranch){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormBranch, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalBranch = $ormPaginator->count();

            //get user list
            $branches = $ormPaginator->getIterator()->getArrayCopy();

             foreach ($branches as &$branch) {
                //set created_at
                $branch['created_at'] =  ($branch['created_at']) ?Utils::checkDateFormat($branch['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $branch['updated_at'] =  ($branch['updated_at']) ? Utils::checkDateFormat($branch['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $branch['full_name_created'] = trim($branch['full_name_created']);
                $branch['full_name_updated'] = trim($branch['full_name_updated']);
            }
        }

        //set data user
        $dataBranch = [
            'listBranch' => $branches,
            'totalBranch' => $totalBranch,
        ];
        return $dataBranch;
    }
    
    public function deleteBranch($branch) {

        $this->entityManager->beginTransaction();
        try {
            $this->entityManager->remove($branch);

            $this->entityManager->flush();

            $this->entityManager->commit();
            return $branch;
          
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

}