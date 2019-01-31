<?php
namespace Core\Service;

use Core\Entity\Setting;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Core\Utils\Utils;

/**
 * this service is responsible for adding/editing settings.
 * @package Core\Service
 */
class SettingManager {

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * SettingManager constructor.
     * @param $entityManager
     * @param $rbacManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Add new setting.
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addSetting($data) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $setting = new Setting();
            $setting->setCode($data['code']);
            $setting->setKey($data['key']);
            $setting->setVaule($data['value']);
            $setting->setSerialized($data['serialized']);            
            
            $this->entityManager->persist($setting);

            // apply changes to database
            $this->entityManager->flush();

            // reload rbac container
            $this->rbacManager->init(true);

            $this->entityManager->commit();
            return TRUE;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Updates an existing setting.
     * @param $setting Setting
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateSetting($setting, $data) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $setting->setCode($data['code']);
            $setting->setKey($data['key']);
            $setting->setVaule($data['value']);
            $setting->setSerialized($data['serialized']);

            $this->entityManager->flush();

            // reload rbac container.
            $this->rbacManager->init(true);

            $this->entityManager->commit();
            return TRUE;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Deletes the given setting.
     *
     * @param $id
     * @return bool
     */
    public function deleteSetting($id) {

        $this->entityManager->beginTransaction();
        try {

            // Delete record in tbl setting
            $setting = $this->entityManager->getRepository(Setting::class)->find($id);

            $this->entityManager->remove($setting);
            $this->entityManager->flush();

            // reload rbac container.
            $this->rbacManager->init(true);

            $this->entityManager->commit();
            return TRUE;
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }    

    /**
     *
     * Get list setting by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function getListSettingByCondition(
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $settings     = [];
        $totalSetting = 0;

        //get orm setting
        $ormSetting = $this->entityManager->getRepository(Setting::class)
            ->getListSettingByCondition($sortField, $sortDirection, $filters);

        if($ormSetting){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormSetting, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalSetting = $ormPaginator->count();
            
            //get list
            $settings = $ormPaginator->getIterator()->getArrayCopy();

        }

        //set data
        $dataSetting = [
            'listSetting' => $settings            
        ];

        return $dataSetting;
    }
}