<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingCodMinForm;
use Doctrine\ORM\EntityManager;
use Zend\Cache\Storage\StorageInterface;
use Management\Entity\PricingCodMin;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class PricingCodMinController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;

    /**
     * PricingCodMin Manager.
     * @var PricingCodMinManager
     */
    protected $pricingCodMinManager;

    /**
     * PricingCodMinController constructor.
     * @param $entityManager
     * @param $pricingCodMinManager
     */

    public function __construct($entityManager, $pricingCodMinManager) 
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingCodMinManager = $pricingCodMinManager;
    }

    public function indexAction()
    {
      $this->apiResponse = [
          'message' => 'Not Thing to see here'
      ];
      return $this->createResponse();
    }
}