<?php
namespace CustomerService\Repository;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\QueryBuilder;

class Utils
{
    /**
     * Set criteria list by filters
     *
     * @param array $filters
     * @param array $operatorsMap
     * @param QueryBuilder $queryBuilder
     * @return QueryBuilder
     * @throws \Doctrine\ORM\Query\QueryException
     */
    public function setCriteriaByFilters($filters, $operatorsMap, QueryBuilder $queryBuilder)
    {
        foreach ($filters as $key => $value) {
            if (isset($operatorsMap[$key]) && $value !== "") {
                $expr = Criteria::create()->andWhere(Criteria::expr()->{$operatorsMap[$key]['operator']}($operatorsMap[$key]['alias'], $value));
            } elseif ($value === "") {
                continue;
            } else {
                $expr = Criteria::create()->andWhere(Criteria::expr()->contains($operatorsMap[$key]['alias'], $value));
            }
            $queryBuilder->addCriteria($expr);
        }
        return $queryBuilder;
    }
}