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
                pr.id,
                pr.name,
                pr.carrier_id,
                cr.code AS carrier_code,
                cr.name AS carrier_name,
                cr.name_en AS carrier_name_en,
                pr.category_code,
                pr.origin_country_id,
                ocr.name AS origin_country_name,
                ocr.name_en AS origin_country_name_en,
                pr.origin_city_id,
                ocy.name AS origin_city_name,
                ocy.name_en AS origin_city_name_en,
                pr.origin_district_id,
                ods.name AS origin_district_name,
                ods.name_en AS origin_district_name_en,
                pr.origin_ward_id,
                owd.name AS origin_ward_name,
                owd.name_en AS origin_ward_name_en,
                pr.effected_date,
                pr.expired_date,
                pr.saleman_id,
                sl.username,
                sl.first_name,
                sl.last_name,
                pr.is_private,
                pr.customer_id,
                pr.name AS customer_name,
                pr.status,
                pr.approval_status,
                pr.approval_by,
                app.username,
                app.first_name,
                app.last_name,
                pr.created_at,
                uc.username AS created_by,
                pr.updated_at,
                up.username as updated_by
            ")->andWhere('pr.is_deleted = 0');

            if($limit) {
                $queryBuilder->setMaxResults($limit)->setFirstResult(($start - 1) * $limit);
            }

            return $queryBuilder;
        } catch (QueryException $e) {
            return [];
        }
    }

    public function getListCodeByCondition($sortField = 'code', $filters = [])
    {
        try {
            $queryBuilder = $this->buildPricingQueryBuilder($sortField, 'asc', $filters);
            $queryBuilder->andWhere('pr.is_deleted = 0');
            if ($sortField == 'carrier_id') {
                $queryBuilder->select("
                    pr.carrier_id,
                    cr.code AS carrier_code,
                    cr.name AS carrier_name,
                    cr.name_en AS carrier_name_en
                ");
                $queryBuilder->andWhere('cr.is_deleted = 0');
                $queryBuilder->andWhere('cr.status = 1');
                $queryBuilder->groupBy('pr.carrier_id');
            } else if ($sortField == 'saleman_id') {
                $queryBuilder->select("
                    pr.saleman_id,
                    sl.username,
                    sl.first_name,
                    sl.last_name
                ");
                $queryBuilder->andWhere('sl.is_deleted = 0');
                $queryBuilder->andWhere('sl.status = 1');
                $queryBuilder->groupBy('pr.saleman_id');
            } else if ($sortField == 'approval_by'){
                $queryBuilder->select("
                    pr.approval_by,
                    app.username,
                    app.first_name,
                    app.last_name
                ");
                $queryBuilder->andWhere('app.is_deleted = 0');
                $queryBuilder->andWhere('app.status = 1');
                $queryBuilder->groupBy('pr.saleman_id');
            } else if ($sortField == 'customer_id') {
                $queryBuilder->select("
                    pr.customer_id,
                    cus.name AS customer_name
                ");
                $queryBuilder->andWhere('cus.is_deleted = 0');
                $queryBuilder->andWhere('cus.status = 1');
                $queryBuilder->groupBy('pr.customer_id');
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
            'name' => [ 'alias' => 'pr.name', 'operator' => 'eq' ],
            'status' => [ 'alias' => 'pr.status', 'operator' => 'eq' ],
            'carrier_id' => [ 'alias' => 'pr.carrier_id', 'operator' => 'eq' ],
            'category_code' => [ 'alias' => 'pr.category_code', 'operator' => 'eq' ],
            'customer_id' => [ 'alias' => 'pr.customer_id', 'operator' => 'in' ],
            'approved_id' => [ 'alias' => 'pr.approved_id', 'operator' => 'eq' ],
            'approved_status' => [ 'alias' => 'pr.approved_status', 'operator' => 'eq' ],
            'is_private' => [ 'alias' => 'pr.is_private', 'operator' => 'eq' ],
            'affected_date' => [ 'alias' => 'pr.affected_date', 'operator' => 'eq' ],
            'expired_date' => [ 'alias' => 'pr.expired_date', 'operator' => 'eq' ],
            'saleman_id' => [ 'alias' => 'pr.saleman_id', 'operator' => 'eq' ],
            'origin_country_id' => [ 'alias' => 'pr.origin_country_id', 'operator' => 'eq' ],
            'origin_city_id' => [ 'alias' => 'pr.origin_city_id', 'operator' => 'eq' ],
            'origin_district_id' => [ 'alias' => 'pr.origin_district_id', 'operator' => 'eq' ],
            'origin_ward_id' => [ 'alias' => 'pr.origin_ward_id', 'operator' => 'eq' ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Pricing::class, 'pr')
            ->leftJoin('pr.join_carrier', 'cr')
            ->leftJoin('pr.join_origin_country', 'ocr')
            ->leftJoin('pr.join_origin_city', 'ocy')
            ->leftJoin('pr.join_origin_district', 'ods')
            ->leftJoin('pr.join_origin_ward', 'owd')
            ->leftJoin('pr.join_saleman', 'sl')
            ->leftJoin('pr.join_customer', 'cus')
            ->leftJoin('pr.join_approval', 'app')
            ->leftJoin('pr.join_created', 'uc')
            ->leftJoin('pr.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('pr.id', 'ASC');
        }

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}