<?php
namespace ServiceShipment\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use ServiceShipment\Entity\ShipmentType;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class ShipmentTypeRepository extends EntityRepository
{
    public function getListShipmentTypeByCondition($start, $limit, $sortField = 'smt.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildShipmentTypeQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                smt.id,
                smt.name,
                smt.name_en,
                smt.description,
                smt.description_en,
                smt.code,
                smt.category_code,
                smt.product_type_code,
                smt.volumetric_number,
                smt.status,
                smt.carrier_id,
                c.name_en AS carrier_name_en,
                c.name AS carrier_name,
                smt.service_id,
                s.name_en AS service_name_en,
                s.name AS service_name,
                smt.created_at,
                cr.username as created_by,
                smt.updated_at,
                up.username as updated_by
            ")->andWhere('smt.is_deleted = 0');

            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
            }

            return $queryBuilder;
        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListShipmentTypeCodeByCondition($sortField = 'code', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildShipmentTypeQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                smt.id,
                smt.code,
                smt.name,
                smt.name_en
            ")->andWhere('smt.is_deleted = 0');
            return $queryBuilder;

        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListCodeByCondition($sortField = 'code', $filters = [])
    {
        try {
            $queryBuilder = $this->buildShipmentTypeQueryBuilder($sortField, 'asc', $filters);
            $queryBuilder->select("
                smt.id AS shipment_type_id,
                smt.code AS shipment_type_code,
                smt.name AS shipment_type_name,
                smt.name_en AS shipment_type_name_en,
                smt.carrier_id,
                c.code AS carrier_code,
                c.name AS carrier_name,
                c.name_en AS carrier_name_en,
                smt.service_id,
                s.code AS service_code,
                s.name AS service_name,
                s.name_en AS service_name_en
            ")->andWhere('smt.is_deleted = 0')
              ->andWhere('smt.status = 1');
            if ($sortField == 'carrier_id') {
                $queryBuilder->andWhere('c.is_deleted = 0');
                $queryBuilder->andWhere('c.status = 1');
                $queryBuilder->groupBy('smt.carrier_id');
            } else if ($sortField == 'service_id') {
                $queryBuilder->andWhere('s.is_deleted = 0');
                $queryBuilder->andWhere('s.status = 1');
                $queryBuilder->groupBy('smt.service_id');
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
    public function buildShipmentTypeQueryBuilder($sortField, $sortDirection, $filters)
    {
        $operatorsMap = [
            'status' => [
                'alias' => 'smt.status',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 'smt.code',
                'operator' => 'contains'
            ],
            'category_code' => [
                'alias' => 'smt.category_code',
                'operator' => 'eq'
            ],
            'carrier_id' => [
                'alias' => 'smt.carrier_id',
                'operator' => 'eq'
            ],
            'service_id' => [
                'alias' => 'smt.service_id',
                'operator' => 'in'
            ],
            'shipment_type_id' => [
                'alias' => 'smt.id',
                'operator' => 'in'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(ShipmentType::class, 'smt')
            ->leftJoin('smt.join_carrier', 'c')
            ->leftJoin('smt.join_service', 's')
            ->leftJoin('smt.join_created', 'cr')
            ->leftJoin('smt.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('smt.id', 'ASC');
        }

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}