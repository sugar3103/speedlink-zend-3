<?php
namespace Status\Repository;

use Status\Entity\Status;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for Status entity.
 * @package Status\Repository
 */
class StatusRepository extends EntityRepository {

    /**
     * Get list status by condition
     *
     * @param string $sortField
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListStatusByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 's.status_id',
        $sortDirection = 'asc',
        $filters = []        
    )
    {
        try {
            $queryBuilder = $this->buildUserQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "s.status_id,
                 s.name,
                 s.name_en,
                 s.description,
                 s.description_en,
                 s.status,
                 s.created_by,
                 s.created_at,
                 s.updated_by,
                 s.updated_at"                 
            )->groupBy('s.status_id')
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
     * @param $sort
     * @param $filters
     * @return QueryBuilder
     * @throws QueryException
     */
    public function buildUserQueryBuilder($sortField = 's.status_id', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'name' => [
                'alias' => 's.name',
                'operator' => 'contains'
            ],

            'created_at' => [
                'alias' => 's.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 's.status',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Status::class, 's');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('s.name', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}