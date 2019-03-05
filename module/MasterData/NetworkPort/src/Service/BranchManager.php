<?php
namespace NetworkPort\Service;

use NetworkPort\Entity\Branch;
use NetworkPort\Entity\Hub;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Zend\Crypt\Password\Bcrypt;
use Zend\Math\Rand;
use Zend\View\Renderer\PhpRenderer;
use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;
use Zend\Mail\Message;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
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
    public function addBranch($data)
    {
        $this->entityManager->beginTransaction();
        try {
        $branch = new Branch;
        $branch->setCode($data['code']);
        $branch->setName($data['name']);
        $branch->setNameEn($data['name_en']);
        $branch->setHubId($data['hub_id']);
        $branch->setStatus($data['status']);
        $branch->setCreatedBy($data['created_by']);
        $branch->setCreatedAt(date('Y-m-d H:i:s'));
        $branch->setCountryId($data['country_id']);
        $branch->setCityId($data['city_id']);
        $branch->setDistrictId($data['district_id']);
        $branch->setWardId($data['ward_id']);
        $branch->setDescription($data['description']);
        $branch->setDescriptionEn($data['description_en']);
        $this->getReferenced($branch, $data);
        
        $this->entityManager->persist($branch);
        $this->entityManager->flush();        
        
        // $last_id = $branch->getBranchId();
        $this->entityManager->commit();
        return $branch;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateBranch($branch, $data) {

        $this->entityManager->beginTransaction();
        try {
            $branch->setCode($data['code']);
            $branch->setName($data['name']);
            $branch->setNameEn($data['name_en']);
            $branch->setHubId($data['hub_id']);
            $branch->setStatus($data['status']);
            $branch->setUpdatedBy($data['updated_by']);
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $branch->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $branch->setCountryId($data['country_id']);
            $branch->setCityId($data['city_id']);
            $branch->setDistrictId($data['district_id']);
            $branch->setWardId($data['ward_id']);
            $branch->setDescription($data['description']);
            $branch->setDescriptionEn($data['description_en']);
            $this->getReferenced($branch, $data);
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $branch->getBranchId();
            $this->entityManager->commit();
           return $branch;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($branch,$data) {
       
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

        if($data['created_by']) {
        $user_create = $this->entityManager->getRepository(User::class)->find($data['created_by']);
        if ($user_create == null)
            throw new \Exception('Not found User by ID');
        $branch->setUserCreate($user_create);
        }

        if($data['updated_by']){
        $user_update = $this->entityManager->getRepository(User::class)->find($data['updated_by']);
        if ($user_update == null)
            throw new \Exception('Not found User by ID');
        $branch->setUserUpdate($user_update);
        }
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
            $countRow = 1;

             foreach ($branches as &$branche) {
                //set status
             //   $branche['status'] = Branch::getIsActiveList($branche['status']);
                //set created_at
                $branche['created_at'] =  ($branche['created_at']) ?Utils::checkDateFormat($branche['created_at'],'d/m/Y') : '';
                $branche['updated_at'] =  ($branche['updated_at']) ? Utils::checkDateFormat($branche['updated_at'],'d/m/Y H:i:s') : '';
                $countRow++;
            }

            // $totalBranch = $paginator->getTotalItemCount();
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