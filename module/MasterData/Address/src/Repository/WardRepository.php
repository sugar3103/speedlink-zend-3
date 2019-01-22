<?php
namespace Address\Repository;

use Address\Entity\Ward;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for Ward entity.
 * @package Address\Repository
 */
class WardRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListWardByCondition(
        $sortField = 'w.name',
        $sortDirection = 'ASC',
        $filters = [],
        $offset = 0,
        $limit = 10
    )
    {
        try {
            $queryBuilder = $this->buildWardQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "w.wardId,
                 w.name,
                 w.description,
                 w.status,
                 w.createdBy,
                 w.createdAt"                 
            )->groupBy('w.wardId')
            ->setMaxResults($limit)
            ->setFirstResult($offset);
            return $queryBuilder;

        } catch (QueryException $e) {
            
            return [];
        }

    }

    public function getListWardSelect(
        $sortField = 'w.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildWardQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "w.wardId,
                 w.name,
                 w.nameEn,
                 w.status"                 
            )
            // ->groupBy('c.cityId')
             ->setMaxResults(100)
            // ->setFirstResult($offset)
            ;
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
    public function buildWardQueryBuilder($sortField = 'w.name', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'district_id' => [
                'alias' => 'w.district_id',
                'operator' => 'eq'
            ],
            'ward_id' => [
                'alias' => 'w.wardId',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'w.name',
                'operator' => 'contains'
            ],

            'created_at' => [
                'alias' => 'w.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'w.status',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Ward::class, 'w');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('w.name', 'ASC');

        return $this->setCriteriaListWardByFilters($filters, $operatorsMap, $queryBuilder);
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
    public function setCriteriaListWardByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
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