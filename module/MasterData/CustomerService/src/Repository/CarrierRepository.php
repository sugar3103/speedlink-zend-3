<?php
namespace CustomerService\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use CustomerService\Entity\Carrier;


/**
 * This is the custom repository class for User entity.
 * @package CustomerService\Repository
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
                c.nameEn,
                c.description,
                c.descriptionEn,
                c.code,
                c.status
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
        $queryBuilder->from(Carrier::class, 'c')->where('c.isDeleted = 0');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('c.id', 'ASC');
        }

        $utils = new Utils();
        return $utils->setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}