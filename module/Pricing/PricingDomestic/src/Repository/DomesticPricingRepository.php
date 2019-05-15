<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use PricingDomestic\Entity\DomesticPricing;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package PricingDomestic\Repository
 */
class DomesticPricingRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListDomesticPricingByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'dp.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                dp.id,
                dp.name,
                dp.name_en,
                c.id as category_id,
                ca.id as carrier_id,
                s.id as service_id,
                sm.id as saleman_id,
                ap.id as approval_by,
                dp.approval_status,
                dp.effected_date,
                dp.expired_date,
                dp.created_at,
                dp.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updpted_by                
            ")->andWhere("dp.is_deleted = 0")
            ->groupBy('dp.id');
            
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
                'alias' => 'dp.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'dp.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'dp.name_en',
                'operator' => 'contains'
            ],
            
            'created_at' => [
                'alias' => 'dp.created_at',
                'operator' => 'contains'
            ]
        ];
        
        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticPricing::class, 'dp')        
        ->leftJoin('dp.category', 'c')
        ->leftJoin('dp.service', 's')
        ->leftJoin('dp.carrier', 'ca')
        ->leftJoin('dp.saleman', 'sm')
        ->leftJoin('dp.approval_by', 'ap')
        ->leftJoin('dp.created_by', 'cr')
        ->leftJoin('dp.updated_by', 'up');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('dp.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}