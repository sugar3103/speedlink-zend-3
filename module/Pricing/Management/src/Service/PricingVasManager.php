<?php
namespace Management\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingVas;
use Doctrine\ORM\EntityManager;
use Management\Entity\PricingVasSpec;

/**
 * @package Managerment\Service
 */
class PricingVasManager {

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

    /**
     * Get list VAS
     * @param $filters
     * @return array
     */
    public function getListVasByCondition($filters)
    {
        $pricingVasList = [];
        $ormVas = $this->entityManager->getRepository(PricingVas::class)->getListVasByCondition($filters);
        if($ormVas){
            $ormPaginator = new ORMPaginator($ormVas, true);
            $ormPaginator->setUseOutputWalkers(false);
            $pricingVasList = $ormPaginator->getIterator()->getArrayCopy();
        }
        return $pricingVasList;
    }

    /**
     * Add PricingVas
     * @param $data
     * @param $user
     * @return PricingVas|bool
     * @throws \Exception
     */
    public function addPricingVas($data, $user)
    {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $date = date('Y-m-d H:i:s');
            foreach ($data as $vas) {
                $pricingVas = new PricingVas();
                $pricingVas->setName($vas['name']);
                $pricingVas->setFormula($vas['formula']);
                $pricingVas->setMin($vas['min']);
                $pricingVas->setPricingDataId($vas['price_data_id']);
                $pricingVas->setType($vas['type']);
                $pricingVas->setCreatedAt($date);
                $pricingVas->setCreatedBy($user->id);
                $pricingVas->setUpdatedAt($date);
                $pricingVas->setUpdatedBy($user->id);
                $this->entityManager->persist($pricingVas);
                $this->entityManager->flush();
                if ($vas['type'] == '1' && !empty($vas['spec'])) {
                    foreach ($vas['spec'] as $row) {
                        $pricingVasSpec = new PricingVasSpec();
                        $pricingVasSpec->setPricingDataId($vas['price_data_id']);
                        $pricingVasSpec->setPricingVasId($pricingVas->getId());
                        $pricingVasSpec->setFrom($row['from']);
                        $pricingVasSpec->setTo($row['to']);
                        $pricingVasSpec->setValue($row['value']);
                        $pricingVasSpec->setCreatedAt($date);
                        $pricingVasSpec->setCreatedBy($user->id);
                        $pricingVasSpec->setUpdatedAt($date);
                        $pricingVasSpec->setUpdatedBy($user->id);
                        $this->entityManager->persist($pricingVasSpec);
                    }
                    $this->entityManager->flush();
                    $this->entityManager->clear();
                }
            }
            $this->entityManager->commit();

            return true;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Update PricingVas
     * @param PricingVas $pricingVas
     * @param $data
     * @param $user
     * @return PricingVas|bool
     * @throws \Exception
     */
    public function updatePricingVas($pricingVas, $data, $user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingVas->setName($data['name']);
            $pricingVas->setFormula($data['formula']);
            $pricingVas->setMin($data['min']);
            $pricingVas->setPricingDataId($data['price_data_id']);
            $pricingVas->setType($data['type']);
            $pricingVas->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingVas->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingVas);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingVas;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Remove PricingVas
     * @param PricingVas $pricingVas
     * @return PricingVas|bool
     * @throws \Exception
     */
    public function deletePricingVas($pricingVas, $user) {
        // begin transaction
        $this->entityManager->beginTransaction();
        try {
            $pricingVas->setIsDeleted(1);
            $pricingVas->setUpdatedAt(date('Y-m-d H:i:s'));
            $pricingVas->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingVas);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $pricingVas;
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            return FALSE;
        }
    }
}