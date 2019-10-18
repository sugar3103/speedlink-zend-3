<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use PricingDomestic\Entity\DomesticPricingVasSpec;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package PricingDomestic\Repository
 */
class DomesticPricingVasSpecRepository extends EntityRepository
{
    public function deletedPricingVasSpec($pricing_vas_id)
    {
       
        $entityManager = $this->getEntityManager();
        try{
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->update(DomesticPricingVasSpec::class, 'dpvs')->set('dpvs.is_deleted', 1)
                ->where('dpvs.domestic_pricing_vas = :domestic_pricing_vas_id')->setParameter("domestic_pricing_vas_id", $pricing_vas_id);            
        } catch (QueryException $e) {
            return [];
        }           
        return $queryBuilder->getQuery()->execute();
    }
}