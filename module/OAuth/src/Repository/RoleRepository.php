<?php
namespace OAuth\Repository;

use OAuth\Entity\Role;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for User entity.
 * @package OAuth\Repository
 */
class RoleRepository extends EntityRepository {

    /**
     * Get list role by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListRoleByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'r.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildRoleQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "r.id,
                 r.name,
                 r.status,
                 r.description,
                 r.created_at"
            )->andWhere('r.id <> 0')->groupBy('r.id')
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
    public function buildRoleQueryBuilder($sortField = 'r.id', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'name' => [
                'alias' => 'r.name',
                'operator' => 'contains'
            ],
            'description' => [
                'alias' => 'r.description',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'r.created_at',
                'operator' => 'contains'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Role::class, 'r');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('r.id', 'DESC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}