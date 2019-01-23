<?php
/**
 * Created by PhpStorm.
 * User: intern.ict008
 * Date: 11/17/2018
 * Time: 11:40 AM
 */

namespace OAuth\Repository;

use OAuth\Entity\Permission;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

class PermissionRepository extends EntityRepository
{
    /**
     * Get list permission by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     */
    public function getListPermissionByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'p.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildPermissionQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select([
                "p.id,
                 p.name,
                 p.name_en,
                 p.description,
                 p.description_en,
                 p.created_at"
            ])->andWhere('p.id <> 0')->groupBy('p.id')
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
    public function buildPermissionQueryBuilder($sortField = 'p.id', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'id' => [
                'alias' => 'p.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'p.name',
                'operator' => 'contains'
            ],
            'description' => [
                'alias' => 'p.description',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'p.createdAt',
                'operator' => 'contains'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Permission::class, 'p');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('p.id', 'ASC');

        return $this->setCriteriaListRoleByFilters($filters, $operatorsMap, $queryBuilder);
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
    public function setCriteriaListRoleByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
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