<?php
namespace PricingSpecial\Repository;

use Address\Entity\AddressCode;
use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query\QueryException;
use PricingSpecial\Entity\SpecialZone;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class SpecialZoneRepository extends EntityRepository
{
    public function checkExit($data)
    {
        $entityManager = $this->getEntityManager();
        try {
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->select('sz.id')->from(SpecialZone::class, 'sz')
                ->where('sz.name = :name
                    AND sz.name_en = :name_en
                    AND sz.from_city = :from_city_id
                    AND sz.to_city = :to_city_id
                    AND sz.to_district = :to_district_id
                    AND sz.to_ward = :to_ward_id
                    AND sz.customer = :customer_id
                    AND sz.special_area = :special_area_id
                    ')
                ->setParameter("name", $data['name'])
                ->setParameter("name_en", $data['name_en'])
                ->setParameter("from_city_id", $data['from_city'])
                ->setParameter("to_city_id", $data['to_city'])
                ->setParameter("to_district_id", $data['to_district'])
                ->setParameter("to_ward_id", $data['to_ward'])
                ->setParameter("customer_id", $data['customer'])
                ->setParameter("special_area_id", $data['special_area']);

        } catch (QueryException $e) {
            return [];
        }
        return $queryBuilder->getQuery()->execute();
    }

    
    public function checkExitWithAddress($data)
    {
        $entityManager = $this->getEntityManager();
        try {
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->select('sz.id')->from(SpecialZone::class, 'sz')
                ->where('sz.from_city = :from_city_id
                    AND sz.to_city = :to_city_id
                    AND sz.to_district = :to_district_id
                    AND sz.to_ward = :to_ward_id
                    AND sz.customer = :customer_id')
                ->setParameter("from_city_id", $data['from_city'])
                ->setParameter("to_city_id", $data['to_city'])
                ->setParameter("to_district_id", $data['to_district'])
                ->setParameter("to_ward_id", $data['to_ward'])
                ->setParameter("customer_id", $data['customer_id']);

        } catch (QueryException $e) {
            return [];
        }

        return $queryBuilder->getQuery()->execute();
    }

    public function vertifyAddress($city, $district, $ward)
    {
        $operatorsMap = [
            'name_city' => [
                'alias' => 'c.name',
                'operator' => 'eq',
            ],
            'name_district' => [
                'alias' => 'd.name',
                'operator' => 'eq',
            ],
            'name_ward' => [
                'alias' => 'w.name',
                'operator' => 'eq',
            ],
        ];

        try {
            $queryBuilder = $this->getEntityManager()->createQueryBuilder();
            $queryBuilder->from(AddressCode::class, 'ac')
                ->leftJoin('ac.city', 'c')
                ->leftJoin('ac.district', 'd')
                ->leftJoin('ac.ward', 'w');
            $queryBuilder->orderBy('ac.id', 'DESC');

            $queryBuilder = Utils::setCriteriaByFilters([
                'name_city' => $city,
                'name_district' => $district,
                'name_ward' => $ward,
            ], $operatorsMap, $queryBuilder);

            $queryBuilder->select("c.id AS city_id, d.id AS district_id, w.id AS ward_id");
            // var_dump($queryBuilder->getQuery()->getSql());
            // die;
            return $queryBuilder;
        } catch (QueryException $e) {
            return [];
        }
        
    }
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListSpecialZoneByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'sz.id',
        $sortDirection = 'asc',
        $filters = []
    ) {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                sz.id,
                sz.name,
                sz.name_en,
                fc.id as from_city,
                fc.name as from_city_name,
                tc.id as to_city,
                tc.name as to_city_name,
                td.id as to_district,
                td.name as to_district_name,
                tw.id as to_ward,
                tw.name as to_ward_name,
                sa.id as special_area_id,
                sa.name as special_area_name,
                ct.id as customer_id,
                ct.name as customer_name,
                ct.customer_no as customer_no,
                sz.created_at,
                sz.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updated_by
            ")->andWhere("sz.is_deleted = 0")
                ->groupBy('sz.id');

            if ($limit) {
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
    public function buildCustomerQueryBuilder($sortField = 'sz.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'sz.id',
                'operator' => 'eq',
            ],
            'name' => [
                'alias' => 'sz.name',
                'operator' => 'contains',
            ],
            'name_en' => [
                'alias' => 'sz.name_en',
                'operator' => 'contains',
            ],
            'customer_id' => [
                'alias' => 'ct.id',
                'operator' => 'eq',
            ],
            'special_area_id' => [
                'alias' => 'sa.id',
                'operator' => 'eq',
            ],
            'from_city' => [
                'alias' => 'fc.id',
                'operator' => 'eq',
            ],
            'to_city' => [
                'alias' => 'tc.id',
                'operator' => 'eq',
            ],
            'to_district' => [
                'alias' => 'td.id',
                'operator' => 'eq',
            ],
            'to_ward' => [
                'alias' => 'tw.id',
                'operator' => 'eq',
            ],
            'created_at' => [
                'alias' => 'sz.created_at',
                'operator' => 'contains',
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(SpecialZone::class, 'sz')
            ->leftJoin('sz.customer', 'ct')
            ->leftJoin('sz.from_city', 'fc')
            ->leftJoin('sz.to_city', 'tc')
            ->leftJoin('sz.to_district', 'td')
            ->leftJoin('sz.to_ward', 'tw')
            ->leftJoin('sz.special_area', 'sa')
            ->leftJoin('sz.created_by', 'cr')
            ->leftJoin('sz.updated_by', 'up');

        if ($sortField != null && $sortDirection != null) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('sc.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}
