<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\PricingData;

/**
 * This is the custom repository class for PricingData entity.
 * @package Management\Repository
 */
class PricingDataRepository extends EntityRepository
{
    public function getListPricingDataByCondition($start, $limit, $sortField = 'pd.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildPricingDataQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                pd.id,
                pd.pricing_id,
                pd.service_id,
                sr.code AS service_code,
                sr.name AS service_name,
                sr.name_en AS service_name_en,
                pd.shipment_type_id,
                st.code AS shipment_type_code,
                st.name AS shipment_type_name,
                st.name_en AS shipment_type_name_en,
                pd.status,
                pd.pricing_data,
                pd.created_at,
                uc.username AS created_by,
                pd.updated_at,
                up.username as updated_by
            ")->andWhere('pd.is_deleted = 0');

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
    public function buildPricingDataQueryBuilder($sortField, $sortDirection, $filters)
    {
        $operatorsMap = [
            'pricing_id' => [
                'alias' => 'pd.pricing_id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'pd.name',
                'operator' => 'contains'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(PricingData::class, 'pd')
            ->leftJoin('pd.join_service', 'sr')
            ->leftJoin('pd.join_shipment_type', 'st')
            ->leftJoin('pd.join_created', 'uc')
            ->leftJoin('pd.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('pd.id', 'ASC');
        }

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}