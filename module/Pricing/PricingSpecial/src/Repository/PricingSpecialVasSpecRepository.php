<?php
namespace PricingSpecial\Repository;

use Core\Utils\Utils;
use PricingSpecial\Entity\SpecialPricingVasSpec;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class PricingSpecialVasSpecRepository extends EntityRepository
{
    public function deletedPricingVasSpec($pricing_id)
    {
       
        $entityManager = $this->getEntityManager();
        try{
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->update(SpecialPricingVasSpec::class, 'spvs')->set('spvs.is_deleted', 1)
                ->where('spvs.special_pricing = :special_pricing_id')->setParameter("special_pricing_id", $pricing_id);            
        } catch (QueryException $e) {
            return [];
        }           
        return $queryBuilder->getQuery()->execute();
    }
}