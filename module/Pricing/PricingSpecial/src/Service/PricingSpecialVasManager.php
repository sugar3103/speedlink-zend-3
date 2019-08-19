<?php
namespace PricingSpecial\Service;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use OAuth\Entity\User;
use PricingSpecial\Entity\SpecialPricing;
use PricingSpecial\Entity\SpecialPricingVas;
use PricingSpecial\Entity\SpecialPricingVasSpec;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingSpecial\Service
 */
class PricingSpecialVasManager
{

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
     * Get List Special PricingVas By Condition
     */

    public function getListSpecialPricingVas(\PricingSpecial\Entity\SpecialPricing $pricing)
    {
        $pricingVas = [];
        $totalPricingVas = 0;

        $ormPricingVas = $this->entityManager->getRepository(SpecialPricingVas::class)->findBy(['special_pricing' => $pricing->getId(), 'is_deleted' => 0]);
        if ($ormPricingVas) {
            foreach ($ormPricingVas as $vas) {
                $vasSpec = [];
                if ($vas->getType() == 1) {
                    $pricingVasSpecs = $this->entityManager->getRepository(SpecialPricingVasSpec::class)->findBy([
                        'special_pricing' => $pricing,
                        'special_pricing_vas' => $vas,
                        'is_deleted' => 0,
                    ]);

                    if ($pricingVasSpecs) {
                        foreach ($pricingVasSpecs as $pricingVasSpec) {
                            $vasSpec[] = array(
                                'id' => $pricingVasSpec->getId(),
                                'from' => $pricingVasSpec->getFrom(),
                                'to' => $pricingVasSpec->getTo(),
                                'value' => $pricingVasSpec->getValue(),
                            );
                        }
                    }
                }

                $pricingVas[] = array(
                    'id' => $vas->getId(),
                    'name' => $vas->getName(),
                    'formula' => $vas->getFormula(),
                    'min' => $vas->getMin(),
                    'type' => $vas->getType(),
                    'spec' => $vasSpec,
                );
            }
        }

        $dataPricingVas = [
            'listPricingVas' => $pricingVas,
            'totalPricingVas' => $totalPricingVas,
        ];

        return $dataPricingVas;
    }

    public function addPricingVas($data, $user)
    {
        $userData = $this->entityManager->getRepository((User::class))->find($user->id);
        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
        $dateNow = $addTime->format('Y-m-d H:i:s');
        
        if (is_array($data)) {
            foreach ($data['data'] as $vas) {
                $this->entityManager->beginTransaction();
                try {
                    $pricingVas = $this->entityManager->getRepository(SpecialPricingVas::class)->findOneBy([
                        'id' => $vas['id'],
                        'special_pricing' => $data['id'],
                    ]);
                   
                    if ($pricingVas) {
                        $pricingVas->setIsDeleted(0);
                        $pricingVas->setUpdatedBy($userData);
                        $pricingVas->setUpdatedAt($dateNow);
                    } else {
                        $pricingVas = new SpecialPricingVas();
                        $pricingVas->setCreatedBy($userData);
                        $pricingVas->setCreatedAt($dateNow);
                        $pricingVas->setUpdatedBy($userData);
                        $pricingVas->setUpdatedAt($dateNow);
                        $pricingVas->setSpecialPricing($this->entityManager->getRepository(SpecialPricing::class)->find($data['id']));
                    }

                    $pricingVas->setName($vas['name']);                    
                    $pricingVas->setMin($vas['min']);
                    $pricingVas->setFormula($vas['formula']);
                    $pricingVas->setType($vas['type']);

                    $this->entityManager->persist($pricingVas);

                    $this->entityManager->flush();

                    $this->entityManager->commit();

                    $this->entityManager->getRepository(SpecialPricingVasSpec::class)->deletedPricingVasSpec($pricingVas->getId());
                    if (isset($vas['spec']) && is_array($vas['spec'])) {
                        foreach ($vas['spec'] as $spec) {
                            $this->entityManager->beginTransaction();
                            try {
                                $vasSpec = $this->entityManager->getRepository(SpecialPricingVasSpec::class)->findOneBy([
                                    'id' => $spec['id'],
                                    'special_pricing' => $data['id'],
                                    'special_pricing_vas' => $pricingVas->getId(),
                                ]);
                                if ($vasSpec) {
                                    //Updated
                                    $vasSpec->setUpdatedBy($userData);
                                    $vasSpec->setUpdatedAt($dateNow);
                                } else {
                                    $vasSpec = new SpecialPricingVasSpec();
                                    $vasSpec->setSpecialPricing($this->entityManager->getRepository(SpecialPricing::class)->find($data['id']));
                                    $vasSpec->setSpecialPricingVas($pricingVas);
                                    //Created
                                    $vasSpec->setCreatedBy($userData);
                                    $vasSpec->setCreatedAt($dateNow);

                                    $vasSpec->setUpdatedBy($userData);
                                    $vasSpec->setUpdatedAt($dateNow);
                                }

                                $vasSpec->setFrom($spec['from']);
                                $vasSpec->setTo($spec['to']);
                                $vasSpec->setValue($spec['value']);
                                $vasSpec->setIsDeleted(0);

                                $this->entityManager->persist($vasSpec);

                                // // apply changes to database.
                                $this->entityManager->flush();
                                $this->entityManager->commit();
                            } catch (ORMException $e) {
                                $this->entityManager->rollback();
                            }
                        }
                    }
                } catch (ORMException $e) {
                    $this->entityManager->rollback();
                    return false;
                }
            }
        }
    }

    public function deletedPricingVas(\PricingSpecial\Entity\SpecialPricing $pricing)
    {
        //Deleted Vas Spec
        $pricingVas = $this->entityManager->getRepository(SpecialPricingVas::class)->findBy([
            'special_pricing' => $pricing,
            'is_deleted' => 0
        ]);
        if($pricingVas) {
            foreach ($pricingVas as $vas) {
                $this->entityManager->getRepository(SpecialPricingVasSpec::class)->deletedPricingVasSpec($vas->getId());
            }
        }
        $this->entityManager->getRepository(SpecialPricingVas::class)->deletedVas($pricing->getId());
    }
}
