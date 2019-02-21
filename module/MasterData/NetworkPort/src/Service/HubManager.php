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
use Core\Utils\Utils;
use Address\Entity\Country;
use Address\Entity\City;
use OAuth\Entity\User;

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
        $hub->setCountryId($data['country_id']);
        $hub->setCityId($data['city_id']);
        $hub->setCode($data['code']);
        $hub->setName($data['name']);
        $hub->setNameEn($data['name_en']);
        $hub->setStatus($data['status']);
        $hub->setCreatedBy($data['created_by']);
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
            $hub->setCountryId($data['country_id']);
            $hub->setCityId($data['city_id']);
            $hub->setCode($data['code']);
            $hub->setName($data['name']);
            $hub->setNameEn($data['name_en']);
            $hub->setStatus($data['status']);
            $hub->setUpdatedBy($data['updated_by']);
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $hub->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
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

      $country = $this->entityManager->getRepository(Country::class)->find($data['country_id']);
      if ($country == null)
          throw new \Exception('Not found Country by ID');
      $hub->setCountry($country);

      $city = $this->entityManager->getRepository(City::class)->find($data['city_id']);
      if ($city == null)
          throw new \Exception('Not found City by ID');
      $hub->setCity($city);

      if($data['created_by']) {
      $user_create = $this->entityManager->getRepository(User::class)->find($data['created_by']);
      if ($user_create == null)
          throw new \Exception('Not found User by ID');
      $hub->setUserCreate($user_create);
      }

      if($data['updated_by']){
      $user_update = $this->entityManager->getRepository(User::class)->find($data['updated_by']);
      if ($user_update == null)
          throw new \Exception('Not found User by ID');
      $hub->setUserUpdate($user_update);
      }
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
                $hub['created_at'] =  ($hub['created_at']) ? Utils::checkDateFormat($hub['created_at'],'d/m/Y') : '';
                $hub['updated_at'] =  ($hub['updated_at']) ? Utils::checkDateFormat($hub['updated_at'],'d/m/Y H:i:s') : '';
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

}