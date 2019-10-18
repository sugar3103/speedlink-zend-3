<?php
namespace NetworkPort\Repository;

use Core\Utils\Utils;
use NetworkPort\Entity\Hub;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;

/**
 * This is the custom repository class for User entity.
 * @package NetworkPort\Repository
 */
class HubRepository extends EntityRepository
{
    /**
     * Get list user by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListHubByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'h.hubId',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildHubQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                h.id,
                h.code,
                h.name,
                h.name_en,
                h.status,
                h.created_at,
                h.created_by,
                h.updated_at,
                h.updated_by,
                h.description,
                h.description_en,
                h.city_id,
                h.country_id,
                uc.username AS created_by,
                ud.username AS updated_by,
                c.name as city,
                c.name_en as city_en,
                co.name as country,
                co.name_en as country_en,
                CONCAT(COALESCE(uc.first_name,''), ' ', COALESCE(uc.last_name,'')) as full_name_created,
                CONCAT(COALESCE(ud.first_name,''), ' ', COALESCE(ud.last_name,'')) as full_name_updated  
            ")->andWhere("h.is_deleted = 0")
            ->groupBy('h.id');
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
    public function buildHubQueryBuilder($sortField = 'h.id', $sortDirection = 'asc', $filters)
    {
        $operatorsMap = [
            'name' => [
                'alias' => 'h.name',
                'operator' => 'contains'
            ],
            'name_en' => [
                'alias' => 'h.name_en',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'h.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'h.status',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 'h.code',
                'operator' => 'contains'
            ],
            'city' => [
                'alias' => 'h.city_id',
                'operator' => 'eq'
            ],
            'country' => [
                'alias' => 'h.country_id',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Hub::class, 'h')
         ->leftJoin('h.city', 'c')
         ->leftJoin('h.country', 'co')
         ->leftJoin('h.user_create', 'uc')
         ->leftJoin('h.user_update', 'ud');
            
        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('h.id', 'DESC');
        }
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }

}