<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use PricingDomestic\Entity\DomesticPricingVas;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package PricingDomestic\Repository
 */
class DomesticPricingVasRepository extends EntityRepository
{
    public function deletedVas($pricing_id)
    {
        $entityManager = $this->getEntityManager();
        try{
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->update(DomesticPricingVas::class, 'dpv')->set('dpv.is_deleted', 1)
                ->where('dpv.domestic_pricing_id = :domestic_pricing_id')->setParameter("domestic_pricing_id", $pricing_id);            
        } catch (QueryException $e) {
            return [];
        }   
        return $queryBuilder->getQuery()->execute();
    }
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function findOneByPricing(
        $pricing_id,
        $sortField = 'dpv.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                dpv.id,
                dpv.name,
                dpv.name_en,                
                dpv.created_at,
                dpv.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updpted_by                
            ")->andWhere("dpv.is_deleted = 0")
            ->andWhere("dp.id = ". $pricing_id)
            ->groupBy('dpv.id');
            
            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
            }

            return $queryBuilder;
        } catch (QueryException $e) {
            return [];
        }
    }

    /**
     * Build query builder
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param $filters
     * @return QueryBuilder
     * @throws QueryException
     */
    public function buildCustomerQueryBuilder($sortField = 'dp.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'dpv.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'dpv.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'dpv.name_en',
                'operator' => 'contains'
            ],
            
            'created_at' => [
                'alias' => 'dpv.created_at',
                'operator' => 'contains'
            ]
        ];
        
        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticPricingVas::class, 'dpv')        
        ->leftJoin('dpv.domestic_pricing', 'dp')
        ->leftJoin('dpv.created_by', 'cr')
        ->leftJoin('dpv.updated_by', 'up');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('dpv.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}