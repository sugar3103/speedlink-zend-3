<?php
namespace PricingSpecial\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query\QueryException;
use PricingSpecial\Entity\SpecialZone;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class SpecialZoneRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListSpecialZoneByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'sz.id',
        $sortDirection = 'asc',
        $filters = []
    ) {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                sz.id,
                sz.name,
                sz.name_en,
                sz.created_at,
                sz.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_upscted,
                up.username as upscted_by
            ")->andWhere("sz.is_deleted = 0")
                ->groupBy('sz.id');

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
    public function buildCustomerQueryBuilder($sortField = 'sz.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'sz.id',
                'operator' => 'eq',
            ],
            'name' => [
                'alias' => 'sz.name',
                'operator' => 'contains',
            ],
            'name_en' => [
                'alias' => 'sz.name_en',
                'operator' => 'contains',
            ],

            'created_at' => [
                'alias' => 'sz.created_at',
                'operator' => 'contains',
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(SpecialZone::class, 'sz')
            ->leftJoin('sz.created_by', 'cr')
            ->leftJoin('sz.updated_by', 'up');

        if ($sortField != null && $sortDirection != null) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('sc.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}
