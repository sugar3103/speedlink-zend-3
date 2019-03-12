<?php
namespace Management\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\PricingVas;
use Doctrine\ORM\EntityManager;
use Management\Entity\PricingVasSpec;
use mysql_xdevapi\Exception;

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
     * @param $data
     * @param $user
     * @return bool
     * @throws \Doctrine\Common\Persistence\Mapping\MappingException
     */
    public function updateVas($data, $user)
    {
        try {
            // begin transaction
            $this->entityManager->beginTransaction();
            $vasSpec = new PricingVasSpecManager($this->entityManager);

            foreach ($data as $vas) {
                if (empty($vas['id'])) {
                    $vasData = $this->addPricingVas($vas, $user);
                } else if (!empty($vas['id']) && $vas['is_deleted'] == 1) {
                    $vasData = $this->entityManager->getRepository(PricingVas::class)->find($vas['id']);
                    $this->deletePricingVas($vasData, $user);
                } else {
                    $vasData = $this->entityManager->getRepository(PricingVas::class)->find($vas['id']);
                    $this->updatePricingVas($vasData, $vas, $user);
                }

                if ($vasData->getType() == 1 && !empty($vas['spec'])) {
                    $spec = $vas['spec'];
                    if (empty($spec['id'])) {
                        $vasSpec->addPricingVasSpec($vasData, $spec, $user);
                    } else if (!empty($spec['id']) && $spec['is_deleted'] == 1) {
                        $specData = $this->entityManager->getRepository(PricingVasSpec::class)->find($spec['id']);
                        $vasSpec->deletePricingVasSpec($specData, $user);
                    } else {
                        $specData = $this->entityManager->getRepository(PricingVasSpec::class)->find($spec['id']);
                        $vasSpec->updatePricingVasSpec($specData, $spec, $user);
                    }
                }
                $this->entityManager->clear();
            }

            $this->entityManager->commit();
            return true;
        }
        catch (\Exception $e) {
            $this->entityManager->rollback();
            throw new \Exception($e);
        }
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
        try {
            $date = new \DateTime();
            $pricingVas = new PricingVas();
            $pricingVas->setName($data['name']);
            $pricingVas->setFormula($data['formula']);
            $pricingVas->setMin($data['min']);
            $pricingVas->setPricingDataId($data['price_data_id']);
            $pricingVas->setType($data['type']);
            $pricingVas->setCreatedAt($date);
            $pricingVas->setCreatedBy($user->id);
            $pricingVas->setUpdatedAt($date);
            $pricingVas->setUpdatedBy($user->id);
            $this->entityManager->persist($pricingVas);
            $this->entityManager->flush();
            return $pricingVas;
        }
        catch (ORMException $e) {
            throw new ORMException($e);
        }
    }

    /**
     * Update PricingVas
     * @param PricingVas $pricingVas
     * @param $data
     * @param $user
     * @throws \Exception
     */
    public function updatePricingVas($pricingVas, $data, $user)
    {
        try {
            if ($pricingVas->getType() == 1 && $data['type'] != 1) {
                $where = ['pricing_vas_id' => $pricingVas->getId()];
                $pricing_vas_spec = $this->entityManager->getRepository(PricingVasSpec::class)->findBy($where);
                foreach ($pricing_vas_spec as $obj) {
                    $this->entityManager->remove($obj);
                }
            }

            $pricingVas->setName($data['name']);
            $pricingVas->setFormula($data['formula']);
            $pricingVas->setMin($data['min']);
            $pricingVas->setType($data['type']);
            $pricingVas->setUpdatedAt(new \DateTime());
            $pricingVas->setUpdatedBy($user->id);
            $this->entityManager->persist($pricingVas);
            $this->entityManager->flush();
        }
        catch (ORMException $e) {
            throw new ORMException($e);
        }
    }

    /**
     * Remove PricingVas
     * @param PricingVas $pricingVas
     * @param $user
     * @throws \Exception
     */
    public function deletePricingVas($pricingVas, $user)
    {
        try {
            $pricingVas->setIsDeleted(1);
            $pricingVas->setUpdatedAt(new \DateTime());
            $pricingVas->setUpdatedBy($user->id);
            $this->entityManager->persist($pricingVas);
            $this->entityManager->flush();
        }
        catch (ORMException $e) {
            throw new ORMException($e);
        }
    }
}