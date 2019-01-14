<?php
namespace Address\Repository;

use Address\Entity\AddressCode;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for Code entity.
 * @package Address\Repository
 */
class AddressCodeRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListCodeByCondition(
        $sortField = 'ac.addressCodeId',
        $sortDirection = 'ASC',
        $filters = [],
        $offset = 0,
        $limit = 10
    )
    {
        
        try {
            $queryBuilder = $this->buildCodeQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "ac.addressCodeId AS id,
                 ac.code,
                 ct.name AS country,
                 c.name AS city,  
                 d.name AS district,  
                 w.name AS ward,
                 h.name AS hub,
                 b.name AS branch,            
                 ac.createdBy,
                 ac.createdAt"                 
            )->groupBy('ac.addressCodeId')            
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
    public function buildCodeQueryBuilder($sortField = 'ac.addressCodeId', $sortDirection = 'asc', $filters)
    {
        
        $operatorsMap = [
            'code'  => [
                'alias' => 'ac.code',
                'operator' => 'contains'
            ],

            'country' => [
                'alias' => 'ct.name',
                'operator' => 'contains'
            ],
            
            'city' => [
                'alias' => 'c.name',
                'operator' => 'contains'
            ],

            'district' => [
                'alias' => 'd.name',
                'operator' => 'contains'
            ],

            'ward' => [
                'alias' => 'w.name',
                'operator' => 'contains'
            ],

            'branch_id' => [
                'alias' => 'ac.branch_id',
                'operator' => 'eq'
            ],

            'hub_id' => [
                'alias' => 'ac.hub_id',
                'operator' => 'eq'
            ],

            'created_at' => [
                'alias' => 'ac.created_at',
                'operator' => 'contains'
            ],
            

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(AddressCode::class, 'ac')
        ->leftJoin(
            'ac.country', 'ct'
        )->leftJoin(
            'ac.city','c'
        )->leftJoin(
            'ac.district','d'
        )->leftJoin(
            'ac.ward','w'
        )->leftJoin(
            'ac.hub','h'
        )->leftJoin(
            'ac.branch','b'
        );           

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('ac.addressCodeId', 'ASC');

        return $this->setCriteriaListCodeByFilters($filters, $operatorsMap, $queryBuilder);
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
    public function setCriteriaListCodeByFilters($filters = [], $operatorsMap = [], QueryBuilder $queryBuilder)
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