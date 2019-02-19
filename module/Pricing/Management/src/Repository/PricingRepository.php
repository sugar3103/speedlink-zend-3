<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\Pricing;

/**
 * This is the custom repository class for Pricing entity.
 * @package Management\Repository
 */
class PricingRepository extends EntityRepository
{
    public function getListPricingByCondition($start, $limit, $sortField = 'pr.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildPricingQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                
            ")->andWhere('pr.is_deleted = 0');

            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
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
    public function buildPricingQueryBuilder($sortField, $sortDirection, $filters)
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
        $queryBuilder->from(Pricing::class, 'pr')
            ->leftJoin('pr.join_carrier', 'c')
            ->leftJoin('pr.join_service', 's')
            ->leftJoin('pr.join_created', 'cr')
            ->leftJoin('pr.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('pr.id', 'ASC');
        }

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}