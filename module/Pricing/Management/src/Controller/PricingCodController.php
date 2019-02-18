<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingCodForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingCod;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingCodController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingCod Manager.
     * @var PricingCodManager
     */
    protected $pricingCodManager;

    /**
     * PricingCodController constructor.
     * @param $entityManager
     * @param $pricingCodManager
     */

    public function __construct($entityManager, $pricingCodManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingCodManager = $pricingCodManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Pricing Cod Index Action'
      ];
      return $this->createResponse();
    }
}