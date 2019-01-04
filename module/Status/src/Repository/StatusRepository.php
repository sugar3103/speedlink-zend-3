<?php
namespace Status\Repository;

use Status\Entity\Status;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

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
        $sortField = 's.name',
        $filters = [],
        $offset = 0,
        $limit = 10
    )
    {
        try {
            $queryBuilder = $this->buildStatusQueryBuilder($sortField, $filters);
            $queryBuilder->select(
                "s.status_id,
                 s.name,
                 s.description,
                 s.status,
                 s.created_by,
                 s.created_at,
                 s.updated_by,
                 s.updated_at"                 
            )->groupBy('s.status_id')
            ->setMaxResults($limit)
            ->setFirstResult($offset);
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
    public function buildStatusQueryBuilder($sort, $filters)
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

        if ($sort != NULL)
        {
            $queryBuilder->orderBy($operatorsMap[$sort['field']]['alias'], $sort['direction']);
        }
        else
            $queryBuilder->orderBy('s.name', 'ASC');

        return $this->setCriteriaListStatusByFilters($filters, $operatorsMap, $queryBuilder);
    }

    /**
     * Set criteria list by filters
     *
     * @param array $filters
     * @param array $operatorsMap
     * @param QueryBuilder $queryBuilder
     * @return QueryBuilder
     * @throws QueryException
     */
    public function setCriteriaListStatusByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
    {

        foreach ($filters as $key => $value){

           if (isset($operatorsMap[$key]) && $value !== "")
                $expr = Criteria::create()->andWhere(Criteria::expr()->{$operatorsMap[$key]['operator']}($operatorsMap[$key]['alias'], $value));
            elseif ($value === "")
                continue;
            else
                $expr = Criteria::create()->andWhere(Criteria::expr()->contains($operatorsMap[$key]['alias'], $value));

            $queryBuilder->addCriteria($expr);
        }

        return $queryBuilder;
    }
}