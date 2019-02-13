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
    public function getListShipmentTypeByCondition($start, $limit, $sortField = 'c.id', $sortDirection = 'asc', $filters = [])
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
                s.code AS service_code
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