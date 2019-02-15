<?php
namespace Customer\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Pricing\Entity\RangeWeight;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Pricing\Form\RangeWeightForm;

class CustomerController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * RangeWeight Manager.
     * @var RangeWeightManager
     */
    protected $rangeweightManager;

    /**
     * RangeWeightController constructor.
     * @param $entityManager
     * @param $rangeweightManager
     */

    public function __construct($entityManager, $rangeweightManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->rangeweightManager = $rangeweightManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
              0 => 'id',
              1 => 'name',
              3 => 'created_at'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);          
            //get list User by condition
            $dataRangeWeight = $this->rangeweightManager->getListRangeWeightByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = ($dataRangeWeight['listRangeWeight']) ? $dataRangeWeight['listRangeWeight'] : [] ;
            
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Success",
                'data'      => $result,
                'total'     => $dataRangeWeight['totalRangeWeight']
            );                         
        } 

        return $this->createResponse();
    }

}