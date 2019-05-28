<?php
namespace Address\Repository;

use Address\Entity\Ward;
use Core\Utils\Utils;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for Ward entity.
 * @package Address\Repository
 */
class WardRepository extends EntityRepository {

    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListWardByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'w.name',
        $sortDirection = 'ASC',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildWardQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                w.id,
                w.name,
                w.name_en,
                w.description,
                w.description_en,
                w.district_id,
                w.postal_code,
                w.ras,
                w.status,
                cr.username as created_by,
                w.created_at,
                up.username as updated_by,
                w.updated_at,
                CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated
            ")->andWhere("w.is_deleted = 0")
            ->groupBy('w.id');
            if($limit){
                $queryBuilder->setMaxResults($limit)
                ->setFirstResult(($start - 1) * $limit);
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
    public function buildWardQueryBuilder($sortField = 'w.name', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'district' => [
                'alias' => 'w.district_id',
                'operator' => 'eq'
            ],
            'name' => [
                'alias' => 'w.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'w.name_en',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'w.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'w.status',
                'operator' => 'eq'
            ],

        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Ward::class, 'w')
        ->leftJoin('w.join_created', 'cr')
        ->leftJoin('w.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('w.id', 'ASC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}