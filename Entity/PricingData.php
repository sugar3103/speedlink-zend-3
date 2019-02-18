<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * PricingData
 *
 * @ORM\Table(name="pricing_data")
 * @ORM\Entity
 */
class PricingData
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
     * @ORM\Column(name="pricing_id", type="integer", nullable=false)
     */
    private $pricingId;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", nullable=false)
     */
    private $carrierId;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", nullable=false)
     */
    private $serviceId;

    /**
     * @var int
     *
     * @ORM\Column(name="shipment_type_id", type="integer", nullable=false)
     */
    private $shipmentTypeId;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status = '0';

    /**
     * @var string|null
     *
     * @ORM\Column(name="pricing_data", type="text", length=65535, nullable=true)
     */
    private $pricingData;

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
