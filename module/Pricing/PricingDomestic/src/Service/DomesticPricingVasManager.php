<?php
namespace PricingDomestic\Service;

use PricingDomestic\Entity\DomesticPricingVas;
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
class DomesticPricingVasManager {

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

        $ormPricingVas = $this->entityManager->getRepository(DomesticPricingVas::class)->findBy(['domestic_pricing' => $pricing->getId()]);
        if($ormPricingVas){
            foreach ($ormPricingVas as $vas) {
                $vasSpec = [];
                if($vas->getType() == 1) {
                    $pricingVasSpecs = $this->entityManager->getRepository(DomesticPricingVasSpec::class)->findBy([
                        'domestic_pricing' => $pricing,
                        'domestic_pricing_vas'=> $vas
                    ]);

                    if($pricingVasSpecs) {
                        foreach ($pricingVasSpecs as $pricingVasSpec ) {
                            $vasSpec[] = array(
                                'form' => $pricingVasSpec->getFrom(),
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
        if (is_array($data)) {
            foreach ($data['data'] as $value) {
                $this->entityManager->beginTransaction();
                try {

                } catch (ORMException $e) {
                    $this->entityManager->rollback();
                    return false;
                }
            }
        }
    }

    public function deletedPricingVas(\PricingDomestic\Entity\DomesticPricing $pricing)
    {
        $this->entityManager->getRepository(DomesticPricingVas::class)->deleteVas($pricing->getId());
    }
}