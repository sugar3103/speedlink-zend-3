<?php
namespace Core\DBAL\Types;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\ConversionException;
use Doctrine\DBAL\Types\DateTimeType;
use \Datetime;
use \DateTimeZone;

class UTCDateTimeType extends DateTimeType
{
     static private $utc = null;
     /**
      * @param DateTime $value
      * @param DoctrineDBALPlatformsAbstractPlatform $platform
      * @return string
      */
     public function convertToDatabaseValue($value, AbstractPlatform $platform)
     {
         
        if ($value === null) {
            return null;
        }
        $formatString = $platform->getDateTimeFormatString();
        if (is_string($value)) {            
            $value = DateTime::createFromFormat('Y-m-d H:i:s', $value, new DateTimeZone('UTC'));
        }        
        $value->setTimezone((self::$utc) ? self::$utc : (self::$utc = new DateTimeZone('UTC')));
        $formatted = $value->format($formatString);
        return $formatted;
    }
    /**
     * @param string $value
     * @param DoctrineDBALPlatformsAbstractPlatform $platform
     * @return DateTime|mixed|null
     * @throws DoctrineDBALTypesConversionException
     */
    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        if ($value === null) {
            return null;
        }
        $val = DateTime::createFromFormat(
            $platform->getDateTimeFormatString(),
            $value,
            (self::$utc) ? self::$utc : (self::$utc = new DateTimeZone('UTC'))
        );
        if (!$val) {
            throw ConversionException::conversionFailed($value, $this->getName());
        }
        return $val;
    }
}