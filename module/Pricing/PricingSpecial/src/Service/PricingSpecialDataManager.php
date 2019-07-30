<?php
namespace PricingSpecial\Service;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialPricing;
use PricingSpecial\Entity\SpecialPricingData;
use PricingSpecial\Entity\SpecialRangeWeight;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingSpecial\Service
 */
class PricingSpecialDataManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * SpecialPricingDataManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function addPricingData($data, $user)
    {

        if (is_array($data)) {
            foreach ($data['data'] as $value) {
                $this->entityManager->beginTransaction();
                try {
                    $pricingData = $this->entityManager->getRepository(SpecialPricingData::class)->findOneBy(['special_pricing' => $data['id'], 'special_range_weight' => $value['range_weight'], 'is_deleted' => 0]);
                    if ($pricingData) {
                        $pricingData->setValue($value['value']);
                        $pricingData->setReturnType($value['type']);
                        $pricingData->setRetutnValue($value['type_value']);
                        $pricingData->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

                        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                        $pricingData->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                    } else {
                        $pricingData = new SpecialPricingData();
                        $pricingData->setSpecialPricing($this->entityManager->getRepository(SpecialPricing::class)->find($data['id']));
                        $pricingData->setSpecialRangeWeight($this->entityManager->getRepository(SpecialRangeWeight::class)->find($value['range_weight']));
                        $pricingData->setValue($value['value']);
                        $pricingData->setReturnType($value['type']);
                        $pricingData->setReturnValue($value['type_value']);
                        $pricingData->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                        $pricingData->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

                        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                        $pricingData->setCreatedAt($addTime->format('Y-m-d H:i:s'));
                        $pricingData->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                    }

                    $this->entityManager->persist($pricingData);

                    // apply changes to database.
                    $this->entityManager->flush();
                    $this->entityManager->commit();
                } catch (ORMException $e) {
                    $this->entityManager->rollback();
                    return false;
                }
            }
        }
    }

    public function deletePricingData(\PricingSpecial\Entity\SpecialPricing $pricing, $user)
    {
        $pricingDatas = $this->entityManager->getRepository(SpecialPricingData::class)->findBy(['special_pricing' => $pricing->getId(), 'is_deleted' => 0]);
        if ($pricingDatas) {
            foreach ($pricingDatas as $pricingData) {
                $this->entityManager->beginTransaction();
                try {
                    $pricingData->setIsDeleted(1);
                    $pricingData->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                    $this->entityManager->persist($pricingData);

                    // apply changes to database.
                    $this->entityManager->flush();
                    $this->entityManager->commit();
                } catch (ORMException $e) {
                    $this->entityManager->rollback();
                    return false;
                }
            }
        }
    }
}
