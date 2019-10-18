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
                b.name_en,
                b.status,
                b.created_at,
                b.updated_at,
                b.hub_id,
                b.district_id,
                b.city_id,
                b.ward_id,
                b.country_id,
                h.name AS hub_name,
                h.code AS hub_code,
                co.name AS country,
                co.name_en AS country_en,
                c.name AS city,
                c.name_en AS city_en,
                d.name AS district,
                d.name_en AS district_en,
                w.name AS ward,
                w.name_en AS ward_en,
                b.description,
                b.description_en,
                uc.username AS created_by,
                ud.username AS updated_by,
                CONCAT(COALESCE(uc.first_name,''), ' ', COALESCE(uc.last_name,'')) as full_name_created,
                CONCAT(COALESCE(ud.first_name,''), ' ', COALESCE(ud.last_name,'')) as full_name_updated  
            ")->andWhere("h.is_deleted = 0")
            ->groupBy('b.id');
            
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
    public function buildBranchQueryBuilder($sortField = 'b.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'b.id',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 'b.code',
                'operator' => 'contains'
            ],
            'name' => [
                'alias' => 'b.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'b.name_en',
                'operator' => 'contains'
            ],
            'hub' => [
                'alias' => 'b.hub_id',
                'operator' => 'eq'
            ],
            'district' => [
                'alias' => 'b.district_id',
                'operator' => 'eq'
            ],
            'ward' => [
                'alias' => 'b.ward_id',
                'operator' => 'eq'
            ],
            'city' => [
                'alias' => 'b.city_id',
                'operator' => 'eq'
            ],
            'country' => [
                'alias' => 'b.country_id',
                'operator' => 'eq'
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
        ->leftJoin('b.hub', 'h')
        ->leftJoin('h.user_create', 'uc')
        ->leftJoin('h.user_update', 'ud');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('b.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}