<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticPricingVas;
use PricingDomestic\Servivce\DomesticPricingVasCityManager;
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
class DomesticPricingVasManager {

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
     * Get List Domestic PricingVas By Condition
     */

    public function getListDomesticPricingVasByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $areas = [];
        $totalPricingVas = 0;
        //get orm Domestic PricingVas
        $ormPricingVas = $this->entityManager->getRepository(DomesticPricingVas::class)
            ->getListDomesticPricingVasByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormPricingVas){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormPricingVas, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalPricingVas = $ormPaginator->count();
            //get domestic area list
            
            $areas = $ormPaginator->getIterator()->getArrayCopy();
            
             foreach ($areas as &$area) {
                $area['cities'] =  $this->domesticPricingVasCityManager->getPricingVasCity($area['id']);
                $area['created_at'] =  ($area['created_at']) ? Utils::checkDateFormat($area['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['updated_at'] =  ($area['updated_at']) ? Utils::checkDateFormat($area['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $area['full_name_created'] = trim($area['full_name_created']);
                $area['full_name_updated'] = trim($area['full_name_updated']);
            }
        }
        //set data user
        $dataPricingVas = [
            'listPricingVas' => $areas,
            'totalPricingVas' => $totalPricingVas,
        ];
        
        return $dataPricingVas;
    }

    /**
     * Add Domestic PricingVas
     */
    public function addPricingVas($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
            $domesticPricingVas = new DomesticPricingVas();
            $domesticPricingVas->setName($data['name']);
            $domesticPricingVas->setNameEn($data['name_en']);
            $domesticPricingVas->setCreatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricingVas->setCreatedAt($addTime->format('Y-m-d H:i:s'));            
            $this->getReferenced($domesticPricingVas,$user,'add');
            
            $this->entityManager->persist($domesticPricingVas);
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            if(isset($data['cities']) && count($data['cities']) > 0) {
                foreach ($data['cities'] as $city ) {
                    $this->domesticPricingVasCityManager->updatePricingVasCity($domesticPricingVas->getId(), $city, $user);
                }
            }

            return $domesticPricingVas;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Domestic PricingVas
     */
    public function updatePricingVas($domesticPricingVas, $data,$user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricingVas->setName($data['name']);
            $domesticPricingVas->setNameEn($data['name_en']);
            $domesticPricingVas->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricingVas->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($domesticPricingVas,$user,'update');
            // apply changes to database.
            $this->entityManager->flush();            
            $this->entityManager->commit();

            $this->domesticPricingVasCityManager->deletePricingVasCity($domesticPricingVas->getId());

            if(isset($data['cities']) && count($data['cities']) > 0) {                
                foreach ($data['cities'] as $city ) {
                    $this->domesticPricingVasCityManager->updatePricingVasCity($domesticPricingVas->getId(), $city, $user);
                }
            }

           return $domesticPricingVas;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     /**
     * Delete Domestic PricingVas
     */
    public function deletePricingVas($domesticPricingVas, $user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricingVas->setIsDeleted(1);
            $domesticPricingVas->setUpdatedBy($user->id);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricingVas->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
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

    private function getReferenced(&$domesticPricingVas, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticPricingVas->setJoinCreated($user_data);
        }

        $domesticPricingVas->setJoinUpdated($user_data);

    }
}