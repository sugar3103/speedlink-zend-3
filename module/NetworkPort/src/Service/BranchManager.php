<?php
namespace NetworkPort\Service;

use NetworkPort\Entity\Branch;
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
        $branch->setHubId($data['hub_id']);
        $branch->setStatus($data['status']);
        $branch->setCreatedBy($data['created_by']);
        $branch->setCreatedAt(date('Y-m-d H:i:s'));
        $branch->setCountryId($data['country_id']);
        $branch->setCityId($data['city_id']);
        $branch->setDistrictId($data['district_id']);
        $branch->setWardId($data['ward_id']);
        $branch->setDescription($data['description']);
        
        $this->entityManager->persist($branch);
        $this->entityManager->flush();
        
        var_dump($branch);die;
        $last_id = $branch->getBranchId();
        $this->entityManager->commit();
        return new Result(
                Result::SUCCESS,
                $last_id,
                ['Add branch successfully.']
            );
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
            $branch->setHubId($data['hub_id']);
            $branch->setStatus($data['status']);
            $branch->setUpdatedBy($data['updated_by']);
            $branch->setUpdatedAt(date('Y-m-d H:i:s'));
            $branch->setCountryId($data['country_id']);
            $branch->setCityId($data['city_id']);
            $branch->setDistrictId($data['district_id']);
            $branch->setWardId($data['ward_id']);
            // $branch->setIncludingWardIds($data['including_ward_ids']);
            $branch->setDescription($data['description']);
            
            // apply changes to database.
            $this->entityManager->flush();
            $last_id = $branch->getBranchId();
            $this->entityManager->commit();
            return new Result(
                Result::SUCCESS,
                $last_id,
                ['Update branch successfully.']
            );
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
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
        $currentPage,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $branches     = [];
        $totalBranch = 0;

        //get orm branch
        $ormBranch = $this->entityManager->getRepository(Branch::class)
            ->getListBranchByCondition($sortField, $sortDirection, $filters);

        if($ormBranch){

            //set offset,limit
            $ormPaginator = new ORMPaginator($ormBranch, true);
            $ormPaginator->setUseOutputWalkers(false);
            $adapter = new DoctrineAdapter($ormPaginator);
            $paginator = new Paginator($adapter);

            //sets the current page number
            $paginator->setCurrentPageNumber($currentPage);

            //Sets the number of items per page
            $paginator->setItemCountPerPage($limit);

            //get user list
            $branches = $paginator->getIterator()->getArrayCopy();

            $totalBranch = $paginator->getTotalItemCount();
        }

        //set data user
        $dataBranch = [
            'listBranch' => $branches,
            'totalBranch' => $totalBranch,
        ];
        return $dataBranch;
    }
    public function deleteBranch($id) {

        $this->entityManager->beginTransaction();
        try {
            // Delete record in tbl role
            $branch = $this->entityManager->getRepository(Branch::class)->find($id);

            if($branch) {
            $this->entityManager->remove($branch);
            $this->entityManager->flush();

            $this->entityManager->commit();
            return new Result(
                Result::SUCCESS,
                null,
                ['Delete branch successfully.']
            );
          }
          else
          {
            return new Result(
                Result::FAILURE,
                null,
                ['Hub not found. Delete branch failed!.']
            );
          }
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
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