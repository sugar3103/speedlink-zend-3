<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * ZoneCode
 *
 * @ORM\Table(name="zone_code")
 * @ORM\Entity
 */
class ZoneCode
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
     * @var int
     *
     * @ORM\Column(name="origin_country_id", type="integer", nullable=false)
     */
    private $origin_country_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_city_id", type="integer", nullable=true, options={"comment"="required if category == Domestic"})
     */
    private $origin_city_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_district_id", type="integer", nullable=true)
     */
    private $origin_district_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="origin_ward_id", type="integer", nullable=true)
     */
    private $origin_ward_id;

    /**
     * @var int
     *
     * @ORM\Column(name="destination_country_id", type="integer", nullable=false)
     */
    private $destination_country_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_city_id", type="integer", nullable=true, options={"comment"="required if category == Domestic"})
     */
    private $destination_city_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_district_id", type="integer", nullable=true)
     */
    private $destination_district_id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="destination_ward_id", type="integer", nullable=true)
     */
    private $destination_ward_id;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_private", type="boolean", nullable=false)
     */
    private $is_private;

    /**
     * @var int
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=false, options={"comment"="required if is_private == 1"})
     */
    private $customer_id;

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
