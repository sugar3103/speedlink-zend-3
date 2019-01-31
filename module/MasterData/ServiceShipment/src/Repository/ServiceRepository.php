<?php
namespace ServiceShipment\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use ServiceShipment\Entity\Service;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class ServiceRepository extends EntityRepository
{
    public function getListServiceByCondition($start, $limit, $sortField = 's.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildServiceQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                s.id,
                s.name,
                s.name_en,
                s.description,
                s.description_en,
                s.code,
                s.status
            ")->andWhere('s.is_deleted = 0');

            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
            }

            return $queryBuilder;

        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListServiceCodeByCondition($sortField = 'code', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildServiceQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                s.id,
                s.code
            ")->andwhere('s.is_deleted = 0');
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
    public function buildServiceQueryBuilder($sortField, $sortDirection, $filters)
    {
        $operatorsMap = [
            'status' => [
                'alias' => 's.status',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 's.code',
                'operator' => 'contains'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Service::class, 's')
            ->leftJoin('s.join_created', 'cr')
            ->leftJoin('s.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('s.id', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}