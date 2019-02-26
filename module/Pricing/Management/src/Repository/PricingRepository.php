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
                pr.service_id,
                sr.code AS service_code,
                sr.name AS service_name,
                sr.name_en AS service_name_en,
                pr.shipment_type_id,
                st.code AS shipment_type_code,
                st.name AS shipment_type_name,
                st.name_en AS shipment_type_name_en,
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
                pr.destination_country_id,
                dct.name AS destination_country_name,
                dct.name_en AS destination_country_name_en,
                pr.destination_city_id,
                dcy.name AS destination_city_name,
                dcy.name_en AS destination_city_name_en,
                pr.destination_district_id,
                dds.name AS destination_district_name,
                dds.name_en AS destination_district_name_en,
                pr.destination_ward_id,
                dwd.name AS destination_ward_name,
                dwd.name_en AS destination_ward_name_en,
                pr.effected_date,
                pr.expired_date,
                pr.saleman_id,
                sl.username,
                sl.first_name,
                sl.last_name,
                pr.is_private,
                pr.customer_id,
                pr.status,
                pr.approval_status,
                pr.approval_by,
                app.username,
                app.first_name,
                app.last_name,
                pr.description,
                pr.description_en,
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
                'alias' => 'pr.status', 'operator' => 'eq'
            ],
            'carrier_id' => [
                'alias' => 'pr.carrier_id', 'operator' => 'eq'
            ],
            'category_code' => [
                'alias' => 'pr.category_code', 'operator' => 'eq'
            ],
            'customer_id' => [
                'alias' => 'pr.customer_id', 'operator' => 'in'
            ],
            'approved_id' => [
                'alias' => 'pr.approved_id', 'operator' => 'eq'
            ],
            'approved_status' => [
                'alias' => 'pr.approved_status', 'operator' => 'eq'
            ],
            'is_private' => [
                'alias' => 'pr.is_private', 'operator' => 'eq'
            ],
            'affected_date' => [
                'alias' => 'pr.affected_date', 'operator' => 'eq'
            ],
            'expired_date' => [
                'alias' => 'pr.expired_date', 'operator' => 'eq'
            ],
            'saleman_id' => [
                'alias' => 'pr.saleman_id', 'operator' => 'eq'
            ],
            'origin_country_id' => [
                'alias' => 'pr.origin_country_id', 'operator' => 'eq'
            ],
            'origin_city_id' => [
                'alias' => 'pr.origin_city_id', 'operator' => 'eq'
            ],
            'origin_district_id' => [
                'alias' => 'pr.origin_district_id', 'operator' => 'eq'
            ],
            'origin_ward_id' => [
                'alias' => 'pr.origin_ward_id', 'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Pricing::class, 'pr')
            ->leftJoin('pr.join_carrier', 'cr')
            ->leftJoin('pr.join_service', 'sr')
            ->leftJoin('pr.join_shipment_type', 'st')
            ->leftJoin('pr.join_origin_country', 'ocr')
            ->leftJoin('pr.join_origin_city', 'ocy')
            ->leftJoin('pr.join_origin_district', 'ods')
            ->leftJoin('pr.join_origin_ward', 'owd')
            ->leftJoin('pr.join_destination_country', 'dct')
            ->leftJoin('pr.join_destination_city', 'dcy')
            ->leftJoin('pr.join_destination_district', 'dds')
            ->leftJoin('pr.join_destination_ward', 'dwd')
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