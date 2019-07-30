<?php
namespace PricingSpecial\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query\QueryException;
use PricingSpecial\Entity\SpecialPricingVas;
use PricingSpecial\Entity\SpecialPricingVasSpec;

/**
 * This is the custom repository class for User entity.
 * @package PricingSpecial\Repository
 */
class PricingSpecialVasRepository extends EntityRepository
{
    public function deletedVas($pricing_id)
    {
        $entityManager = $this->getEntityManager();
        try {
            $queryBuilder = $entityManager->createQueryBuilder();
            $queryBuilder->update(SpecialPricingVas::class, 'spv')->set('spv.is_deleted', 1)
                ->where('spv.special_pricing = :special_pricing_id')->setParameter("special_pricing_id", $pricing_id);

            // $queryBuilder->update(SpecialPricingVasSpec::class, 'spvs')->set('spvs.is_deleted', 1)
            //     ->where('spvs.special_pricing = :special_pricing_id')->setParameter("special_pricing_id", $pricing_id);
        } catch (QueryException $e) {
            return [];
        }
        return $queryBuilder->getQuery()->execute();
    }
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function findOneByPricing(
        $pricing_id,
        $sortField = 'spv.id',
        $sortDirection = 'asc',
        $filters = []
    ) {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                spv.id,
                spv.name,
                spv.name_en,
                spv.created_at,
                spv.updated_at,
                cr.username as created_by,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated,
                up.username as updpted_by
            ")->andWhere("spv.is_deleted = 0")
                ->andWhere("dp.id = " . $pricing_id)
                ->groupBy('spv.id');

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
    public function buildCustomerQueryBuilder($sortField = 'dp.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'id' => [
                'alias' => 'spv.id',
                'operator' => 'eq',
            ],
            'name' => [
                'alias' => 'spv.name',
                'operator' => 'contains',
            ],
            'name_en' => [
                'alias' => 'spv.name_en',
                'operator' => 'contains',
            ],

            'created_at' => [
                'alias' => 'spv.created_at',
                'operator' => 'contains',
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(SpecialPricingVas::class, 'spv')
            ->leftJoin('spv.special_pricing', 'dp')
            ->leftJoin('spv.created_by', 'cr')
            ->leftJoin('spv.updated_by', 'up');

        if ($sortField != null && $sortDirection != null) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('spv.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}
