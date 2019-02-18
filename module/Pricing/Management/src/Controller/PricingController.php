<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\Pricing;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * Pricing Manager.
     * @var PricingManager
     */
    protected $pricingManager;

    /**
     * PricingController constructor.
     * @param $entityManager
     * @param $pricingManager
     */

    public function __construct($entityManager, $pricingManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingManager = $pricingManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Pricing Index Action'
      ];
      return $this->createResponse();
    }
}