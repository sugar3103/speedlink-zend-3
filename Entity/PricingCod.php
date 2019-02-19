<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * PricingCod
 *
 * @ORM\Table(name="pricing_cod")
 * @ORM\Entity
 */
class PricingCod
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
     * @var int
     *
     * @ORM\Column(name="pricing_data_id", type="integer", nullable=false)
     */
    private $pricingDataId;

    /**
     * @var string
     *
     * @ORM\Column(name="from", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $from;

    /**
     * @var string
     *
     * @ORM\Column(name="to", type="decimal", precision=10, scale=2, nullable=false, options={"comment"="0 == over"})
     */
    private $to;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internalCity;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_city_ras", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $internalCityRas;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $externalCity;

    /**
     * @var string
     *
     * @ORM\Column(name="external_city_ras", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $externalCityRas;

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
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $isDeleted = '0';


}
