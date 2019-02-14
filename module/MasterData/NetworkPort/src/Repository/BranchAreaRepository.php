<?php
namespace NetworkPort\Repository;

use Core\Utils\Utils;
use NetworkPort\Entity\BranchArea;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class BranchAreaRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListBranchAreaByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'b.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildBranchAreaQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                ba.id,
                ba.status,
                ba.created_at,
                ba.created_by,
                ba.updated_at,
                ba.updated_by,
                ba.branch_id,
                ba.hub_id,
                ba.country_id,
                ba.city_id,
                ba.district_id,
                ba.ward_id,
                b.name AS branch_name,
                b.name_en AS branch_name_en,
                b.code AS branch_code,
                h.name AS hub_name,
                h.code AS hub_code,
                d.name AS district,
                c.name AS city,
                w.name AS ward,
                co.name AS country
            ")->andWhere("ba.is_deleted = 0")
            ->groupBy('ba.id');
            
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
    public function buildBranchAreaQueryBuilder($sortField = 'ba.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'branch' => [
                'alias' => 'ba.branch_id',
                'operator' => 'eq'
            ],
            'hub' => [
                'alias' => 'ba.hub_id',
                'operator' => 'eq'
            ],
            'country' => [
                'alias' => 'ba.country_id',
                'operator' => 'eq'
            ],
            'city' => [
                'alias' => 'ba.city_id',
                'operator' => 'eq'
            ],
            'district' => [
                'alias' => 'ba.district_id',
                'operator' => 'eq'
            ],
            'ward' => [
                'alias' => 'ba.ward_id',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'ba.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'ba.status',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 'b.code',
                'operator' => 'contains'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(BranchArea::class, 'ba')
        ->leftJoin('ba.hub', 'h')
        ->leftJoin('ba.branch', 'b')
        ->leftJoin('ba.district', 'd')
        ->leftJoin('ba.city', 'c')
        ->leftJoin('ba.ward', 'w')
        ->leftJoin('ba.country', 'co');
        // ->groupBy('b.id')
        // ->where('b.deletedAt is null')
        // ->andWhere('b.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('ba.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}