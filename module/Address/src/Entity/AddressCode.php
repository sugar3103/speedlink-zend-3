<?php

namespace Address\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="address_code")
 * @ORM\Entity(repositoryClass="\Address\Repository\AddressCodeRepository")
 */

class AddressCode
{
    /**
     * @var int
     *
     * @ORM\Column(name="address_code_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $addressCodeId;

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
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\Country" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="country_id", referencedColumnName="country_id", nullable=true)
     */
    protected $country;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\City" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="city_id", referencedColumnName="city_id", nullable=true)
     */
    protected $city;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\District" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="district_id", referencedColumnName="district_id", nullable=true)
     */
    protected $district;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\Address\Entity\Ward" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="ward_id", referencedColumnName="ward_id", nullable=true)
     */
    protected $ward;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\NetworkPort\Entity\Hub" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="hub_id", referencedColumnName="hub_id", nullable=true)
     */
    protected $hub;

    /**
     * 
     * @ORM\OneToOne(targetEntity="\NetworkPort\Entity\Branch" , inversedBy="objects", fetch="EAGER")
     * @ORM\JoinColumn(name="branch_id", referencedColumnName="branch_id", nullable=true)
     */
    protected $branch;
}
