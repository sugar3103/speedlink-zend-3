<?php
namespace Management\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingCod;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingCodManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getListCodByCondition($param)
    {
        $pricingCodList = [];
        $ormCod = $this->entityManager->getRepository(PricingCod::class)->getListCodByCondition($param);
        if($ormCod){
            $ormPaginator = new ORMPaginator($ormCod, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingCodList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingCodList;
    }

    /**
     * Add PricingCod
     * @param $data
     * @param $user
     * @return PricingCod|bool
     * @throws \Exception
     */
    public function addPricingCod($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $date = date('Y-m-d H:i:s');
            foreach ($data as $cod) {
                $pricingCod = new PricingCod();
                $pricingCod->setFrom($cod['from']);
                $pricingCod->setTo($cod['to']);
                $pricingCod->setInternalCity($cod['internal_city']);
                $pricingCod->setInternalCityRas($cod['internal_city_ras']);
                $pricingCod->setExternalCity($cod['external_city']);
                $pricingCod->setExternalCityRas($cod['external_city_ras']);
                $pricingCod->setCreatedAt($date);
                $pricingCod->setCreatedBy($user->id);
                $pricingCod->setUpdatedAt($date);
                $pricingCod->setUpdatedBy($user->id);
                $this->entityManager->persist($pricingCod);
            }
            $this->entityManager->flush();
            $this->entityManager->commit();

            return true;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Update PricingCod
     * @param PricingCod $pricingCod
     * @param $data
     * @param $user
     * @return PricingCod|bool
     * @throws \Exception
     */
    public function updatePricingCod($pricingCod, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingCod->setFrom($data['from']);
            $pricingCod->setTo($data['to']);
            $pricingCod->setInternalCity($data['internal_city']);
            $pricingCod->setInternalCityRas($data['internal_city_ras']);
            $pricingCod->setExternalCity($data['external_city']);
            $pricingCod->setExternalCityRas($data['external_city_ras']);
            $pricingCod->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingCod->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingCod);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingCod;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove PricingCod
     * @param PricingCod $pricingCod
     * @return PricingCod|bool
     * @throws \Exception
     */
    public function deletePricingCod($pricingCod, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingCod->setIsDeleted(1);
            $pricingCod->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingCod->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingCod);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingCod;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}