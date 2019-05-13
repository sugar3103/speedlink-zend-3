<?php
namespace PricingDomestic\Repository;

use Core\Utils\Utils;
use PricingDomestic\Entity\DomesticRangeWeight;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package PricingDomestic\Repository
 */
class DomesticRangeWeightRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListDomesticRangeWeightByCondition(
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
                drw.id,
                drw.name,
                drw.name_en,
                drw.carrier_id,
                drw.category_id,
                drw.service_id,
                drw.shipment_type_id,
                drw.calculate_unit,
                drw.round_up,
                drw.unit,
                drw.is_ras,
                drw.zone_id,
                drw.from,
                drw.to,
                drw.status,
                drw.description,
                drw.description_en,
                drw.created_at,
                drw.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updated_by                
            ")->andWhere("drw.is_deleted = 0")
            ->groupBy('drw.id');
            
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
    public function buildCustomerQueryBuilder($sortField = 'drw.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'drw.id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'drw.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'drw.name_en',
                'operator' => 'contains'
            ],
            
            'created_at' => [
                'alias' => 'drw.created_at',
                'operator' => 'contains'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticRangeWeight::class, 'drw')        
        ->leftJoin('drw.join_created', 'cr')
        ->leftJoin('drw.join_updated', 'up');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('da.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}