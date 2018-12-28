<?php
namespace NetworkPort\Repository;

use NetworkPort\Entity\Branch;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class BranchRepository extends EntityRepository {

    // /**
    //  * Retrieves all users in descending createdAt order.
    //  * @return \Doctrine\ORM\Query
    //  */
    // public function findAllUsers() {
    //     $entityManager = $this->getEntityManager();

    //     $queryBuilder = $entityManager->createQueryBuilder();

    //     $queryBuilder->select('u')
    //         ->from(User::class, 'u')
    //         ->orderBy('u.createdAt', 'DESC');

    //     return $queryBuilder->getQuery();
    // }

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListBranchByCondition(
        $sortField = 'u.branchId',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildBranchQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "u.branchId,
                u.code,
                u.name,
                u.status,
                u.createdAt,
                u.createdBy,
                u.updatedAt,
                u.updatedBy,
                u.hubId,
                d.name AS district,
                c.name AS city,
                w.name AS ward,
                co.name AS country,
                u.description"
            );
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
    public function buildBranchQueryBuilder($sortField = 'u.branchId', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'branch_id' => [
                'alias' => 'u.branchId',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'u.createdAt',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'u.status',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Branch::class, 'u')
        ->leftJoin('u.district', 'd')
        ->leftJoin('u.city', 'c')
        ->leftJoin('u.ward', 'w')
        ->leftJoin('u.country', 'co');
            // ->groupBy('u.id')
            // ->where('u.deletedAt is null')
            // ->andWhere('u.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('u.branchId', 'DESC');

        return $this->setCriteriaListUserByFilters($filters, $operatorsMap, $queryBuilder);
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
    public function setCriteriaListUserByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
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