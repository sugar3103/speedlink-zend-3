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
        $start = 1,
        $limit = 10,
        $sortField = 'b.id',
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
                b.district_id,
                b.city_id,
                b.ward_id,
                b.country_id,
                h.name AS hub_name,
                d.name AS district,
                c.name AS city,
                w.name AS ward,
                co.name AS country,
                b.description
            ")->groupBy('b.id')
            ->setMaxResults($limit)
            ->setFirstResult(($start - 1) * $limit);

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
                'alias' => 'b.code',
                'operator' => 'contains'
            ],
            'name' => [
                'alias' => 'b.name',
                'operator' => 'contains'
            ],
            'hub' => [
                'alias' => 'h.name',
                'operator' => 'contains'
            ],
            'district' => [
                'alias' => 'd.name',
                'operator' => 'contains'
            ],
            'ward' => [
                'alias' => 'w.name',
                'operator' => 'contains'
            ],
            'city' => [
                'alias' => 'c.name',
                'operator' => 'contains'
            ],
            'country' => [
                'alias' => 'co.name',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'b.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'b.status',
                'operator' => 'eq'
            ]
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