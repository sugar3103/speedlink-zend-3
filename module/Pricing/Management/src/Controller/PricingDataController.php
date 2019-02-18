<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingDataForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingData;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingDataController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingData Manager.
     * @var PricingDataManager
     */
    protected $pricingDataManager;

    /**
     * PricingDataController constructor.
     * @param $entityManager
     * @param $pricingDataManager
     */

    public function __construct($entityManager, $pricingDataManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingDataManager = $pricingDataManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Pricing Data Index Action'
      ];
      return $this->createResponse();
    }
}