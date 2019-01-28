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
                ct.created_by,
                ct.created_at
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

     public function getListCountrySelect(
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildCountryQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "c.id,
                 c.name,
                 c.name_en,
                 c.status"                 
            )
            // ->groupBy('c.cityId')
             // ->setMaxResults(100)
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
        $queryBuilder->from(Country::class, 'ct');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('ct.name', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}