<?php
namespace Core\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Setting
 *
 * @ORM\Table(name="setting")
 * @ORM\Entity(repositoryClass="\Core\Repository\SettingRepository")
 */
class Setting
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
     * @ORM\Column(name="code", type="string", length=128, nullable=false)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="key", type="string", length=128, nullable=false)
     */
    private $key;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="text", length=65535, nullable=false)
     */
    private $value;

    /**
     * @var bool
     *
     * @ORM\Column(name="serialized", type="boolean", nullable=false)
     */
    private $serialized;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

     /**
     * Set Code.
     *
     * @param string $Code
     *
     * @return Setting
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get Code.
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

     /**
     * Set Key.
     *
     * @param string $Key
     *
     * @return Setting
     */
    public function setKey($key)
    {
        $this->key = $key;

        return $this;
    }

    /**
     * Get key.
     *
     * @return string
     */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * Set Value.
     *
     * @param string $Value
     *
     * @return Setting
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value.
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set Serialized.
     *
     * @param string $Serialized
     *
     * @return Setting
     */
    public function setSerialized($serialized)
    {
        $this->serialized = $serialized;

        return $this;
    }

    /**
     * Get value.
     *
     * @return string
     */
    public function getSerialized()
    {
        return $this->serialized;
    }
}
