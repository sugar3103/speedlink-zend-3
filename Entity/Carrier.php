<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Carrier
 *
 * @ORM\Table(name="carrier")
 * @ORM\Entity
 */
class Carrier
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="carrier_name", type="string", length=50, nullable=true)
     */
    private $carrierName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="carrier_name_en", type="string", length=50, nullable=true)
     */
    private $carrierNameEn;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description_en", type="text", length=65535, nullable=true)
     */
    private $descriptionEn;

    /**
     * @var string|null
     *
     * @ORM\Column(name="carrier_code", type="string", length=50, nullable=true, options={"fixed"=true})
     */
    private $carrierCode;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status = '0';

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $isDeleted = '0';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="0000-00-00 00:00:00"})
     */
    private $createdAt = '0000-00-00 00:00:00';

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $createdBy;


}
