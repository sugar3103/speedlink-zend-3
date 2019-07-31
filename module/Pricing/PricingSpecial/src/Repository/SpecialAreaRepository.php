<?php
namespace PricingSpecial\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query\QueryException;
use PricingSpecial\Entity\SpecialArea;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class SpecialAreaRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListSpecialAreaByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'sc.id',
        $sortDirection = 'asc',
        $filters = []
    ) {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                sc.id,
                sc.name,
                c.id as customer_id,
                c.name as customer_name,
                c.name_en as customer_name_en,
                sc.created_at,
                sc.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updated_by
            ")->andWhere("sc.is_deleted = 0")
                ->groupBy('sc.id');

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
    public function buildCustomerQueryBuilder($sortField = 'sc.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'sc.id',
                'operator' => 'eq',
            ],
            'name' => [
                'alias' => 'sc.name',
                'operator' => 'contains',
            ],
            "customer" => [
                'alias' => 'c.id',
                'operator' => 'eq',
            ],

            'created_at' => [
                'alias' => 'sc.created_at',
                'operator' => 'contains',
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(SpecialArea::class, 'sc')
            ->leftJoin('sc.customer', 'c')
            ->leftJoin('sc.created_by', 'cr')
            ->leftJoin('sc.updated_by', 'up');

        if ($sortField != null && $sortDirection != null) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('sc.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}
