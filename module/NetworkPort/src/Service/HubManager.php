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
    public function addHub($data)
    {
        $this->entityManager->beginTransaction();
        try {
        $hub = new Hub;

        $hub->setCityId($data['city_id']);
        $hub->setCode($data['code']);
        $hub->setName($data['name']);
        $hub->setStatus($data['status']);
        $hub->setCreatedBy($data['create_by']);
        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
        $hub->setCreatedAt($addTime->format('Y-m-d H:i:s'));
        $hub->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
        $hub->setDescription($data['description']);

        $this->entityManager->persist($hub);
        $this->entityManager->flush();
        $last_id = $hub->getHubId();
        $this->entityManager->commit();
        return new Result(
                Result::SUCCESS,
                $last_id,
                ['Add hub successfully.']
            );
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
            $hub->setStatus($data['status']);
            $hub->setUpdatedBy($data['update_by']);
            $hub->setUpdatedAt(date('Y-m-d H:i:s'));
            $hub->setDescription($data['description']);
            
            // apply changes to database.
            $this->entityManager->flush();
            $last_id = $hub->getHubId();
            $this->entityManager->commit();
            return new Result(
                Result::SUCCESS,
                $last_id,
                ['Update hub successfully.']
            );
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
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
        $currentPage,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $hubs     = [];
        $totalHub = 0;

        //get orm branch
        $ormHub = $this->entityManager->getRepository(Hub::class)
            ->getListHubByCondition($sortField, $sortDirection, $filters);

        if($ormHub){

            //set offset,limit
            $ormPaginator = new ORMPaginator($ormHub, true);
            $ormPaginator->setUseOutputWalkers(false);
            $adapter = new DoctrineAdapter($ormPaginator);
            $paginator = new Paginator($adapter);

            //sets the current page number
            $paginator->setCurrentPageNumber($currentPage);

            //Sets the number of items per page
            $paginator->setItemCountPerPage($limit);

            //get user list
            $hubs = $paginator->getIterator()->getArrayCopy();

            //get and set total user
            $totalHub = $paginator->getTotalItemCount();
        }

        //set data user
        $dataHub = [
            'listHub' => $hubs,
            'totalHub' => $totalHub,
        ];
        return $dataHub;
    }

     public function deleteHub($id) {

        $this->entityManager->beginTransaction();
        try {

            // Delete record in tbl role
            $hub = $this->entityManager->getRepository(Hub::class)->find($id);

            if($hub) {
            $this->entityManager->remove($hub);
            $this->entityManager->flush();

            $this->entityManager->commit();
            return new Result(
                Result::SUCCESS,
                null,
                ['Delete hub successfully.']
            );
          }
          else
          {
            return new Result(
                Result::FAILURE,
                null,
                ['Hub not found. Delete hub failed!.']
            );
          }
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

}