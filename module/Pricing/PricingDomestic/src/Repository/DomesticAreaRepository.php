<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use PricingDomestic\Entity\DomesticArea;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package PricingDomestic\Repository
 */
class DomesticAreaRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListDomesticAreaByCondition(
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
                da.id,
                da.name,
                da.name_en,
                da.created_at,
                da.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updated_by                
            ")->andWhere("da.is_deleted = 0")
            ->groupBy('da.id');
            
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
    public function buildCustomerQueryBuilder($sortField = 'da.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'da.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'da.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'da.name_en',
                'operator' => 'contains'
            ],
            
            'created_at' => [
                'alias' => 'da.created_at',
                'operator' => 'contains'
            ]
        ];
        
        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticArea::class, 'da')        
        ->leftJoin('da.join_created', 'cr')
        ->leftJoin('da.join_updated', 'up');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('da.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}