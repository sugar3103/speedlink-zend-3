<?php
namespace Management\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingVas;
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
     * @param $vas PricingVas
     * @param $spec
     * @param $user
     * @throws \Exception
     */
    public function addPricingVasSpec($vas, $spec, $user)
    {
        try {
            $date = new \DateTime();
            foreach ($spec as $row) {
                $pricingVasSpec = new PricingVasSpec();
                $pricingVasSpec->setPricingDataId($vas['price_data_id']);
                $pricingVasSpec->setPricingVasId($vas->getId());
                $pricingVasSpec->setFrom($row['from']);
                $pricingVasSpec->setTo($row['to']);
                $pricingVasSpec->setValue($row['value']);
                $pricingVasSpec->setCreatedAt($date);
                $pricingVasSpec->setCreatedBy($user->id);
                $pricingVasSpec->setUpdatedAt($date);
                $pricingVasSpec->setUpdatedBy($user->id);
                $this->entityManager->persist($pricingVasSpec);
                $this->entityManager->flush();
            }
        }
        catch (ORMException $e) {
            $this->entityManager->rollback();
            throw new ORMException($e);
        }
    }

    /**
     * Update PricingVasSpec
     * @param PricingVasSpec $pricingVasSpec
     * @param $data
     * @param $user
     * @throws \Exception
     */
    public function updatePricingVasSpec($pricingVasSpec, $data, $user)
    {
        try {
            $pricingVasSpec->setPricingDataId($data['price_data_id']);
            $pricingVasSpec->setFrom($data['from']);
            $pricingVasSpec->setTo($data['to']);
            $pricingVasSpec->setValue($data['value']);
            $pricingVasSpec->setUpdatedAt(new \DateTime());
            $pricingVasSpec->setUpdatedBy($user->id);

            $this->entityManager->persist($pricingVasSpec);
            $this->entityManager->flush();
        }
        catch (ORMException $e) {
            throw new ORMException($e);
        }
    }

    /**
     * Remove PricingVasSpec
     * @param PricingVasSpec $pricingVasSpec
     * @param $user
     * @throws \Exception
     */
    public function deletePricingVasSpec($pricingVasSpec, $user)
    {
        try {
            $pricingVasSpec->setIsDeleted(1);
            $pricingVasSpec->setUpdatedAt(new \DateTime());
            $pricingVasSpec->setUpdatedBy($user->id);
            $this->entityManager->persist($pricingVasSpec);
            $this->entityManager->flush();
        }
        catch (ORMException $e) {
            throw new ORMException($e);
        }
    }

}