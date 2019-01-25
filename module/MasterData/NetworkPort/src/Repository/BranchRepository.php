<?php
namespace NetworkPort\Repository;

use Core\Utils\Utils;
use NetworkPort\Entity\Branch;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class BranchRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListBranchByCondition(
        $start = 0,
        $limit = 10,
        $sortField = 'u.branchId',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildBranchQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                b.id,
                b.code,
                b.name,
                b.status,
                b.created_at,
                b.created_by,
                b.updated_at,
                b.updated_by,
                b.hub_id,
                h.name AS hub_name,
                d.name AS district,
                c.name AS city,
                w.name AS ward,
                co.name AS country,
                b.description
            ")->where('b.is_deleted = 0');

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
    public function buildBranchQueryBuilder($sortField = 'b.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'code' => [
                'alias' => 'u.code',
                'operator' => 'contains'
            ],
            'name' => [
                'alias' => 'u.name',
                'operator' => 'contains'
            ],
            'branch_id' => [
                'alias' => 'b.id',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'b.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'b.status',
                'operator' => 'eq'
            ],
            'country' => [
                'alias' => 'b.country',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Branch::class, 'b')
        ->leftJoin('b.district', 'd')
        ->leftJoin('b.city', 'c')
        ->leftJoin('b.ward', 'w')
        ->leftJoin('b.country', 'co')
        ->leftJoin('b.hub', 'h');
        // ->groupBy('b.id')
        // ->where('b.deletedAt is null')
        // ->andWhere('b.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('b.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}