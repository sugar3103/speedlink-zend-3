<?php
namespace System\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use System\Entity\Setting;

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
                'message'   => "SUCCESS",
                'data'      => $result
            );
             
        }

        return $this->createResponse();
    }

    public function infoAction()
    {
        if ( $this->getRequest()->isPost()) {
             // get the filters
             $fieldsMap = [
                0 => 'code',
                1 => 'key'
            ];
            list($start,$limit,$sortField,$sortDirection,$filters) = $this->getRequestData($fieldsMap);
             //get list by condition
            $dataSetting = $this->settingManager->getListSettingByCondition($sortField, $sortDirection,$filters);

            $fields = [
                'name','name_en','meta_title_en','owner','meta_title','language','password','default_color','maintenance','allow_customizer','country','city','district','ward'
            ];

            $results = $dataSetting['listSetting'];
            $result = array();
            foreach ($results as $_result ) {
                if(in_array($_result['key'], $fields)) {
                    $result = array_merge($result,array(
                        $_result['key'] => $_result['value']
                    ));
                }
            }
            $this->error_code = 1;
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result
            );
             
        }

        return $this->createResponse();
    }

    public function updateAction()
    {
        if ( $this->getRequest()->isPost()) {
            $this->error_code = 1;        
            $data = $this->getRequestData();
            foreach ($data as $key => $value) {
                if(is_array($value)) {
                    foreach ($value as $c => $v) {
                        $setting = $this->entityManager->getRepository(Setting::class)->findOneBy(
                            array('code' => $key,'key' => $c)
                        );
                        if($setting) {
                            $this->settingManager->updateSetting($setting,$key,$c,$v,0);
                        } else {
                            $this->settingManager->addSetting($key,$c,$v,0);
                        }
                    }
                    
                }
            }
            $this->apiResponse =  array(
                'message'   => "UPDATE_SUCCESS"              
            );
        }
        return $this->createResponse();        
    }
}
