<?php
namespace PricingSpecial\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query\QueryException;
use PricingSpecial\Entity\SpecialPricing;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class PricingSpecialRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListSpecialPricingByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'sp.id',
        $sortDirection = 'asc',
        $filters = []
    ) {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                sp.id,
                sp.name,
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
                ap.id as approved_by,
                ap.username as approved_by_name,
                sp.status,
                sp.approval_status,
                sp.effected_date,
                sp.expired_date,
                sp.created_at,
                sp.updated_at,
                sp.total_ras,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as upspted_by
            ")->andWhere("sp.is_deleted = 0")
                ->groupBy('sp.id');

            if ($limit) {
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
    public function buildCustomerQueryBuilder($sortField = 'sp.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'sp.id',
                'operator' => 'eq',
            ],
            'name' => [
                'alias' => 'sp.name',
                'operator' => 'contains',
            ],
            'customer_id' => [
                'alias' => 'cu.id',
                'operator' => 'eq',
            ],
            'saleman_id' => [
                'alias' => 'sm.id',
                'operator' => 'eq',
            ],
            'category_id' => [
                'alias' => 'c.id',
                'operator' => 'eq',
            ],
            'carrier_id' => [
                'alias' => 'ca.id',
                'operator' => 'eq',
            ],
            'service_id' => [
                'alias' => 's.id',
                'operator' => 'eq',
            ],
            'status' => [
                'alias' => 'sp.status',
                'operator' => 'eq',
            ],
            'is_private' => [
                'alias' => 'sp.is_private',
                'operator' => 'eq',
            ],
            'approval_status' => [
                'alias' => 'sp.approval_status',
                'operator' => 'eq',
            ],
            'approved_by' => [
                'alias' => 'ap.id',
                'operator' => 'eq',
            ],
            'created_at' => [
                'alias' => 'sp.created_at',
                'operator' => 'contains',
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(SpecialPricing::class, 'sp')
            ->leftJoin('sp.category', 'c')
            ->leftJoin('sp.customer', 'cu')
            ->leftJoin('sp.service', 's')
            ->leftJoin('sp.carrier', 'ca')
            ->leftJoin('sp.saleman', 'sm')
            ->leftJoin('sp.approved_by', 'ap')
            ->leftJoin('sp.created_by', 'cr')
            ->leftJoin('sp.updated_by', 'up');

        if ($sortField != null && $sortDirection != null) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('sp.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

    public function getPriceId($where)
    {
        try {
            $queryBuilder = $this->getEntityManager()->createQueryBuilder();
            $queryBuilder->select('sp.id, sp.total_ras')
                ->from(SpecialPricing::class, 'sp')
                ->where('sp.is_deleted = 0')
                ->andWhere('sp.status = 1')
                ->andWhere('sp.approval_status = 1')
                ->andWhere('sp.effected_date <= :today')
                ->andWhere('sp.expired_date >= :today')
                ->andWhere('sp.carrier = :carrier_id')
                ->andWhere('sp.category = :category_id')
                ->andWhere('sp.service = :service_id')
                ->andWhere('sp.customer = :customer_id');

            $queryBuilder->orderBy('sp.name', 'desc')
                ->setParameters($where);

            return $queryBuilder->getQuery()->execute();
        } catch (QueryException $e) {
            return [];
        }
    }
}
