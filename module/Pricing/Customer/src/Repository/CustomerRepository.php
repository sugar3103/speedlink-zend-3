<?php
namespace Customer\Repository;

use Core\Utils\Utils;
use Pricing\Entity\RangeWeight;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package Pricing\Repository
 */
class CustomerRepository extends EntityRepository
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
                r.code,
                r.category,
                r.unit,
                r.round_up,
                r.is_private,
                r.from,
                r.to,
                r.status,
                r.description,
                r.description_en,
                r.created_at,
                r.created_by,
                r.updated_at,
                r.updated_by,
                r.carrier_id,
                r.service_id,
                r.shipment_type_id,
                r.customer_id,
                c.code AS carrier_code,
                s.code AS service_code,
                st.code AS shipmenttype_code
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
            'code' => [
                'alias' => 'r.code',
                'operator' => 'contains'
            ],
            'carrier_id' => [
                'alias' => 'r.carrier_id',
                'operator' => 'eq'
            ],
            'category' => [
                'alias' => 'r.category',
                'operator' => 'contains'
            ],
            'service_id' => [
                'alias' => 'r.service_id',
                'operator' => 'eq'
            ],
            'shipmenttype' => [
                'alias' => 'r.shipment_type_id',
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
        ->leftJoin('r.shipmenttype', 'st');
        // ->groupBy('b.id')
        // ->where('b.deletedAt is null')
        // ->andWhere('b.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('r.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}