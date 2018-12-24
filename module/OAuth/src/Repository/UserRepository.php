<?php
namespace OAuth\Repository;

use OAuth\Entity\User;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package OAuth\Repository
 */
class UserRepository extends EntityRepository {

    /**
     * Retrieves all users in descending createdAt order.
     * @return \Doctrine\ORM\Query
     */
    public function findAllUsers() {
        $entityManager = $this->getEntityManager();

        $queryBuilder = $entityManager->createQueryBuilder();

        $queryBuilder->select('u')
            ->from(User::class, 'u')
            ->orderBy('u.createdAt', 'DESC');

        return $queryBuilder->getQuery();
    }


    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListUserByCondition(
        $sortField = 'u.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildUserQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "u.id,
                 u.email,
                 u.username,
                 u.isActive AS is_active,
                 CONCAT(COALESCE(u.firstName,''), COALESCE(u.lastName,'')) as full_name,
                 u.createdAt AS created_at,
                 GROUP_CONCAT(r.name) AS role_name"
            )
            ->leftJoin(
                'u.roles',
                'r'
            )->groupBy('u.id');

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
    public function buildUserQueryBuilder($sortField = 'u.id', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [

            'username' => [
                'alias' => 'u.username',
                'operator' => 'contains'
            ],

            'created_at' => [
                'alias' => 'u.createdAt',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'u.isActive',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(User::class, 'u')
            ->where('u.deletedAt is null')
            ->andWhere('u.id <> 1');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('u.id', 'DESC');

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