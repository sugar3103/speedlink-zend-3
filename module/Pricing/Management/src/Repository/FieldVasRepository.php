<?php
namespace Management\Repository;

use Core\Utils\Utils;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\ORM\QueryBuilder;
use Management\Entity\FieldVas;

/**
 * This is the custom repository class for FieldVas entity.
 * @package Management\Repository
 */
class FieldVasRepository extends EntityRepository
{
    public function getListFieldVasByCondition($start, $limit, $sortField = 'fv.id', $sortDirection = 'asc', $filters = [])
    {
        try {
            $queryBuilder = $this->buildFieldVasQueryBuilder($sortField, $sortDirection, $filters);
            $queryBuilder->select("
                fv.id,
                fv.name,
                fv.description,
                fv.description_en
            ")->andWhere('fv.is_deleted = 0');

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
    public function buildFieldVasQueryBuilder($sortField, $sortDirection, $filters)
    {
        $operatorsMap = [            
            'id' => [
                'alias' => 'fv.id',
                'operator' => 'contains'
            ],
            'name' => [
                'alias' => 'fv.name',
                'operator' => 'contains'
            ]           
        ];

        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        $queryBuilder->from(FieldVas::class, 'fv');

        if ($sortField != NULL && $sortDirection != NULL) {
            $queryBuilder->orderBy($operatorsMap[$sortField]['alias'], $sortDirection);
        } else {
            $queryBuilder->orderBy('fv.id', 'ASC');
        }
        
        return Utils::setCriteriaByFilters($filters, $operatorsMap, $queryBuilder);
    }
}