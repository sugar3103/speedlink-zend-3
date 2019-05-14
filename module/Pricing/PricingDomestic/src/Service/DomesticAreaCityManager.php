<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticAreaCity;
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
use Address\Entity\City;
use OAuth\Entity\User;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticAreaCityManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager     
   
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }   

    /**
     * Get List Domestic Area By Condition
     */

    public function getListDomesticAreaCityByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $areaCities = [];
        $totalAreaCity = 0;
        //get orm Domestic Area
        $ormAreaCity = $this->entityManager->getRepository(DomesticAreaCity::class)
            ->getListDomesticAreaCityByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormAreaCity){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormAreaCity, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalAreaCity = $ormPaginator->count();
            //get domestic area list
            
            $areaCities = $ormPaginator->getIterator()->getArrayCopy();            
            
            foreach ($areas as &$areaCitiy) {
                $areaCitiy['created_at'] =  ($areaCitiy['created_at']) ? Utils::checkDateFormat($areaCitiy['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $areaCitiy['updated_at'] =  ($areaCitiy['updated_at']) ? Utils::checkDateFormat($areaCitiy['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';

            }
        }
        //set data user
        $dataAreaCity = [
            'listAreaCity' => $areaCities,
            'totalAreaCity' => $totalAreaCity,
        ];
        
        return $dataAreaCity;
    }

    public function getCities()
    {
        $cities = [];
        $totalCity = 0;

        $ormCities = $this->entityManager->getRepository(DomesticAreaCity::class)->getCities();    
        if($ormCities){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormCities, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCity = $ormPaginator->count();
            //get domestic area list
            
            $cities = $ormPaginator->getIterator()->getArrayCopy();                        
            
        }

        $dataCity = [
            'listCity' => $cities,
            'totalCity' => $totalCity,
        ];
        
        return $dataCity;
    }
    public function getAreaCity($area_id)
    {
        $cities = [];
        $dataCity= [];
        $ormCities = $this->entityManager->getRepository(DomesticAreaCity::class)->getAreaCity($area_id);    
        if($ormCities){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormCities, true);
            $ormPaginator->setUseOutputWalkers(false);
            //get domestic area list
            
            $cities = $ormPaginator->getIterator()->getArrayCopy();                        
            foreach ($cities as $city) {
                $dataCity[] = $city['city_id'];
            }
        }
        return $dataCity;
    }

    public function updateAreaCity($area_id,$city_id,$user)
    {
        
        //Get Area City
        $areaCity = $this->entityManager->getRepository(DomesticAreaCity::class)->findOneBy(array(
            'domestic_area_id' => $area_id,
            'city_id' => $city_id
        ));
        
        $this->entityManager->beginTransaction();
        try {
            if($areaCity) {
                $areaCity->setIsDeleted(0);
                $areaCity->setUpdatedBy($user->id);
                
                $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                $areaCity->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                $this->getReferenced($areaCity,$user,'update');
            } else {
                $areaCity = new DomesticAreaCity();
                $areaCity->setDomesticAreaId($area_id);
                $areaCity->setCityId($city_id);
                $areaCity->setCreatedBy($user->id);  

                $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                $areaCity->setCreatedAt($addTime->format('Y-m-d H:i:s'));  
                $this->getReferenced($areaCity,$user,'add');              
            }
            
            $this->entityManager->persist($areaCity);
            
            // apply changes to database.
            $this->entityManager->flush();            
            $this->entityManager->commit();
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    public function deleteAreaCity($area_id) {
        $areaCity = $this->entityManager->getRepository(DomesticAreaCity::class)->deleteAreaCity($area_id);
    }

    private function getReferenced(&$areaCity, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $areaCity->setJoinCreated($user_data);
        }

        $areaCity->setJoinUpdated($user_data);

    }
}