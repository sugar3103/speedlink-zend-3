<?php
namespace NetworkPort\Repository;

use NetworkPort\Entity\Hub;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class HubRepository extends EntityRepository {
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListHubByCondition(
        $start = 0,
        $limit = 10,
        $sortField = 'h.hubId',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildHubQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
               "h.hubId,
                h.code,
                h.name,
                h.nameEn,
                h.status,
                h.createdAt,
                h.createdBy,
                h.updatedAt,
                h.updatedBy,
                h.description,
                h.descriptionEn,
                h.cityId,
                c.name as city_name"
            )
            // ->groupBy('h.hubId')
            ->setMaxResults($limit)
            ->setFirstResult($start);
            return $queryBuilder;

        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListHubSelect(
        $sortField = 'h.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildHubQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "h.hubId,
                 h.name,
                 h.nameEn,
                 h.status"                 
            )
            // ->groupBy('c.cityId')
            // ->setMaxResults($limit)
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
    public function buildHubQueryBuilder($sortField = 'h.hubId', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
             'hub_id' => [
                'alias' => 'h.hubId',
                'operator' => 'contains'
            ],
            'code' => [
                'alias' => 'h.code',
                'operator' => 'contains'
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
            $queryBuilder->orderBy('h.code', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}