<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Servivce\DomesticPricingDataManager;
use PricingDomestic\Servivce\DomesticPricingVasManager;
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
use ServiceShipment\Entity\Category;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Service;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticPricingManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * @var DomesticPricingCityManager
     */
    private $domesticPricingDataManager;
    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $domesticPricingDataManager
     * @param $domesticPricingVasManager
     */
    public function __construct($entityManager, $domesticPricingDataManager,$domesticPricingVasManager)
    {
        $this->entityManager = $entityManager;
        $this->domesticPricingDataManager = $domesticPricingDataManager;
        $this->domesticPricingVasManager = $domesticPricingVasManager;
    }   

    /**
     * Get List Domestic Pricing By Condition
     */

    public function getListDomesticPricingByCondition($start, $limit, $sortField, $sortDirection,$filters)
    {
        $pricings = [];
        $totalPricing = 0;
        //get orm Domestic Pricing
        $ormPricing = $this->entityManager->getRepository(DomesticPricing::class)
            ->getListDomesticPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if($ormPricing){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormPricing, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalPricing = $ormPaginator->count();
            //get domestic pricing list
            
            $pricings = $ormPaginator->getIterator()->getArrayCopy();
            
             foreach ($pricings as &$pricing) {
                $pricing['effected_date'] =  ($pricing['effected_date']) ? Utils::checkDateFormat($pricing['effected_date'],'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['expired_date'] =  ($pricing['expired_date']) ? Utils::checkDateFormat($pricing['expired_date'],'D M d Y H:i:s \G\M\T+0700') : '';

                $pricing['created_at'] =  ($pricing['created_at']) ? Utils::checkDateFormat($pricing['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['updated_at'] =  ($pricing['updated_at']) ? Utils::checkDateFormat($pricing['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['full_name_created'] = trim($pricing['full_name_created']);
                $pricing['full_name_updated'] = trim($pricing['full_name_updated']);
            }
        }
        
        //set data user
        $dataPricing = [
            'listPricing' => $pricings,
            'totalPricing' => $totalPricing,
        ];
        
        return $dataPricing;
    }

    /**
     * Add Domestic Pricing
     */
    public function addPricing($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
            $domesticPricing = new DomesticPricing();
            $domesticPricing->setName($data['name']);
            $domesticPricing->setNameEn($data['name_en']);            

            $domesticPricing->setEffectedDate($data['effected_date']);
            $domesticPricing->setExpiredDate($data['expired_date']);
            $domesticPricing->setIsPrivate($data['is_private']);
            $domesticPricing->setStatus($data['status']);
            $domesticPricing->setApprovalStatus($data['approval_status']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            
            $domesticPricing->setCreatedAt($addTime->format('Y-m-d H:i:s'));            
            $domesticPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));            
            $this->getReferenced($domesticPricing,$user,'add', $data);
            
            $this->entityManager->persist($domesticPricing);
            
            $this->entityManager->flush();        
            
            $this->entityManager->commit();

            if(isset($data['cities']) && count($data['cities']) > 0) {
                foreach ($data['cities'] as $city ) {
                    $this->domesticPricingManager->updatePricingCity($domesticPricing->getId(), $city, $user);
                }
            }

            return $domesticPricing;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update Domestic Pricing
     */
    public function updatePricing($domesticPricing, $data,$user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricing->setName($data['name']);
            $domesticPricing->setNameEn($data['name_en']);

            $domesticPricing->setEffectedDate($data['effected_date']);
            $domesticPricing->setExpiredDate($data['expired_date']);
            $domesticPricing->setIsPrivate($data['is_private']);
            $domesticPricing->setStatus($data['status']);
            $domesticPricing->setApprovalStatus($data['approval_status']);
            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($domesticPricing,$user,'update', $data);

            // apply changes to database.
            $this->entityManager->flush();            
            $this->entityManager->commit();

           return $domesticPricing;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     /**
     * Delete Domestic Pricing
     */
    public function deletePricing($domesticPricing, $user) {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricing->setIsDeleted(1);
            $domesticPricing->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));            
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            
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

    private function getReferenced(&$domesticPricing, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticPricing->setCreatedBy($user_data);
        }

        $customer = $this->entityManager->getRepository(User::class)->find($data['customer_id']);
        if ($customer == null) {
            throw new \Exception('Not found Customer by ID');
        }
        
        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null) {
            throw new \Exception('Not found Carrier by ID');
        }
        
        $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
        if ($category == null) {
            throw new \Exception('Not found Category by ID');
        }
        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found Service by ID');
        }
        $saleman = $this->entityManager->getRepository(User::class)->find($data['saleman_id']);
        if ($saleman == null) {
            throw new \Exception('Not found Saleman by ID');
        }
        $approval = $this->entityManager->getRepository(User::class)->find($data['approval_by']);
        if ($approval == null) {
            throw new \Exception('Not found Approval by ID');
        }
        $domesticPricing->setCustomer($customer);
        $domesticPricing->setCarrier($carrier);
        $domesticPricing->setCategory($category);
        $domesticPricing->setService($service);
        $domesticPricing->setSaleman($saleman);
        $domesticPricing->setApprovalBy($approval);
        $domesticPricing->setUpdatedBy($user_data);

    }
}