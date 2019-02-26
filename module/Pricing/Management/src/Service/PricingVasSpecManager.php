<?php
namespace Management\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingVasSpec;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class PricingVasSpecManager {

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

    public function getListVasSpecByCondition($filters)
    {
        $pricingVasSpecList = [];
        $ormVasSpec = $this->entityManager->getRepository(PricingVasSpec::class)->getListVasSpecByCondition($filters);
        if($ormVasSpec){
            $ormPaginator = new ORMPaginator($ormVasSpec, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingVasSpecList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingVasSpecList;
    }

    /**
     * Add PricingVasSpec
     * @param $data
     * @param $user
     * @return PricingVasSpec|bool
     * @throws \Exception
     */
    public function addPricingVasSpec($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingVasSpec = new PricingVasSpec();
            $pricingVasSpec->setPricingDataId($data['price_data_id']);
            $pricingVasSpec->setFrom($data['from']);
            $pricingVasSpec->setTo($data['to']);
            $pricingVasSpec->setValue($data['value']);
            $pricingVasSpec->setCreatedAt(date('Y-m-d H:i:s'));
            $pricingVasSpec->setCreatedBy($user->id);
            $pricingVasSpec->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingVasSpec->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingVasSpec);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingVasSpec;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Update PricingVasSpec
     * @param PricingVasSpec $pricingVasSpec
     * @param $data
     * @param $user
     * @return PricingVasSpec|bool
     * @throws \Exception
     */
    public function updatePricingVasSpec($pricingVasSpec, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingVasSpec->setPricingDataId($data['price_data_id']);
            $pricingVasSpec->setFrom($data['from']);
            $pricingVasSpec->setTo($data['to']);
            $pricingVasSpec->setValue($data['value']);
            $pricingVasSpec->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingVasSpec->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingVasSpec);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingVasSpec;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove PricingVasSpec
     * @param PricingVasSpec $pricingVasSpec
     * @return PricingVasSpec|bool
     * @throws \Exception
     */
    public function deletePricingVasSpec($pricingVasSpec, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingVasSpec->setIsDeleted(1);
            $pricingVasSpec->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingVasSpec->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingVasSpec);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingVasSpec;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

}