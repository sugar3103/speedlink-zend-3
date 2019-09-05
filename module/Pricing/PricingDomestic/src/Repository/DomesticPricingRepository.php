<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\NonUniqueResultException;
use PricingDomestic\Entity\DomesticPricing;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use PricingDomestic\Entity\DomesticPricingData;

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
                c.id as category_id,
                c.name as category,
                c.name_en as category_en,
                ca.id as carrier_id,
                ca.name as carrier,
                ca.name_en as carrier_en,
                cu.id as customer_id,
                cu.name as customer,                
                s.id as service_id,
                s.name as service,
                s.name_en as service_en,
                sm.id as saleman_id,
                sm.username as saleman,
                ap.id as approval_by,
                ap.username as approval_by_name,
                dp.is_private,
                dp.status,
                dp.approval_status,
                dp.effected_date,
                dp.expired_date,
                dp.created_at,
                dp.updated_at,
                dp.total_ras,
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
            'customer_id' => [
                'alias' => 'cu.id',
                'operator' => 'eq'
            ],
            'saleman_id' => [
                'alias' => 'sm.id',
                'operator' => 'eq'
            ],
            'category_id' => [
                'alias' => 'c.id',
                'operator' => 'eq'
            ],
            'carrier_id' => [
                'alias' => 'ca.id',
                'operator' => 'eq'
            ],
            'service_id' => [
                'alias' => 's.id',
                'operator' => 'eq'
            ],
            'status' => [
                'alias' => 'dp.status',
                'operator' => 'eq'
            ],
            'is_private' => [
                'alias' => 'dp.is_private',
                'operator' => 'eq'
            ],
            'approval_status' => [
                'alias' => 'dp.approval_status',
                'operator' => 'eq'
            ],
            'approved_by' => [
                'alias' => 'ap.id',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'dp.created_at',
                'operator' => 'contains'
            ]
        ];
        
        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticPricing::class, 'dp')        
        ->leftJoin('dp.category', 'c')
        ->leftJoin('dp.customer','cu')
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

    public function getPriceId($where) {
        try {
            $queryBuilder = $this->getEntityManager()->createQueryBuilder();
            $queryBuilder->select('dp.id, dp.total_ras, dp.is_private')
                ->from(DomesticPricing::class, 'dp')
                ->where('dp.is_deleted = 0')
                ->andWhere('dp.status = 1')
                ->andWhere('dp.approval_status = 1')
                ->andWhere('dp.effected_date <= :today')
                ->andWhere('dp.expired_date >= :today')
                ->andWhere('dp.carrier = :carrier_id')
                ->andWhere('dp.category = :category_id')
                ->andWhere('dp.service = :service_id');
            if (!empty($where['customer_id'])) {
                $queryBuilder->andWhere('dp.is_private = 1')
                    ->andWhere('dp.customer = :customer_id');
            } else {
                $queryBuilder->andWhere('dp.is_private = 0');
            }
            $queryBuilder->orderBy('dp.name', 'desc')
                ->setParameters($where);

            return $queryBuilder->getQuery()->getOneOrNullResult();
        } catch (QueryException $e) {
            return [];
        } catch (NonUniqueResultException $e) {
            return [];
        }
    }
}