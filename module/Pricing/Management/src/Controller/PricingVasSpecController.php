<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingVasSpecForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingVasSpec;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingVasSpecController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingVasSpec Manager.
     * @var PricingVasSpecManager
     */
    protected $pricingVasSpecManager;

    /**
     * PricingVasSpecController constructor.
     * @param $entityManager
     * @param $pricingVasSpecManager
     */

    public function __construct($entityManager, $pricingVasSpecManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingVasSpecManager = $pricingVasSpecManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Pricing Vas Spec Index Action'
      ];
      return $this->createResponse();
    }
}