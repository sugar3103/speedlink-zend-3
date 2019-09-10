<?php
namespace Core\Utils;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\QueryBuilder;
use Log\Factory\NotificationControllerFactory;
use Core\Utils\SocketIO;

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
            $datetime = new \DateTime($dateCheck, new \DateTimeZone('Asia/Ho_Chi_Minh'));
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

    public static function formatDate($date) {
        $datetime = new \DateTime($date, new \DateTimeZone('UTC'));
        $laTime = new \DateTimeZone('Asia/Ho_Chi_Minh');
        $datetime->setTimezone($laTime);
        $dateLast = $datetime->format('Y-m-d');
        return $dateLast;
    }

    public static function BroadcastChannel($user_id,$type,$data)
    {
        // [
        //     'id' => $user_id,
        //     'type' => $type,
        //     'message' => is_array($message) ? json_encode($message) : $message
        // ]
        $param = [
            'channel' => 'private-'. $user_id,
            'event' => 'client-'. $type,
            'data' => $data            
        ];
        
        $socketio = new SocketIO('localhost',3000);
        $socketio->setQueryParams(['token' => rand(0,11)]);

        $success = $socketio->emit('client event', (object) $param);

        if(!$success)
        {
            return $socketio->getErrors();
        } else {
            return 'SUCCESS';
        }
    }
}