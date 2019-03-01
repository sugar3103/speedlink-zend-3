<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\PricingCodMin;

/**
 * This is the custom repository class for PricingCodMin entity.
 * @package Management\Repository
 */
class PricingCodMinRepository extends EntityRepository
{
    public function getListCodMinByCondition($filters)
    {
        try {
            $queryBuilder = $this->buildCodMinQueryBuilder($filters);
            $queryBuilder->select("
                pc.id,
                pc.pricing_data_id,
                pc.internal_city_min,
                pc.internal_city_ras_min,
                pc.external_city_min,
                pc.external_city_ras_min
            ")->andWhere('pc.is_deleted = 0')
              ->andWhere('pd.status = 1');

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
    public function buildCodMinQueryBuilder($filters)
    {
        $operatorsMap = [
            'pricing_data_id' => [
                'alias' => 'pc.pricing_data_id',
                'operator' => 'eq'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(PricingCodMin::class, 'pc')
            ->innerJoin('pc.join_pricing_data', 'pd');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}