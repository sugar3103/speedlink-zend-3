<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\PricingVasSpec;

/**
 * This is the custom repository class for PricingVasSpec entity.
 * @package Management\Repository
 */
class PricingVasSpecRepository extends EntityRepository
{
    public function getListVasSpecByCondition($filters)
    {
        try {
            $queryBuilder = $this->buildVasSpecQueryBuilder($filters);
            $queryBuilder->select("
                pvs.id,
                pvs.pricing_data_id,
                pvs.from,
                pvs.to,
                pvs.value
            ")->andWhere('pvs.is_deleted = 0')
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
    public function buildVasSpecQueryBuilder($filters)
    {
        $operatorsMap = [
            'pricing_data_id' => [
                'alias' => 'pvs.pricing_data_id',
                'operator' => 'eq'
            ],
            'pricing_vas_id' => [
                'alias' => 'pvs.pricing_vas_id',
                'operator' => 'eq'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(PricingVasSpec::class, 'pvs')
            ->innerJoin('pvs.join_pricing_data', 'pd');
        $queryBuilder->orderBy('pvs.from', 'ASC');
        $queryBuilder->addOrderBy('pvs.to', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}