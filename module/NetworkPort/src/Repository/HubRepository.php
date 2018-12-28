<?php
namespace NetworkPort\Repository;

use NetworkPort\Entity\Hub;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class HubRepository extends EntityRepository {

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
    public function getListHubByCondition(
        $sortField = 'h.hubId',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildHubQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
               "h.hubId,
                h.cityId,
                h.code,
                h.name,
                h.status,
                h.createdAt,
                h.createdBy,
                h.updatedAt,
                h.updatedBy,
                h.description,
                c.name as city_name"
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
    public function buildHubQueryBuilder($sortField = 'h.hubId', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'hub_id' => [
                'alias' => 'u.hubId',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'h.createdAt',
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
            
        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('h.hubId', 'DESC');
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