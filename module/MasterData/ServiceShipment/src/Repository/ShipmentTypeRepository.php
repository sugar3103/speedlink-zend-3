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
    public function getListShipmentTypeByCondition($start, $limit, $sortField = 'smt.id', $sortDirection = 'asc', $filters = [],$deleted = true)
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
                c.id as category_id,
                c.name as category,
                c.name_en as category_en,
                smt.product_type_code,
                smt.volumetric_number,
                smt.status,
                ca.id as carrier_id,
                ca.name_en AS carrier_en,
                ca.name AS carrier,
                s.id as service_id,
                s.name_en AS service_en,
                s.name AS service,
                smt.created_at,
                cr.username as created_by,
                smt.updated_at,
                up.username as updated_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                 CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated
            ");
            
            if($deleted) {
                $queryBuilder->andWhere('smt.is_deleted = 0');
            }

            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
            }

            return $queryBuilder;
        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListShipmentTypeCodeByCondition($sortField = 'code', $sortDirection = 'asc', $filters = [], $deleted = true)
    {
        try {
            $queryBuilder = $this->buildShipmentTypeQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                smt.id,
                smt.code,
                smt.name,
                smt.name_en
            ");
            
            $queryBuilder->andWhere('smt.is_deleted = 0');
            
            return $queryBuilder;

        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListCodeByCondition($sortField = 'code', $filters = [], $deleted = true)
    {
        try {
            $queryBuilder = $this->buildShipmentTypeQueryBuilder($sortField, 'asc', $filters);
            if($deleted) {
                $queryBuilder->andWhere('smt.is_deleted = 0');
            }
            
            $queryBuilder->andWhere('smt.status = 1');
            if ($sortField == 'carrier_id') {
                $queryBuilder->select("
                    ca.id,
                    ca.code AS carrier_code,
                    ca.name AS carrier_name,
                    ca.name_en AS carrier_name_en
                ");
                $queryBuilder->andWhere('c.is_deleted = 0');
                $queryBuilder->andWhere('c.status = 1');
                $queryBuilder->groupBy('ca.id');
            } else if ($sortField == 'service_id') {
                $queryBuilder->select("
                    s.id,
                    s.code AS service_code,
                    s.name AS service_name,
                    s.name_en AS service_name_en
                ");
                $queryBuilder->andWhere('s.is_deleted = 0');
                $queryBuilder->andWhere('s.status = 1');
                $queryBuilder->groupBy('s.id');
            } else {
                $queryBuilder->select("
                    smt.id AS shipment_type_id,
                    smt.code AS shipment_type_code,
                    smt.name AS shipment_type_name,
                    smt.name_en AS shipment_type_name_en
                ");
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
            'id' => [
                'alias' => 'smt.id',
                'operator' => 'in'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(ShipmentType::class, 'smt')
            ->leftJoin('smt.carrier', 'ca')
            ->leftJoin('smt.category', 'c')
            ->leftJoin('smt.service', 's')
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