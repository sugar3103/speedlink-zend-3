<?php
namespace PricingDomestic\Service;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use OAuth\Entity\User;
use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Entity\DomesticPricingData;
use PricingDomestic\Entity\DomesticRangeWeight;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticPricingDataManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * DomesticPricingDataManager constructor.
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
                    $pricingData = $this->entityManager->getRepository(DomesticPricingData::class)->findOneBy(['domestic_range_weight' => $value['range_weight'], 'is_deleted' => 0]);
                    if ($pricingData) {
                        $pricingData->setValue($value['value']);
                        $pricingData->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));

                        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                        $pricingData->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                    } else {
                        $pricingData = new DomesticPricingData();
                        $pricingData->setDomesticPricing($this->entityManager->getRepository(DomesticPricing::class)->find($data['id']));
                        $pricingData->setDomesticRangeWeight($this->entityManager->getRepository(DomesticRangeWeight::class)->find($value['range_weight']));
                        $pricingData->setValue($value['value']);
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
}