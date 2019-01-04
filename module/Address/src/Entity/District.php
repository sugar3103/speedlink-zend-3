<?php

namespace Address\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * District
 *
 * @ORM\Table(name="district")
 * @ORM\Entity(repositoryClass="\Address\Repository\DistrictRepository")
 */
class District
{
    /**
     * @var int
     *
     * @ORM\Column(name="district_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $districtId;

    /**
     * @var int
     *
     * @ORM\Column(name="city_id", type="integer", nullable=false)
     */
    private $cityId;

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
     * @var int|null
     *
     * @ORM\Column(name="status", type="integer", nullable=true)
     */
    private $status;

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


}
