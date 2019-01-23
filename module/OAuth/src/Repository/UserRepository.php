<?php
namespace OAuth\Repository;

use OAuth\Entity\User;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

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
        $start = 1,
        $limit = 10,
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
                 u.is_active,
                 CONCAT(COALESCE(u.first_name,''), COALESCE(u.last_name,'')) as full_name,
                 u.created_at,
                 GROUP_CONCAT(r.name) AS role_name"
            )
            ->leftJoin(
                'u.roles',
                'r'
            )->andWhere('u.id <> 0')->groupBy('u.id')
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
        $queryBuilder->from(User::class, 'u');
            

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('u.id', 'DESC');
            
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}