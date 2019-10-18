<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\PricingCod;

/**
 * This is the custom repository class for PricingCod entity.
 * @package Management\Repository
 */
class PricingCodRepository extends EntityRepository
{
    public function getListCodByCondition($filters)
    {
        try {
            $queryBuilder = $this->buildCodQueryBuilder($filters);
            $queryBuilder->select("
                pc.id,
                pc.pricing_data_id,
                pc.from,
                pc.to,
                pc.internal_city,
                pc.internal_city_ras,
                pc.external_city,
                pc.external_city_ras
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
    public function buildCodQueryBuilder($filters)
    {
        $operatorsMap = [
            'pricing_data_id' => [
                'alias' => 'pc.pricing_data_id',
                'operator' => 'eq'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(PricingCod::class, 'pc')
            ->innerJoin('pc.join_pricing_data', 'pd');
        $queryBuilder->orderBy('pc.from', 'ASC');
        $queryBuilder->addOrderBy('pc.to', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}