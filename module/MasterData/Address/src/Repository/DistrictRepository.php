<?php
namespace Address\Repository;

use Address\Entity\District;
use Doctrine\Common\Collections\Criteria;
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
        $sortField = 'd.name',
        $sortDirection = 'ASC',
        $filters = [],
        $offset = 0,
        $limit = 10
    )
    {
        try {
            $queryBuilder = $this->buildDistrictQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "d.districtId,
                 d.name,
                 d.description,
                 d.status,
                 d.createdBy,
                 d.createdAt"                 
            )->groupBy('d.districtId')
            ->setMaxResults($limit)
            ->setFirstResult($offset);
            return $queryBuilder;

        } catch (QueryException $e) {
            
            return [];
        }

    }

    public function getListDistrictSelect(
        $sortField = 'd.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildDistrictQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "d.districtId,
                 d.name,
                 d.nameEn,
                 d.status"                 
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
    public function buildDistrictQueryBuilder($sortField = 'd.name', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'city_id' => [
                'alias' => 'd.city_id',
                'operator' => 'eq'
            ],
             'district_id' => [
                'alias' => 'd.districtId',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'd.name',
                'operator' => 'contains'
            ],

            'created_at' => [
                'alias' => 'd.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'd.status',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(District::class, 'd');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('d.name', 'ASC');

        return $this->setCriteriaListDistrictByFilters($filters, $operatorsMap, $queryBuilder);
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
    public function setCriteriaListDistrictByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
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