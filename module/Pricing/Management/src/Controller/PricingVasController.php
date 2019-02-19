<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingVasForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingVas;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingVasController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingVas Manager.
     * @var PricingVasManager
     */
    protected $pricingVasManager;

    /**
     * PricingVasController constructor.
     * @param $entityManager
     * @param $pricingVasManager
     */

    public function __construct($entityManager, $pricingVasManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingVasManager = $pricingVasManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Pricing Vas Index Action'
      ];
      return $this->createResponse();
    }
}