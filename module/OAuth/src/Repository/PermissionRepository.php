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
                 p.description,
                 p.description_en,
                 p.created_at,
                 p.status,
                 cr.username as created_by,
                 CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name,
                 p.created_at,
                 up.username as updated_by,
                 p.updated_at"
            ])->andWhere('p.id <> 0')->andWhere('p.is_deleted = 0')->groupBy('p.id');
            
            if($limit) {
                $queryBuilder->setMaxResults($limit)
                    ->setFirstResult(($start - 1) * $limit);
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
                'alias' => 'p.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'p.status',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Permission::class, 'p')
            ->leftJoin('p.join_created', 'cr')
            ->leftJoin('p.join_updated', 'up');

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