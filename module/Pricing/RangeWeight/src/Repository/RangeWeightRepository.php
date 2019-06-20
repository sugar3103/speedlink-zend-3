<?php
namespace RangeWeight\Repository;

use Core\Utils\Utils;
use RangeWeight\Entity\RangeWeight;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package RangeWeight\Repository
 */
class RangeWeightRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListRangeWeightByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'b.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildRangeWeightQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                r.id,
                r.category_id,
                r.calculate_unit,
                r.unit,
                r.round_up,
                r.is_private,
                r.from,
                r.to,
                r.status,
                r.description,
                r.description_en,
                r.created_at,
                r.updated_at,
                r.carrier_id,
                r.service_id,
                r.shipment_type_id,
                r.customer_id,

                jc.name as category_name,
                jc.name_en as category_name_en,
                
                c.name AS carrier_name,
                c.name_en AS carrier_name_en,

                s.name AS service_name,
                s.name_en AS service_name_en,

                st.code AS shipment_type_name,
                st.code AS shipment_type_name_en,
                
                cu.name AS customer_name,
                uc.username AS created_by,
                ud.username AS updated_by,
                CONCAT(COALESCE(uc.first_name,''), ' ', COALESCE(uc.last_name,'')) as full_name_created,
                CONCAT(COALESCE(ud.first_name,''), ' ', COALESCE(ud.last_name,'')) as full_name_updated  
            ")->andWhere("r.is_deleted = 0")
            ->groupBy('r.id');
            
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
    public function buildRangeWeightQueryBuilder($sortField = 'r.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'r.id',
                'operator' => 'eq'
            ],
            'is_private' => [
                'alias' => 'r.is_private',
                'operator' => 'eq'
            ],
            'carrier_id' => [
                'alias' => 'r.carrier_id',
                'operator' => 'eq'
            ],
            'category_id' => [
                'alias' => 'jc.category_id',
                'operator' => 'contains'
            ],
            'service_id' => [
                'alias' => 'r.service_id',
                'operator' => 'eq'
            ],
            'shipment_type_id' => [
                'alias' => 'r.shipment_type_id',
                'operator' => 'eq'
            ],
            'customer' => [
                'alias' => 'r.customer_id',
                'operator' => 'eq'
            ],
            'status' => [
                'alias' => 'r.status',
                'operator' => 'eq'
            ],
            'from' => [
                'alias' => 'r.from',
                'operator' => 'eq'
            ],
            'to' => [
                'alias' => 'r.to',
                'operator' => 'eq'
            ],
            'calculate_unit' => [
                'alias' => 'r.calculate_unit',
                'operator' => 'eq'
            ],
            'round_up' => [
                'alias' => 'r.round_up',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'r.created_at',
                'operator' => 'contains'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(RangeWeight::class, 'r')
        ->leftJoin('r.carrier', 'c')
        ->leftJoin('r.service', 's')
        ->leftJoin('r.shipmenttype', 'st')
        ->leftJoin('r.customer', 'cu')
        ->leftJoin('r.user_create', 'uc')
        ->leftJoin('r.user_update', 'ud')
        ->leftJoin('r.join_category', 'jc');
        
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('r.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}