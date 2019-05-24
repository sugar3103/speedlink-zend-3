<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticPricingVas;
use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Entity\DomesticPricingVasSpec;
use PricingDomestic\Servivce\DomesticPricingVasCityManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Zend\Crypt\Password\Bcrypt;
use Zend\Math\Rand;
use Zend\View\Renderer\PhpRenderer;
use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;
use Zend\Mail\Message;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Zend\Authentication\Result;
use Core\Utils\Utils;
use OAuth\Entity\User;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticPricingVasManager
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
     * Get List Domestic PricingVas By Condition
     */

    public function getListDomesticPricingVas(\PricingDomestic\Entity\DomesticPricing $pricing)
    {
        $pricingVas = [];
        $totalPricingVas = 0;

        $ormPricingVas = $this->entityManager->getRepository(DomesticPricingVas::class)->findBy(['domestic_pricing' => $pricing->getId(),'is_deleted' => 0]);
        if ($ormPricingVas) {
            foreach ($ormPricingVas as $vas) {
                $vasSpec = [];
                if ($vas->getType() == 1) {
                    $pricingVasSpecs = $this->entityManager->getRepository(DomesticPricingVasSpec::class)->findBy([
                        'domestic_pricing' => $pricing,
                        'domestic_pricing_vas' => $vas,
                        'is_deleted' => 0
                    ]);

                    if ($pricingVasSpecs) {
                        foreach ($pricingVasSpecs as $pricingVasSpec) {
                            $vasSpec[] = array(
                                'id' => $pricingVasSpec->getId(),
                                'from' => $pricingVasSpec->getFrom(),
                                'to' => $pricingVasSpec->getTo(),
                                'value' => $pricingVasSpec->getValue()
                            );
                        }
                    }
                }


                $pricingVas[] = array(
                    'id' => $vas->getId(),
                    'name' => $vas->getName(),
                    'name_en' => $vas->getNameEn(),
                    'formula' => $vas->getFormula(),
                    'min'       => $vas->getMin(),
                    'type'  => $vas->getType(),
                    'spec'  => $vasSpec
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
                    $pricingVas = $this->entityManager->getRepository(DomesticPricingVas::class)->findOneBy([
                        'id'    => $vas['id'],
                        'domestic_pricing' => $data['id']
                    ]);
                    if ($pricingVas) {
                        $pricingVas->setIsDeleted(0);
                        $pricingVas->setUpdatedBy($userData);
                        $pricingVas->setUpdatedAt($dateNow);
                    } else {
                        $pricingVas = new DomesticPricingVas();
                        $pricingVas->setCreatedBy($userData);
                        $pricingVas->setCreatedAt($dateNow);
                        $pricingVas->setUpdatedBy($userData);
                        $pricingVas->setUpdatedAt($dateNow);
                        $pricingVas->setDomesticPricing($this->entityManager->getRepository(DomesticPricing::class)->find($data['id']));
                    }

                    $pricingVas->setName($vas['name']);
                    $pricingVas->setNameEn($vas['name']);
                    $pricingVas->setMin($vas['min']);
                    $pricingVas->setFormula($vas['formula']);
                    $pricingVas->setType($vas['type']);

                    $this->entityManager->persist($pricingVas);

                    $this->entityManager->flush();

                    $this->entityManager->commit();

                    $this->entityManager->getRepository(DomesticPricingVasSpec::class)->deletedPricingVasSpec($pricingVas->getId());                    
                    if (isset($vas['spec']) && is_array($vas['spec'])) {
                        foreach ($vas['spec'] as $spec) {
                            $this->entityManager->beginTransaction();
                            try {
                                $vasSpec = $this->entityManager->getRepository(DomesticPricingVasSpec::class)->findOneBy([
                                    'id'    => $spec['id'],
                                    'domestic_pricing' => $data['id'],
                                    'domestic_pricing_vas' => $pricingVas->getId()
                                ]);
                                if ($vasSpec) {
                                    //Updated
                                    $vasSpec->setUpdatedBy($userData);
                                    $vasSpec->setUpdatedAt($dateNow);
                                } else {
                                    $vasSpec = new DomesticPricingVasSpec();
                                    $vasSpec->setDomesticPricing($this->entityManager->getRepository(DomesticPricing::class)->find($data['id']));
                                    $vasSpec->setDomesticPricingVas($pricingVas);                                    
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

    public function deletedPricingVas(\PricingDomestic\Entity\DomesticPricing $pricing)
    {
        $this->entityManager->getRepository(DomesticPricingVas::class)->deletedVas($pricing->getId());
    }
}
