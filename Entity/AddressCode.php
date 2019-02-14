<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * AddressCode
 *
 * @ORM\Table(name="address_code", uniqueConstraints={@ORM\UniqueConstraint(name="unique_address_code_id", columns={"id", "code"})})
 * @ORM\Entity
 */
class AddressCode
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
     * @ORM\Column(name="code", type="string", length=50, nullable=false)
     */
    private $code;

    /**
     * @var int
     *
     * @ORM\Column(name="country_id", type="integer", nullable=false)
     */
    private $countryId;

    /**
     * @var int
     *
     * @ORM\Column(name="city_id", type="integer", nullable=false)
     */
    private $cityId;

    /**
     * @var int
     *
     * @ORM\Column(name="district_id", type="integer", nullable=false)
     */
    private $districtId;

    /**
     * @var int
     *
     * @ORM\Column(name="ward_id", type="integer", nullable=false)
     */
    private $wardId;

    /**
     * @var int
     *
     * @ORM\Column(name="branch_id", type="integer", nullable=false)
     */
    private $branchId;

    /**
     * @var int
     *
     * @ORM\Column(name="hub_id", type="integer", nullable=false)
     */
    private $hubId;

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
     * @var int|null
     *
     * @ORM\Column(name="ref_as_by", type="integer", nullable=true)
     */
    private $refAsBy;


}
