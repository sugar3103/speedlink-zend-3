<?php
namespace ZoneCode\Service;

use ZoneCode\Entity\RangeWeight;
use ZoneCode\Entity\ZoneCode;
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
 * @package ZoneCode\Service
 */
class ZoneCodeManager {

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

    public function addZoneCode($data)
    {
        $this->entityManager->beginTransaction();
        try {
        $zonecode = new ZoneCode;
        // var_dump($data); die;
        $zonecode->setCode($data['code']);
        $zonecode->setName($data['name']);
        $zonecode->setNameEn($data['name_en']);
        $zonecode->setHubId($data['hub_id']);
        $zonecode->setStatus($data['status']);
       
        $zonecode->setCountryId($data['country_id']);
        $zonecode->setCityId($data['city_id']);
        $zonecode->setDistrictId($data['district_id']);
        $zonecode->setWardId($data['ward_id']);
        $zonecode->setDescription($data['description']);
        $zonecode->setDescriptionEn($data['description_en']);

        $zonecode->setCreatedBy($data['created_by']);
        $zonecode->setCreatedAt(date('Y-m-d H:i:s'));
        $this->getReferenced($zonecode, $data);
        
        $this->entityManager->persist($zonecode);
        $this->entityManager->flush();        
        
        // $last_id = $zonecode->getZoneCodeId();
        $this->entityManager->commit();
        return $zonecode;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateZoneCode($zonecode, $data) {

        $this->entityManager->beginTransaction();
        try {
            $zonecode->setCode($data['code']);
            $zonecode->setName($data['name']);
            $zonecode->setNameEn($data['name_en']);
            $zonecode->setHubId($data['hub_id']);
            $zonecode->setStatus($data['status']);
           
            $zonecode->setCountryId($data['country_id']);
            $zonecode->setCityId($data['city_id']);
            $zonecode->setDistrictId($data['district_id']);
            $zonecode->setWardId($data['ward_id']);
            $zonecode->setDescription($data['description']);
            $zonecode->setDescriptionEn($data['description_en']);

            $zonecode->setUpdatedBy($data['updated_by']);
            $zonecode->setUpdatedAt(date('Y-m-d H:i:s'));
            $this->getReferenced($zonecode, $data);
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $zonecode->getBranchId();
            $this->entityManager->commit();
           return $zonecode;
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
    public function getListZoneCodeByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){
        $zonecodes     = [];
        $totalZoneCode = 0;
        //get orm zonecode
        $ormZoneCode = $this->entityManager->getRepository(ZoneCode::class)
            ->getListZoneCodeByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormZoneCode){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormZoneCode, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalZoneCode = $ormPaginator->count();
            //get user list
            $zonecodes = $ormPaginator->getIterator()->getArrayCopy();
            // $countRow = 1;
             foreach ($zonecodes as &$zonecode) {
            //set status
            //   $zonecode['status'] = Branch::getIsActiveList($zonecode['status']);
            //set created_at
                $zonecode['created_at'] =  ($zonecode['created_at']) ?Utils::checkDateFormat($zonecode['created_at'],'d/m/Y') : '';
            // $countRow++;
            }
        }
        //set data user
        $dataZoneCode = [
            'listZoneCode' => $zonecodes,
            'totalZoneCode' => $totalZoneCode,
        ];
        return $dataZoneCode;
    }
    
    public function deleteZoneCode($zonecode) {
        $this->entityManager->beginTransaction();
        try {      
            $this->entityManager->remove($zonecode);
            $this->entityManager->flush();
            $this->entityManager->commit();
            return $zonecode;          
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}