<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use PricingDomestic\Entity\DomesticAreaCity;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Address\Entity\City;

/**
 * This is the custom repository class for User entity.
 * @package PricingDomestic\Repository
 */
class DomesticAreaCityRepository extends EntityRepository
{
    public function getCities()
    {   
        $entityManager = $this->getEntityManager();

        $subQueryBuilder = $entityManager->createQueryBuilder();
        $subQueryBuilder->select("dac.city_id");
        $subQueryBuilder->from(DomesticAreaCity::class,"dac");
        $subQueryBuilder->andWhere('dac.city_id = c.id');

        try {
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->select(
                ' c.id,
                c.name,
                c.name_en')
            ->from(City::class, 'c')
            ->andWhere($queryBuilder->expr()->not($queryBuilder->expr()->exists($subQueryBuilder->getDQL())))
            ->orderBy('c.name', 'ASC');

            return $queryBuilder;
        } catch (QueryException $e) {
            return [];
        }    
    }
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListDomesticAreaCityByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'da.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                dac.id,
                dac.created_at,
                dac.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updated_by                
            ")->andWhere("dac.is_deleted = 0")
            ->groupBy('dac.id');
            
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
    public function buildCustomerQueryBuilder($sortField = 'dac.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'dac.id',
                'operator' => 'eq'
            ],
            
            'created_at' => [
                'alias' => 'da.created_at',
                'operator' => 'contains'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticAreaCity::class, 'dac')        
        ->leftJoin('dac.join_created', 'cr')
        ->leftJoin('dac.join_updated', 'up');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('dac.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}