<?php
namespace NetworkPort\Repository;

use NetworkPort\Entity\Branch;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class BranchRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListBranchByCondition(
        $start = 0,
        $limit = 10,
        $sortField = 'u.branchId',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildBranchQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "u.branchId,
                u.code,
                u.name,
                u.nameEn,
                u.status,
                u.createdAt,
                u.createdBy,
                u.updatedAt,
                u.updatedBy,
                u.hubId,
                u.districtId,
                u.cityId,
                u.wardId,
                u.countryId,
                h.name AS hub_name,
                d.name AS district,
                c.name AS city,
                w.name AS ward,
                co.name AS country,
                u.description,
                u.descriptionEn
                "
            )
            ->setMaxResults($limit)
            ->setFirstResult($start);
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
    public function buildBranchQueryBuilder($sortField = 'u.branchId', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'code' => [
                'alias' => 'u.code',
                'operator' => 'contains'
            ],
            'name' => [
                'alias' => 'u.name',
                'operator' => 'contains'
            ],
            'branch_id' => [
                'alias' => 'u.branchId',
                'operator' => 'eq'
            ],
            'created_at' => [
                'alias' => 'u.createdAt',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'u.status',
                'operator' => 'eq'
            ],
            'country' => [
                'alias' => 'u.country',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Branch::class, 'u')
        ->leftJoin('u.district', 'd')
        ->leftJoin('u.city', 'c')
        ->leftJoin('u.ward', 'w')
        ->leftJoin('u.country', 'co')
        ->leftJoin('u.hub', 'h');
            // ->groupBy('u.id')
            // ->where('u.deletedAt is null')
            // ->andWhere('u.id <> 1')
            
        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('u.branchId', 'DESC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }



}