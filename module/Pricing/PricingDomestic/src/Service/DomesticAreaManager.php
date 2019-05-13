<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticArea;
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
 * @package PricingDomestic\Service
 */
class DomesticAreaManager {

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
     * Get List Domestic Area By Condition
     */

    public function getListDomesticAreaByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $areas = [];
        $totalArea = 0;
        //get orm Domestic Area
        $ormArea = $this->entityManager->getRepository(DomesticArea::class)
            ->getListDomesticAreaByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormArea){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormArea, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalArea = $ormPaginator->count();
            //get domestic area list
            
            $areas = $ormPaginator->getIterator()->getArrayCopy();
            
             foreach ($areas as &$area) {
                $area['created_at'] =  ($area['created_at']) ? Utils::checkDateFormat($area['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['updated_at'] =  ($area['updated_at']) ? Utils::checkDateFormat($area['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['full_name_created'] = trim($area['full_name_created']);
                $area['full_name_updated'] = trim($area['full_name_updated']);
            }
        }
        //set data user
        $dataArea = [
            'listArea' => $areas,
            'totalArea' => $totalArea,
        ];
        
        return $dataArea;
    }

    /**
     * Add Domestic Area
     */
    public function addArea($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
            $domesticArea = new DomesticArea();
            $domesticArea->setName($data['name']);
            $domesticArea->setNameEn($data['name_en']);
            $domesticArea->setCreatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticArea->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            

            $this->entityManager->persist($domesticArea);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            return $domesticArea;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Domestic Area
     */
    public function updateArea($domesticArea, $data,$user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticArea->setName($data['name']);
            $domesticArea->setNameEn($data['name_en']);
            $domesticArea->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticArea->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
           return $rangeweight;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     /**
     * Delete Domestic Area
     */
    public function deleteArea($domesticArea) {

        $this->entityManager->beginTransaction();
        try {
            $domesticArea->setIsDeleted(1);
            $domesticArea->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticArea->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();
           return $rangeweight;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}