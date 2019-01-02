<?php

namespace Address\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Country
 *
 * @ORM\Table(name="country")
 * @ORM\Entity(repositoryClass="\Address\Repository\CountryRepository")
 */
class Country
{
    const ACTIVE = 1;
    const INACTIVE = 0;
    
    /**
     * @var int
     *
     * @ORM\Column(name="country_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $countryId;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="integer", nullable=false)
     */
    private $status;

    /**
     * @var string
     *
     * @ORM\Column(name="iso_code", type="string", length=50, nullable=false)
     */
    private $isoCode;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="update_by", type="integer", nullable=true)
     */
    private $updateBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="ref_as_by", type="integer", nullable=true)
     */
    private $refAsBy;

    
     /**
     * Returns user status as string.
     * @return string
     */
    public function getIsActiveAsString()
    {
        $list = self::getIsActiveList();
        if (isset($list[$this->isActive]))
            return $list[$this->isActive];

        return 'Unknown';
    }

    /**
     * Returns possible statuses as array.
     * @return array
     */
    public static function getIsActiveList($value = null)
    {
        $status = [
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive'
        ];

        if(!empty($value) && isset($status[$value])) {
            return $status[$value];
        }
        return $status;
    }
}
