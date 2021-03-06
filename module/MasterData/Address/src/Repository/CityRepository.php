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
        $start = 1,
        $limit = 10,
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
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
                c.zip_code,
                c.country_id,
                cr.username as created_by,
                c.created_at,
                up.username as updated_by,
                c.updated_at,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated
            ")->andWhere("c.is_deleted = 0")
            ->groupBy('c.id');
            
            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
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
    public function buildCityQueryBuilder($sortField = 'c.name', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'country' => [
                'alias' => 'c.country_id',
                'operator' => 'eq'
            ],
            'id' => [
                'alias' => 'c.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'c.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'c.name_en',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'c.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'c.status',
                'operator' => 'eq'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(City::class, 'c')
        ->leftJoin('c.join_created', 'cr')
        ->leftJoin('c.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL){
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('c.name', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}