<?php
namespace CustomerService\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use CustomerService\Entity\Service;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class ServiceRepository extends EntityRepository
{
    public function getListServiceByCondition($sortField = 's.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildServiceQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                s.id,
                s.name,
                s.nameEn,
                s.description,
                s.descriptionEn,
                s.code,
                s.status
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
        $queryBuilder->from(Service::class, 's')->where('s.isDeleted = 0');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('s.id', 'ASC');
        }

        $utils = new Utils();
        return $utils->setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}