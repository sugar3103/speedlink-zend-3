<?php
namespace Address\Repository;

use Address\Entity\Country;
use Doctrine\Common\Collections\Criteria;
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
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = []        
    )
    {
        try {
            $queryBuilder = $this->buildCountryQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "c.countryId,
                 c.name,
                 c.nameEn,
                 c.description,
                 c.descriptionEn,
                 c.isoCode,
                 c.status,
                 c.createdBy,
                 c.createdAt"                 
            )->andWhere("c.isDeleted = 0")
            ->groupBy('c.countryId')
            ->setMaxResults($limit)
            ->setFirstResult(($start - 1) * $limit);
            
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
                "c.countryId,
                 c.name,
                 c.nameEn,
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
    public function buildCountryQueryBuilder($sortField = 'c.name', $sortDirection = 'asc', $filters)
    {
        
        $operatorsMap = [
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
        $queryBuilder->from(Country::class, 'c');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('c.name', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}