<?php
namespace Core\Utils;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\QueryBuilder;
use Log\Factory\NotificationControllerFactory;

class Utils {

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

    public static function formatDateTime($list)
    {
        if (count($list) > 0) {
            foreach ($list as $key => $obj) {
                $date_format = 'd/m/Y H:i:s';
                if (!empty($obj['created_at'])) {
                    $list[$key]['created_at'] = Utils::checkDateFormat($obj['created_at'], $date_format);
                }
                if (!empty($obj['updated_at'])) {
                    $list[$key]['updated_at'] = Utils::checkDateFormat($obj['updated_at'], $date_format);
                }
            }
        }
        return $list;
    }

    public static function createNotification($user_id,$type,$text)
    {
        
    }
}