<?php
namespace Customer\Repository;

use Customer\Entity\Customer;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

/**
 * This is the custom repository class for Customer entity.
 * @package Customer\Repository
 */
class CustomerRepository extends EntityRepository {

    /**
     * Get list customer by condition
     *
     * @param string $sortField
     * @param array $filters
     * @return array|QueryBuilder
     */
    public function getListCustomerByCondition(
        $start = 1,
        $limit = 10,
        $sortField = 'c.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildCustomerQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select(
                "c.id,
                 c.name,
                 c.status,
                 cr.username as created_by,
                 c.created_at,
                 up.username as updated_by,
                 c.updated_at,
                 CONCAT(COALESCE(cr.first_name,''), ' ', COALESCE(cr.last_name,'')) as full_name_created,
                 CONCAT(COALESCE(up.first_name,''), ' ', COALESCE(up.last_name,'')) as full_name_updated"                 
            )->andWhere('s.is_deleted = 0')
            ->groupBy('s.id')
            ->setMaxResults($limit)
            ->setFirstResult(($start - 1) * $limit);
                
            return $queryBuilder;

        } catch (QueryException $e) {
            
            return [];
        }
    }

    /**
     * Build query builder
     *
     * @param $sort
     * @param $filters
     * @return QueryBuilder
     * @throws QueryException
     */
    public function buildCustomerQueryBuilder($sortField = 'c.id', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'name' => [
                'alias' => 'c.name',
                'operator' => 'contains'
            ],
            'created_at' => [
                'alias' => 'c.created_at',
                'operator' => 'contains'
            ],
            'status' => [
                'alias' => 'c.status',
                'operator' => 'eq'
            ],
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Customer::class, 'c')
            ->leftJoin('s.join_created', 'cr')
            ->leftJoin('s.join_updated', 'up');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('c.name', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}