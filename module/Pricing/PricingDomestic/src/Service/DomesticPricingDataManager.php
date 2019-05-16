<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticPrcingData;
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
use OAuth\Entity\User;
/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticPricingDataManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
  
    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $branchManager
   
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }   

    /**
     * Get List Domestic PricingData By Condition
     */

    public function getListDomesticPricingDataByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $areas = [];
        $totalPricingData = 0;
        //get orm Domestic PricingData
        $ormPricingData = $this->entityManager->getRepository(DomesticPricingData::class)
            ->getListDomesticPricingDataByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormPricingData){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormPricingData, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalPricingData = $ormPaginator->count();
            //get domestic area list
            
            $areas = $ormPaginator->getIterator()->getArrayCopy();
            
             foreach ($areas as &$area) {
                $area['cities'] =  $this->domesticPricingDataManager->getPricingDataCity($area['id']);
                $area['created_at'] =  ($area['created_at']) ? Utils::checkDateFormat($area['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['updated_at'] =  ($area['updated_at']) ? Utils::checkDateFormat($area['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['full_name_created'] = trim($area['full_name_created']);
                $area['full_name_updated'] = trim($area['full_name_updated']);
            }
        }
        //set data user
        $dataPricingData = [
            'listPricingData' => $areas,
            'totalPricingData' => $totalPricingData,
        ];
        
        return $dataPricingData;
    }

    /**
     * Add Domestic PricingData
     */
    public function addPricingData($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
            $domesticPricingData = new DomesticPricingData();
            $domesticPricingData->setName($data['name']);
            $domesticPricingData->setNameEn($data['name_en']);
            $domesticPricingData->setCreatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricingData->setCreatedAt($addTime->format('Y-m-d H:i:s'));            
            $this->getReferenced($domesticPricingData,$user,'add');
            
            $this->entityManager->persist($domesticPricingData);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            if(isset($data['cities']) && count($data['cities']) > 0) {
                foreach ($data['cities'] as $city ) {
                    $this->domesticPricingDataManager->updatePricingDataCity($domesticPricingData->getId(), $city, $user);
                }
            }

            return $domesticPricingData;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Domestic PricingData
     */
    public function updatePricingData($domesticPricingData, $data,$user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricingData->setName($data['name']);
            $domesticPricingData->setNameEn($data['name_en']);
            $domesticPricingData->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricingData->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($domesticPricingData,$user,'update');
            // apply changes to database.
            $this->entityManager->flush();            
            $this->entityManager->commit();

            $this->domesticPricingDataManager->deletePricingDataCity($domesticPricingData->getId());

            if(isset($data['cities']) && count($data['cities']) > 0) {                
                foreach ($data['cities'] as $city ) {
                    $this->domesticPricingDataManager->updatePricingDataCity($domesticPricingData->getId(), $city, $user);
                }
            }

           return $domesticPricingData;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     /**
     * Delete Domestic PricingData
     */
    public function deletePricingData($domesticPricingData, $user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricingData->setIsDeleted(1);
            $domesticPricingData->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricingData->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
           
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced(&$domesticPricingData, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticPricingData->setJoinCreated($user_data);
        }

        $domesticPricingData->setJoinUpdated($user_data);

    }
}