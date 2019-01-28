<?php
namespace Core\Utils;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\QueryBuilder;

class Utils
{
     /**
     * Check date format
     *
     * @param $dateAction
     * @param $dateFormat
     * @return string
     */
    public static function checkDateFormat($dateAction,$dateFormat)
    {
        $dateLast = '';
        $dateCheck = ! empty($dateAction) ? $dateAction->format('Y-m-d H:i:s') : '';
        if ($dateCheck) {
            $datetime = new \DateTime($dateCheck, new \DateTimeZone('UTC'));
            $laTime = new \DateTimeZone('Asia/Ho_Chi_Minh');
            $datetime->setTimezone($laTime);
            $dateLast = $datetime->format($dateFormat);
        }
        return $dateLast;
    }

    /**
     * Set criteria list by filters
     *
     * @param array $filters
     * @param array $operatorsMap
     * @param QueryBuilder $queryBuilder
     * @return QueryBuilder
     * @throws \Doctrine\ORM\Query\QueryException
     */
    public static function setCriteriaByFilters($filters, $operatorsMap, QueryBuilder $queryBuilder)
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