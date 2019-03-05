<?php
namespace System\Repository;

use System\Entity\Setting;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Core\Utils\Utils;

class SettingRepository extends EntityRepository
{
    /**
     * Get list permission by condition
     *
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     */
    public function getListSettingByCondition(
        $sortField = 'p.id',
        $sortDirection = 'asc',
        $filters = []
    )
    {
        try {
            $queryBuilder = $this->buildSettingQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select([
                "s.id,
                 s.code,
                 s.key,
                 s.value,
                 s.serialized"
            ])->groupBy('s.id');
            
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
    public function buildSettingQueryBuilder($sortField = 's.id', $sortDirection = 'asc', $filters)
    {

        $operatorsMap = [
            'id' => [
                'alias' => 's.id',
                'operator' => 'eq'
            ],
            'code' => [
                'alias' => 's.code',
                'operator' => 'contains'
            ],
            'key' => [
                'alias' => 's.key',
                'operator' => 'contains'
            ]            
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(Setting::class, 's');

        if ($sortField != NULL && $sortDirection != NULL)
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        else
            $queryBuilder->orderBy('s.id', 'ASC');

        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }   
}