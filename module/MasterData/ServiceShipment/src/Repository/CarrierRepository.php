<?php
namespace ServiceShipment\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use ServiceShipment\Entity\Carrier;
use Core\Utils\Utils;

/**
 * This is the custom repository class for User entity.
 * @package ServiceShipment\Repository
 */
class CarrierRepository extends EntityRepository
{
    public function getListCarrierByCondition($sortField = 'c.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildCarrierQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                c.id,
                c.name,
                c.name_en,
                c.description,
                c.description_en,
                c.code,
                c.status
            ")->where('c.is_deleted = 0');
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
    public function buildCarrierQueryBuilder($sortField, $sortDirection, $filters)
    {
        $operatorsMap = [
            'status' => [
                'alias' => 'c.status',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 'c.code',
                'operator' => 'contains'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Carrier::class, 'c');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('c.id', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}