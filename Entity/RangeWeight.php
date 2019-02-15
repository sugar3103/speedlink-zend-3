<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * RangeWeight
 *
 * @ORM\Table(name="range_weight")
 * @ORM\Entity
 */
class RangeWeight
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
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=20, nullable=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="carrier_id", type="integer", nullable=false)
     */
    private $carrier_id;

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", length=10, nullable=false, options={"fixed"=true,"comment"="Inbound, Outbound, Domestic"})
     */
    private $category;

    /**
     * @var int
     *
     * @ORM\Column(name="service_id", type="integer", nullable=false)
     */
    private $service_id;

    /**
     * @var int
     *
     * @ORM\Column(name="shipment_type_id", type="integer", nullable=false)
     */
    private $shipment_type_id;

    /**
     * @var bool
     *
     * @ORM\Column(name="calculate_unit", type="boolean", nullable=false)
     */
    private $calculateUnit = '0';

    /**
     * @var string|null
     *
     * @ORM\Column(name="unit", type="decimal", precision=10, scale=2, nullable=true, options={"default"="0.00","comment"="required if calculate_unit == 1"})
     */
    private $unit = '0.00';

    /**
     * @var string
     *
     * @ORM\Column(name="round_up", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $round_up;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_private", type="boolean", nullable=false)
     */
    private $is_private;

    /**
     * @var int|null
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=true, options={"comment"="required if is_private == 1"})
     */
    private $customer_id;

    /**
     * @var string
     *
     * @ORM\Column(name="from", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $from;

    /**
     * @var string
     *
     * @ORM\Column(name="to", type="decimal", precision=10, scale=2, nullable=false, options={"comment"="0 = Over"})
     */
    private $to;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status = '0';

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
    private $description_en;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     */
    private $created_by;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $created_at = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updated_by;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_deleted", type="boolean", nullable=false)
     */
    private $is_deleted = '0';


}
