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
                drw.is_private,
                cu.id as customer_id,
                c.id as category_id,
                c.name as category,
                c.name_en as category_en,
                ca.id as carrier_id,
                ca.name as carrier,
                ca.name_en as carrier_en,
                s.id as service_id,
                s.name as service,
                s.name_en as service_en,
                st.id as shipment_type_id,
                st.name as shipment_type,
                st.name_en as shipment_type_en,
                z.id as zone_id,        
                z.name as zone,             
                z.name_en as zone_en,             
                drw.calculate_unit,
                drw.round_up,
                drw.unit,
                drw.is_ras,                
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
            'is_private'   => [
                'alias' => 'drw.is_private',
                'operator' => 'eq'
            ],

            'customer_id'   => [
                'alias' => 'cu.id',
                'operator' => 'eq'
            ],

            'category_id' => [
                'alias' => 'c.id',
                'operator' => 'eq'
            ],
            'carrier_id' => [
                'alias' => 'ca.id',
                'operator' => 'eq'
            ],
            'service_id' => [
                'alias' => 's.id',
                'operator' => 'eq'
            ],
            'shipment_type_id' => [
                'alias' => 'st.id',
                'operator' => 'eq'
            ],
            'status' => [
                'alias' => 'drw.status',
                'operator' => 'eq'
            ],
            'calculate_unit' => [
                'alias' => 'drw.calculate_unit',
                'operator' => 'eq'
            ],
            'round_up' => [
                'alias' => 'drw.round_up',
                'operator' => 'eq'
            ],
            'zone_id' => [
                'alias' => 'z.id',
                'operator' => 'eq'
            ],
            'is_ras' => [
                'alias' => 'drw.is_ras',
                'operator' => 'eq'
            ],
            'from' => [
                'alias' => 'drw.from',
                'operator' => 'eq'
            ],
            'to' => [
                'alias' => 'drw.to',
                'operator' => 'eq'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(DomesticRangeWeight::class, 'drw')      
        ->leftJoin('drw.category', 'c')
        ->leftJoin('drw.service', 's')
        ->leftJoin('drw.carrier', 'ca')  
        ->leftJoin('drw.shipment_type', 'st')  
        ->leftJoin('drw.zone','z')
        ->leftJoin('drw.join_created', 'cr')
        ->leftJoin('drw.join_updated', 'up')
        ->leftJoin('drw.customer', 'cu');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('drw.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

    public function getRangeWeightOver($where) {
        try {
            $queryBuilder = $this->getEntityManager()->createQueryBuilder();
            $queryBuilder->select('
                rw.id,
                rw.calculate_unit,
                rw.unit,
                rw.round_up,
                rw.from,
                rw.to
            ')
            ->from(DomesticRangeWeight::class, 'rw')
            ->where('rw.is_deleted = 0')
            ->andWhere('rw.status = 1')
            ->andWhere('rw.from < :weight')
            ->andWhere('rw.to = 0')
            ->andWhere('rw.carrier = :carrier_id')
            ->andWhere('rw.category = :category_id')
            ->andWhere('rw.service = :service_id')
            ->andWhere('rw.zone = :zone_id')
            ->andWhere('rw.shipment_type = :shipment_type_id')
            ->andWhere('rw.is_ras = :is_ras');
            if (!empty($where['customer_id'])) {
                $queryBuilder->andWhere('rw.is_private = 1')
                    ->andWhere('rw.customer = :customer_id');
            } else {
                $queryBuilder->andWhere('rw.is_private = 0');
            }
            $queryBuilder->setParameters($where);

            return $queryBuilder->getQuery()->execute();
        } catch (QueryException $e) {
            return [];
        }
    }

    public function getRangeWeightNormal($where) {
        try {
            $queryBuilder = $this->getEntityManager()->createQueryBuilder();
            $queryBuilder->select('
                rw.id,
                rw.calculate_unit,
                rw.unit,
                rw.round_up,
                rw.from,
                rw.to
            ')
            ->from(DomesticRangeWeight::class, 'rw')
            ->where('rw.is_deleted = 0')
            ->andWhere('rw.status = 1')
            ->andWhere('rw.from < :weight')
            ->andWhere('rw.to >= :weight')
            ->andWhere('rw.carrier = :carrier_id')
            ->andWhere('rw.category = :category_id')
            ->andWhere('rw.service = :service_id')
            ->andWhere('rw.zone = :zone_id')
            ->andWhere('rw.shipment_type = :shipment_type_id')
            ->andWhere('rw.is_ras = :is_ras');
            if (!empty($where['customer_id'])) {
                $queryBuilder->andWhere('rw.is_private = 1')
                    ->andWhere('rw.customer = :customer_id');
            } else {
                $queryBuilder->andWhere('rw.is_private = 0');
            }
            $queryBuilder->setParameters($where);

            return $queryBuilder->getQuery()->execute();
        } catch (QueryException $e) {
            return [];
        }
    }
}