<?php
namespace Address\Repository;

use Address\Entity\City;
use Doctrine\Common\Collections\Criteria;
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
            $queryBuilder->select(
                "c.cityId,
                 c.name,
                 c.description,
                 c.status,
                 c.createdBy,
                 c.createdAt"                 
            )->groupBy('c.cityId')
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
            'country_id' => [
                'alias' => 'c.countryId',
                'operator' => 'eq'
            ],
            
            'name' => [
                'alias' => 'c.name',
                'operator' => 'contains'
            ],

            'created_at' => [
                'alias' => 'c.createdAt',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'c.status',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(City::class, 'c');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('c.name', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}