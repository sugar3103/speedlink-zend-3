<?php
namespace CustomerService\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use CustomerService\Entity\ShipmentType;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class ShipmentTypeRepository extends EntityRepository
{
    public function getListShipmentTypeByCondition($sortField = 'c.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildShipmentTypeQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                smt.id,
                smt.name,
                smt.name_en,
                smt.description,
                smt.description_en,
                smt.code AS shipment_type_code,
                smt.category_code,
                smt.product_type_code,
                smt.volumetric_number,
                smt.status,
                smt.carrier_id,
                c.code AS carrier_code,
                smt.service_id,
                s.code AS service_code
            ");
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
            ->where('smt.is_deleted = 0');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('smt.id', 'ASC');
        }

        return Core\Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}