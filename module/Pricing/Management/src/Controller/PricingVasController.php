<?php
namespace Management\Controller;

use Core\Controller\CoreController;
use Management\Form\PricingVasForm;
use Doctrine\ORM\EntityManager;
use Management\Service\PricingVasManager;
use Management\Service\PricingVasSpecManager;
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
     * PricingVas Manager.
     * @var PricingVasSpecManager
     */
    protected $pricingVasSpecManager;

    /**
     * PricingVasController constructor.
     * @param $entityManager
     * @param $pricingVasManager
     * @param $pricingVasSpecManager
     */

    public function __construct($entityManager, $pricingVasManager, $pricingVasSpecManager)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->pricingVasManager = $pricingVasManager;
        $this->pricingVasSpecManager = $pricingVasSpecManager;
    }

    public function indexAction()
    {
        $result = [
            'data' => [
                'list' => []
            ]
        ];

        $fieldsMap = [];
        $param = $this->getRequestData($fieldsMap);
        $dataVas = $this->pricingVasManager->getListVasByCondition($param);
        foreach ($dataVas as $key => $vas) {
            if ($vas['type'] == 1) {
                $param['pricing_vas_id'] = $vas['id'];
                $dataVasSpec = $this->pricingVasSpecManager->getListVasSpecByCondition($param);
                $dataVas[$key]['spec'] = !empty($dataVasSpec) ? $dataVasSpec : [];;
            } else {
                $dataVas[$key]['spec'] = [];
            }
        }
        $result['error_code'] = 1;
        $result['message'] = 'Success';
        $result['data']['list'] = !empty($dataVas) ? $dataVas : [];
        $this->apiResponse = $result;

        return $this->createResponse();
    }
}