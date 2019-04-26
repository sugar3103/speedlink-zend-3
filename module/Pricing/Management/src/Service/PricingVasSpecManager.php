<?php
namespace Management\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingData;
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

    /**
     * Set objects to update and insert
     * @param PricingVasSpec $pricingVasSpec
     * @param $data
     * @throws \Exception
     */
    private function getReferenced(&$pricingVasSpec, $data)
    {
        if (!empty($data['pricing_data_id'])) {
            $pricing_data = $this->entityManager->getRepository(PricingData::class)->find($data['pricing_data_id']);
            if ($pricing_data == null) {
                throw new \Exception('Not found Pricing Data');
            }
            $pricingVasSpec->setJoinPricingData($pricing_data);
        }
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
     * @param $vas 
     * @param $spec
     * @param $user
     * @throws \Exception
     */
    public function addPricingVasSpec($vas, $spec, $user)
    {
        $spec['pricing_data_id'] = $vas->getPricingDataId();
        try {
            $date = new \DateTime();
            $pricingVasSpec = new PricingVasSpec();
            $pricingVasSpec->setPricingDataId($vas->getPricingDataId());
            $pricingVasSpec->setPricingVasId($vas->getId());
            $pricingVasSpec->setFrom($spec['from']);
            $pricingVasSpec->setTo($spec['to']);
            $pricingVasSpec->setValue($spec['value']);
            $pricingVasSpec->setCreatedAt($date);
            $pricingVasSpec->setCreatedBy($user->id);
            $pricingVasSpec->setUpdatedAt($date);
            $pricingVasSpec->setUpdatedBy($user->id);

            $this->getReferenced($pricingVasSpec, $spec);

            $this->entityManager->persist($pricingVasSpec);
            $this->entityManager->flush();
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
            $pricingVasSpec->setPricingDataId($data['pricing_data_id']);
            $pricingVasSpec->setFrom($data['from']);
            $pricingVasSpec->setTo($data['to']);
            $pricingVasSpec->setValue($data['value']);
            $pricingVasSpec->setUpdatedAt(new \DateTime());
            $pricingVasSpec->setUpdatedBy($user->id);

            $this->getReferenced($pricingVasSpec, $data);

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