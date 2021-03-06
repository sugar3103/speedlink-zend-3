<?php
namespace Address\Repository;

use Address\Entity\Country;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for Country entity.
 * @package Address\Repository
 */
class CountryRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListCountryByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'ct.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildCountryQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                ct.id,
                ct.name,
                ct.name_en,
                ct.description,
                ct.description_en,
                ct.iso_code,
                ct.status,
                cr.username as created_by,
                ct.created_at,
                up.username as updated_by,
                ct.updated_at,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated
            ")->andWhere("ct.is_deleted = 0")
            ->groupBy('ct.id');

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
    public function buildCountryQueryBuilder($sortField = 'ct.name', $sortDirection = 'asc', $filters)
    {
        
        $operatorsMap = [
            'id' => [
                'alias' => 'ct.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'ct.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'ct.name_en',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'ct.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'ct.status',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Country::class, 'ct')
        ->leftJoin('ct.created_by', 'cr')
        ->leftJoin('ct.updated_by', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('ct.name', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}