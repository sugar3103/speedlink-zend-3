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
    public function getListVasByCondition($filters)
    {
        try {
            $queryBuilder = $this->buildVasQueryBuilder($filters);
            $queryBuilder->select("
                pv.id,
                pv.pricing_data_id,
                pv.name,
                pv.formula,
                pv.min,
                pv.type
            ")->andWhere('pv.is_deleted = 0')
              ->andWhere('pd.status = 1');

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
    public function buildVasQueryBuilder($filters)
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
        $queryBuilder->orderBy('pv.id', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}