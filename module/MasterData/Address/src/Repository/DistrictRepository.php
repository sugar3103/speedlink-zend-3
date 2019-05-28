<?php
namespace Address\Repository;

use Address\Entity\District;
use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for District entity.
 * @package Address\Repository
 */
class DistrictRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListDistrictByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'd.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildDistrictQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                d.id,
                d.name,
                d.name_en,
                d.description,
                d.description_en,
                d.ras,
                d.status,
                d.city_id,
                cr.username as created_by,
                d.created_at,
                up.username as updated_by,
                d.updated_at,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated
            ")->andWhere("d.is_deleted = 0")
            ->groupBy('d.id');
            
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
    public function buildDistrictQueryBuilder($sortField = 'd.name', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'city' => [
                'alias' => 'd.city_id',
                'operator' => 'eq'
            ],
            'id' => [
                'alias' => 'd.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'd.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'd.name_en',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'd.created_at',
                'operator' => 'contains'
            ],
            'ras' => [
                'alias' => 'd.ras',
                'operator' => 'eq'
            ],
            'status' => [
                'alias' => 'd.status',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(District::class, 'd')
        ->leftJoin('d.created_by', 'cr')
        ->leftJoin('d.updated_by', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('d.name', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}