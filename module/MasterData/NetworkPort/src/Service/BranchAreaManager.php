<?php
namespace NetworkPort\Service;

use NetworkPort\Entity\BranchArea;
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
/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\Service
 */
class BranchAreaManager {

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

    public function addBranchArea($data)
    {
        $this->entityManager->beginTransaction();
        try {
        $branch_area = new BranchArea;
        // var_dump($data); die;
        $branch_area->setBranchId($data['branch_id']);
        $branch_area->setHubId($data['hub_id']);
        $branch_area->setCountryId($data['country_id']);
        $branch_area->setCityId($data['city_id']);
        $branch_area->setDistrictId($data['district_id']);
        $branch_area->setWardId($data['ward_id']);
        $branch_area->setStatus($data['status']);
        $branch_area->setCreatedBy($data['created_by']);
        $branch_area->setCreatedAt(date('Y-m-d H:i:s'));
        $this->getReferenced($branch_area, $data);
        
        $this->entityManager->persist($branch_area);
        $this->entityManager->flush();        
        
        // $last_id = $branch->getBranchId();
        $this->entityManager->commit();
        return $branch_area;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateBranchArea($branch_area, $data) {

        $this->entityManager->beginTransaction();
        try {
            $branch_area->setBranchId($data['branch_id']);
            $branch_area->setHubId($data['hub_id']);
            $branch_area->setStatus($data['status']);
            $branch_area->setUpdatedBy($data['updated_by']);
            $branch_area->setUpdatedAt(date('Y-m-d H:i:s'));
            $branch_area->setCountryId($data['country_id']);
            $branch_area->setCityId($data['city_id']);
            $branch_area->setDistrictId($data['district_id']);
            $branch_area->setWardId($data['ward_id']);
            $this->getReferenced($branch_area, $data);
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $branch->getBranchId();
            $this->entityManager->commit();
           return $branch_area;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($branch_area,$data) {

        $country = $this->entityManager->getRepository(Country::class)->find($data['country_id']);
        if ($country == null)
            throw new \Exception('Not found Country by ID');

        $branch_area->setCountry($country);

        $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
        if ($city == null)
            throw new \Exception('Not found City by ID');

        $branch_area->setCity($city);
        
        $district = $this->entityManager->getRepository(District::class)->find($data['district_id']);
        if ($district == null)
            throw new \Exception('Not found District by ID');

        $branch_area->setDistrict($district);

        $ward = $this->entityManager->getRepository(Ward::class)->find($data['ward_id']);
        if ($ward == null)
            throw new \Exception('Not found Ward by ID');

        $branch_area->setWard($ward);

        $hub = $this->entityManager->getRepository(Hub::class)->find($data['hub_id']);
        if ($hub == null)
            throw new \Exception('Not found Hub by ID');

        $branch_area->setHub($hub);

        $branch = $this->entityManager->getRepository(Branch::class)->find($data['branch_id']);
        if ($branch == null)
            throw new \Exception('Not found Branch by ID');

        $branch_area->setBranch($branch);
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
    public function getListBranchAreaByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $branche_areas     = [];
        $totalBranchArea = 0;

        //get orm branch
        $ormBranch = $this->entityManager->getRepository(BranchArea::class)
            ->getListBranchAreaByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormBranch){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormBranch, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalBranchArea = $ormPaginator->count();

            //get user list
            $branche_areas = $ormPaginator->getIterator()->getArrayCopy();
            $countRow = 1;

             foreach ($branche_areas as &$branche) {
                //set status
             //   $branche['status'] = Branch::getIsActiveList($branche['status']);
                //set created_at
                $branche['created_at'] =  ($branche['created_at']) ?Utils::checkDateFormat($branche['created_at'],'d/m/Y') : '';
                $countRow++;
            }

            // $totalBranch = $paginator->getTotalItemCount();
        }

        //set data user
        $dataBranch = [
            'listBranchArea' => $branche_areas,
            'totalBranchArea' => $totalBranchArea,
        ];
        return $dataBranch;
    }
    
    public function deleteBranchArea($branch_area) {

        $this->entityManager->beginTransaction();
        try {
            
            $this->entityManager->remove($branch_area);
            $this->entityManager->flush();

            $this->entityManager->commit();
            return $branch_area;
          
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

}