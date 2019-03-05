<?php
namespace ZoneCode\Repository;

use Core\Utils\Utils;
use ZoneCode\Entity\ZoneCode;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package ZoneCode\Repository
 */
class ZoneCodeRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListZoneCodeByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'b.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildZoneCodeQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                z.id,
                z.code,
                z.category,
                z.is_private,
                z.customer_id,
                z.status,
                z.created_at,
                z.created_by,
                z.updated_at,
                z.updated_by,
                z.description,
                z.description_en,

                z.carrier_id,
                z.service_id,
                z.shipment_type_id,
                z.customer_id,
                z.origin_country_id,
                z.origin_city_id,
                z.origin_district_id,
                z.origin_ward_id,
                z.destination_country_id,
                z.destination_city_id,
                z.destination_district_id,
                z.destination_ward_id,

                c.code AS carrier_code,
                s.code AS service_code,
                st.code AS shipmenttype_code,
                cu.name AS customer_name,
                oc.name AS origin_country_name,
                oc.name_en AS origin_country_name_en,
                dc.name AS destination_country_name,
                dc.name_en AS destination_country_name_en,
                oci.name AS origin_city_name,
                oci.name_en AS origin_city_name_en,
                dci.name AS destination_city_name,
                dci.name_en AS destination_city_name_en,
                od.name AS origin_district_name,
                od.name_en AS origin_district_name_en,
                dd.name AS destination_district_name,
                dd.name_en AS destination_district_name_en,
                ow.name AS origin_ward_name,
                ow.name_en AS origin_ward_name_en,
                dw.name AS destination_ward_name,
                dw.name_en AS destination_ward_name_en,
                uc.username AS user_create_name,
                ud.username AS user_update_name
            ")->andWhere("z.is_deleted = 0")
            ->groupBy('z.id');
            
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
    public function buildZoneCodeQueryBuilder($sortField = 'z.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'z.id',
                'operator' => 'eq'
            ],
            'is_private' => [
                'alias' => 'z.is_private',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 'z.code',
                'operator' => 'contains'
            ],
            'carrier_id' => [
                'alias' => 'z.carrier_id',
                'operator' => 'eq'
            ],
            'category' => [
                'alias' => 'z.category',
                'operator' => 'contains'
            ],
            'service_id' => [
                'alias' => 'z.service_id',
                'operator' => 'eq'
            ],
            'shipmenttype' => [
                'alias' => 'z.shipment_type_id',
                'operator' => 'eq'
            ],
            'customer' => [
                'alias' => 'z.customer_id',
                'operator' => 'eq'
            ],
            'status' => [
                'alias' => 'z.status',
                'operator' => 'eq'
            ],
            'origin_country' => [
                'alias' => 'z.origin_country_id',
                'operator' => 'eq'
            ],
            'origin_city' => [
                'alias' => 'z.origin_city_id',
                'operator' => 'eq'
            ],
            'origin_district' => [
                'alias' => 'z.origin_district_id',
                'operator' => 'eq'
            ],
            'origin_ward' => [
                'alias' => 'z.origin_ward_id',
                'operator' => 'eq'
            ],
            'destination_country' => [
                'alias' => 'z.destination_country_id',
                'operator' => 'eq'
            ],
            'destination_city' => [
                'alias' => 'z.destination_city_id',
                'operator' => 'eq'
            ],
            'destination_district' => [
                'alias' => 'z.destination_district_id',
                'operator' => 'eq'
            ],
            'destination_ward' => [
                'alias' => 'z.destination_ward_id',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'z.created_at',
                'operator' => 'contains'
            ]
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(ZoneCode::class, 'z')
        ->leftJoin('z.carrier', 'c')
        ->leftJoin('z.service', 's')
        ->leftJoin('z.shipmenttype', 'st')
        ->leftJoin('z.customer', 'cu')
        ->leftJoin('z.origin_country', 'oc')
        ->leftJoin('z.destination_country', 'dc')
        ->leftJoin('z.origin_city', 'oci')
        ->leftJoin('z.destination_city', 'dci')
        ->leftJoin('z.origin_district', 'od')
        ->leftJoin('z.destination_district', 'dd')
        ->leftJoin('z.origin_ward', 'ow')
        ->leftJoin('z.destination_ward', 'dw')
        ->leftJoin('z.user_create', 'uc')
        ->leftJoin('z.user_update', 'ud');
        // ->groupBy('b.id')
        // ->where('b.deletedAt is null')
        // ->andWhere('b.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('z.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}