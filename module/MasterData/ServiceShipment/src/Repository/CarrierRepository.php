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
    public function getListCarrierByCondition($start, $limit, $sortField = null, $sortDirection = 'asc', $filters = [])
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
                c.status,
                c.created_at,
                cr.username as created_by,
                c.updated_at,
                up.username as updated_by
            ")->andWhere('c.is_deleted = 0');

            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
            }

            return $queryBuilder;

        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListCarrierCodeByCondition($sortField = 'code', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildCarrierQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                c.id,
                c.code
            ")->andwhere('c.is_deleted = 0');
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
        $queryBuilder->from(Carrier::class, 'c')
            ->leftJoin('c.join_created', 'cr')
            ->leftJoin('c.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('c.id', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}