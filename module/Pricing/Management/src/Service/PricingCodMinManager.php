<?php
namespace Management\Service;

use Core\Utils\Utils;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingCodMin;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingCodMinManager {

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

    public function getListCodMinByCondition($filters)
    {
        $pricingCodMinList = [];
        $ormCodMin = $this->entityManager->getRepository(PricingCodMin::class)->getListCodMinByCondition($filters);
        if($ormCodMin){
            $ormPaginator = new ORMPaginator($ormCodMin, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingCodMinList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingCodMinList;
    }

    /**
     * Add PricingCodMin
     * @param $data
     * @param $user
     * @return PricingCodMin|bool
     * @throws \Exception
     */
    public function addPricingCodMin($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $date = date('Y-m-d H:i:s');
            $pricingCodMin = new PricingCodMin();
            $pricingCodMin->setInternalCityMin($data['internal_city_min']);
            $pricingCodMin->setInternalCityRasMin($data['internal_city_ras_min']);
            $pricingCodMin->setExternalCityMin($data['external_city_min']);
            $pricingCodMin->setExternalCityRasMin($data['external_city_ras_min']);
            $pricingCodMin->setCreatedAt($date);
            $pricingCodMin->setCreatedBy($user->id);
            $pricingCodMin->setUpdatedAt($date);
            $pricingCodMin->setUpdatedBy($user->id);
            $this->entityManager->persist($pricingCodMin);
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
     * Update PricingCodMin
     * @param PricingCodMin $pricingCodMin
     * @param $data
     * @param $user
     * @return PricingCodMin|bool
     * @throws \Exception
     */
    public function updatePricingCodMin($pricingCodMin, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingCodMin->setInternalCityMin($data['internal_city_min']);
            $pricingCodMin->setInternalCityRasMin($data['internal_city_ras_min']);
            $pricingCodMin->setExternalCityMin($data['external_city_min']);
            $pricingCodMin->setExternalCityRasMin($data['external_city_ras_min']);
            $pricingCodMin->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingCodMin->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingCodMin);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingCodMin;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove PricingCodMin
     * @param PricingCodMin $pricingCodMin
     * @return PricingCodMin|bool
     * @throws \Exception
     */
    public function deletePricingCodMin($pricingCodMin, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingCodMin->setIsDeleted(1);
            $pricingCodMin->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingCodMin->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingCodMin);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingCodMin;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}