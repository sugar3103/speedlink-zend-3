<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingCodForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingCodManager;
use Management\Service\PricingCodMinManager;
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
     * PricingCod Manager.
     * @var PricingCodMinManager
     */
    protected $pricingCodMinManager;

    /**
     * PricingCodController constructor.
     * @param $entityManager
     * @param $pricingCodManager
     * @param $pricingCodMinManager
     */

    public function __construct($entityManager, $pricingCodManager, $pricingCodMinManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingCodManager = $pricingCodManager;
        $this->pricingCodMinManager = $pricingCodMinManager;
    }

    public function indexAction()
    {
        $result = [
            'data' => [
                'list' => [],
                'min' => []
            ]
        ];

        $fieldsMap = [];
        $param = $this->getRequestData($fieldsMap);
        $dataCod = $this->pricingCodManager->getListCodByCondition($param);
        $dataCodMin = $this->pricingCodMinManager->getListCodMinByCondition($param);

        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result['data']['list'] = !empty($dataCod) ? $dataCod : [];
        $result['data']['min'] = !empty($dataCodMin) ? $dataCodMin : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }
}