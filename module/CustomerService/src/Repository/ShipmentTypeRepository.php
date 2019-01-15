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
                smt.nameEn,
                smt.description,
                smt.descriptionEn,
                smt.code AS shipmentTypeCode,
                smt.categoryCode,
                smt.productTypeCode,
                smt.volumetricNumber,
                smt.status,
                smt.carrierId,
                c.code AS carrierCode,
                smt.serviceId,
                s.code AS serviceCode
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
            ->leftJoin('smt.joinCarrier', 'c')
            ->leftJoin('smt.joinService', 's')
            ->where('smt.isDeleted = 0');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('smt.id', 'ASC');
        }

        $utils = new Utils();
        return $utils->setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}