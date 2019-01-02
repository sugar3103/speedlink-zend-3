<?php
namespace Address\Repository;

use Address\Entity\Country;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

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
        $sortField = 'c.name',
        $sortDirection = 'ASC',
        $filters = [],
        $offset = 0,
        $limit = 10
    )
    {
        try {
            $queryBuilder = $this->buildCountryQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "c.countryId,
                 c.name,
                 c.description,
                 c.status,
                 c.createdBy,
                 c.createdAt"                 
            )->groupBy('c.countryId')
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

        return $this->setCriteriaListCountryByFilters($filters, $operatorsMap, $queryBuilder);
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
    public function setCriteriaListCountryByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
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