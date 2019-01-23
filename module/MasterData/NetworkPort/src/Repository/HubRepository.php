<?php
namespace NetworkPort\Repository;

use Core\Utils\Utils;
use NetworkPort\Entity\Hub;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class HubRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListHubByCondition(
        $sortField = 'h.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildHubQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                h.id,
                h.code,
                h.name,
                h.status,
                h.created_at,
                h.created_by,
                h.updated_at,
                h.updated_by,
                h.description,
                c.name as city_name
            ")->where('h.is_deleted = 0');

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
    public function buildHubQueryBuilder($sortField = 'h.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'hub_id' => [
                'alias' => 'u.id',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'h.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'h.status',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Hub::class, 'h')
         ->leftJoin('h.city', 'c');
        // ->groupBy('u.id')
        // ->where('u.deletedAt is null')
        // ->andWhere('u.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('h.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}