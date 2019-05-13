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
     * @param $branchManager
   
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
}