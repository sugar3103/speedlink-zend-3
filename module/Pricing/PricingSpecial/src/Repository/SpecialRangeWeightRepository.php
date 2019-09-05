<?php
namespace PricingSpecial\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query\QueryException;
use PricingSpecial\Entity\SpecialRangeWeight;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class SpecialRangeWeightRepository extends EntityRepository
{

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListSpecialRangeWeightByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'srw.id',
        $sortDirection = 'asc',
        $filters = []
    ) {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                srw.id,
                srw.name,
                srw.name_en,
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
                sa.id as special_area_id,
                sa.name as special_area_name,
                srw.calculate_unit,
                srw.round_up,
                srw.unit,
                srw.from,
                srw.to,
                srw.status,
                srw.description,
                srw.description_en,
                srw.created_at,
                srw.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updated_by
            ")->andWhere("srw.is_deleted = 0")
                ->groupBy('srw.id');

            if ($limit) {
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
    public function buildCustomerQueryBuilder($sortField = 'srw.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'srw.id',
                'operator' => 'eq',
            ],
            'special_area_id' => [
                'alias' => 'sa.id',
                'operator' => 'eq',
            ],
            'name' => [
                'alias' => 'srw.name',
                'operator' => 'contains',
            ],
            'name_en' => [
                'alias' => 'srw.name_en',
                'operator' => 'contains',
            ],
        
            'customer_id' => [
                'alias' => 'cu.id',
                'operator' => 'eq',
            ],

            'category_id' => [
                'alias' => 'c.id',
                'operator' => 'eq',
            ],
            'carrier_id' => [
                'alias' => 'ca.id',
                'operator' => 'eq',
            ],
            'service_id' => [
                'alias' => 's.id',
                'operator' => 'eq',
            ],
            'shipment_type_id' => [
                'alias' => 'st.id',
                'operator' => 'eq',
            ],
            'status' => [
                'alias' => 'srw.status',
                'operator' => 'eq',
            ],
            'calculate_unit' => [
                'alias' => 'srw.calculate_unit',
                'operator' => 'eq',
            ],
            'round_up' => [
                'alias' => 'srw.round_up',
                'operator' => 'eq',
            ],
            'from' => [
                'alias' => 'srw.from',
                'operator' => 'eq',
            ],
            'to' => [
                'alias' => 'srw.to',
                'operator' => 'eq',
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(SpecialRangeWeight::class, 'srw')
            ->leftJoin('srw.category', 'c')
            ->leftJoin('srw.service', 's')
            ->leftJoin('srw.carrier', 'ca')
            ->leftJoin('srw.shipment_type', 'st')
            ->leftJoin('srw.special_area', 'sa')
            ->leftJoin('srw.created_by', 'cr')
            ->leftJoin('srw.updated_by', 'up')
            ->leftJoin('srw.customer', 'cu');

        if ($sortField != null && $sortDirection != null) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('srw.id', 'DESC');
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
                ->from(SpecialRangeWeight::class, 'rw')
                ->where('rw.is_deleted = 0')
                ->andWhere('rw.status = 1')
                ->andWhere('rw.from < :weight')
                ->andWhere('rw.to = 0')
                ->andWhere('rw.carrier = :carrier_id')
                ->andWhere('rw.category = :category_id')
                ->andWhere('rw.service = :service_id')
                ->andWhere('rw.special_area_id = :special_area_id')
                ->andWhere('rw.shipment_type = :shipment_type_id')
                ->andWhere('rw.customer = :customer_id');
            $queryBuilder->setParameters($where);

            return $queryBuilder->getQuery()->getOneOrNullResult();
        } catch (QueryException $e) {
            return [];
        } catch (NonUniqueResultException $e) {
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
                ->from(SpecialRangeWeight::class, 'rw')
                ->where('rw.is_deleted = 0')
                ->andWhere('rw.status = 1')
                ->andWhere('rw.from < :weight')
                ->andWhere('rw.to >= :weight')
                ->andWhere('rw.to = 0')
                ->andWhere('rw.carrier = :carrier_id')
                ->andWhere('rw.category = :category_id')
                ->andWhere('rw.service = :service_id')
                ->andWhere('rw.special_area_id = :special_area_id')
                ->andWhere('rw.shipment_type = :shipment_type_id')
                ->andWhere('rw.customer = :customer_id');
            $queryBuilder->setParameters($where);

            return $queryBuilder->getQuery()->getOneOrNullResult();
        } catch (QueryException $e) {
            return [];
        } catch (NonUniqueResultException $e) {
            return [];
        }
    }
}
