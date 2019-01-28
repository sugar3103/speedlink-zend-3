<?php
namespace NetworkPort\Service;

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

use Address\Entity\City;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package NetworkPort\Service
 */
class HubManager {

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
    public function addHub($data,$user)
    {
        $this->entityManager->beginTransaction();
        try {
        $hub = new Hub;
        // var_dump($data);die;
        $hub->setCityId($data['city_id']);
        $hub->setCode($data['code']);
        $hub->setName($data['name']);
        $hub->setNameEn($data['name_en']);
        $hub->setStatus($data['status']);
        $hub->setCreatedBy($user->id);
        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
        $hub->setCreatedAt($addTime->format('Y-m-d H:i:s'));
        // $hub->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
        $hub->setDescription($data['description']);
        $hub->setDescriptionEn($data['description_en']);

        $this->getReferenced($hub, $data);

        $this->entityManager->persist($hub);
        $this->entityManager->flush();
        // $last_id = $hub->getHubId();
        $this->entityManager->commit();

        return $hub;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

     public function updateHub($hub, $data) {

        $this->entityManager->beginTransaction();
        try {
            $hub->setCityId($data['city_id']);
            $hub->setCode($data['code']);
            $hub->setName($data['name']);
            $hub->setNameEn($data['name_en']);
            $hub->setStatus($data['status']);
            $hub->setUpdatedBy($data['updated_by']);
            $hub->setUpdatedAt(date('Y-m-d H:i:s'));
            $hub->setDescription($data['description']);
            $hub->setDescriptionEn($data['description_en']);
            $this->getReferenced($hub, $data);
            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $hub->getHubId();
            $this->entityManager->commit();
            return $hub;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    private function getReferenced($hub,$data) {

      $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
      if ($city == null)
          throw new \Exception('Not found City by ID');
      $hub->setCity($city);
    }

    /**
     * Get list hub by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListHubByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $hubs     = [];
        $totalHub = 0;

        //get orm branch
        $ormHub = $this->entityManager->getRepository(Hub::class)
            ->getListHubByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormHub){
            $ormPaginator = new ORMPaginator($ormHub, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalHub = $ormPaginator->count();

            //get hub list
            $hubs = $ormPaginator->getIterator()->getArrayCopy();
            $countRow = 1;

            foreach ($hubs as &$hub) {
                //set status
                // $hub['status'] = Hub::getIsActiveList($hub['status']);
                //set created_at
                $hub['created_at'] =  ($hub['created_at']) ? $this->checkDateFormat($hub['created_at'],'d/m/Y H:i:s') : '';
                $countRow++;
            }
        }

        //set data user
        $dataHub = [
            'listHub' => $hubs,
            'totalHub' => $totalHub,
        ];
        return $dataHub;
    }

     public function deleteHub($hub) {

        $this->entityManager->beginTransaction();
        try {
            $this->entityManager->remove($hub);
            $this->entityManager->flush();

            $this->entityManager->commit();
            return $hub;
          
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Check date format
     *
     * @param $dateAction
     * @param $dateFormat
     * @return string
     */
    public function checkDateFormat($dateAction,$dateFormat)
    {
        $dateLast = '';
        $dateCheck = ! empty($dateAction) ? $dateAction->format('Y-m-d H:i:s') : '';
        if ($dateCheck) {
            $datetime = new \DateTime($dateCheck, new \DateTimeZone('UTC'));
            $laTime = new \DateTimeZone('Asia/Ho_Chi_Minh');
            $datetime->setTimezone($laTime);
            $dateLast = $datetime->format($dateFormat);
        }
        return $dateLast;
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

    public function getListHubSelect(
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    ){

        $hubs     = [];
        $totalHub = 0;
        
        //get orm Hub
        $ormHub = $this->entityManager->getRepository(Hub::class)
            ->getListHubSelect($sortField, $sortDirection, $filters);

        if($ormHub){
            $ormPaginator = new ORMPaginator($ormHub, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalHub = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $hubs = $ormPaginator->getIterator()->getArrayCopy();
            //set countRow default
            $countRow = 1;
            
            foreach ($hubs as &$hub) {//loop
                //set status
                $hub['status'] = Hub::getIsActiveList($hub['status']);
                $countRow++;
            }  
        }
        //set data city
        $dataHub = [
            'listHub' => $hubs,
            'totalHub' => $totalHub,
        ];
        return $dataHub;
    }

}