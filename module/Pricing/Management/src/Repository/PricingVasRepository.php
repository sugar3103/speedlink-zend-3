<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\PricingVas;

/**
 * This is the custom repository class for PricingVas entity.
 * @package Management\Repository
 */
class PricingVasRepository extends EntityRepository
{
    public function getListVasByCondition($start, $limit, $sortField = 'pv.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildVasQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                pv.id,
                pv.pricing_data_id,
                pv.name,
                pv.formula,
                pv.min,
                pv.type,
                pv.is_deleted
            ")->andWhere('pv.is_deleted = 0')
              ->andWhere('pd.status = 1');

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
     * @param string $sortField
     * @param string $sortDirection
     * @param $filters
     * @return QueryBuilder
     * @throws QueryException
     */
    public function buildVasQueryBuilder($sortField, $sortDirection, $filters)
    {
        $operatorsMap = [
            'pricing_data_id' => [
                'alias' => 'pv.pricing_data_id',
                'operator' => 'eq'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(PricingVas::class, 'pv')
            ->innerJoin('pv.join_pricing_data', 'pd');
        
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('pv.id', 'ASC');
        }

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}