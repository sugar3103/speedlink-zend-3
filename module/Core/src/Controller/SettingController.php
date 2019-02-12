<?php
namespace Core\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;

class SettingController extends CoreController
{
     /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var SettingManager
     */
    private $settingManager;

    public function __construct($entityManager,$settingManager) {
        parent::__construct($entityManager);        
        $this->entityManager = $entityManager;
        $this->settingManager = $settingManager;
    }

    public function indexAction()
    {
        if ( $this->getRequest()->isPost()) {
             // get the filters
             $fieldsMap = [
                0 => 'code',
                1 => 'key'
            ];
            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);
             //get list by condition
            $dataSetting = $this->settingManager->getListSettingByCondition($sortField, $sortDirection,$filters);

            $results = $this->filterByField($dataSetting['listSetting'],$fields);
            $result = array();
            foreach ($results as $_result ) {
                $result = array_merge($result,array(
                    $_result['key'] => $_result['value']
                ));
            }
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "Get List Success",
                'data'      => $result
            );
             
        }

        return $this->createResponse();
    }
}
