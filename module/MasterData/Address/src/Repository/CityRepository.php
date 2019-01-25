<?php
namespace Address\Repository;

use Address\Entity\City;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for City entity.
 * @package Address\Repository
 */
class CityRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListCityByCondition(
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = [],
        $offset = 0,
        $limit = 10
    )
    {
        try {
            $queryBuilder = $this->buildCityQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                c.id,
                c.name,
                c.name_en,
                c.description,
                c.description_en,
                c.status,
                c.created_by,
                c.created_at
            ")->andWhere("c.is_deleted = 0")
            ->groupBy('c.id')
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
     * @param string $sortField
     * @param string $sortDirection
     * @param $filters
     * @return QueryBuilder
     * @throws QueryException
     */
    public function buildCityQueryBuilder($sortField = 'c.name', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'country' => [
                'alias' => 'ct.name',
                'operator' => 'contains'
            ],
            
            'name' => [
                'alias' => 'c.name',
                'operator' => 'contains'
            ],

            'created_at' => [
                'alias' => 'c.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'c.status',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(City::class, 'c')
            ->leftJoin('c.country', 'ct');

        if ($sortField != NULL && $sortDirection != NULL){
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('c.name', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}