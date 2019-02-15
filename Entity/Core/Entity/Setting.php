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
     * @ORM\Column(name="id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=128, precision=0, scale=0, nullable=false, unique=false)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="key", type="string", length=128, precision=0, scale=0, nullable=false, unique=false)
     */
    private $key;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="text", length=65535, precision=0, scale=0, nullable=false, unique=false)
     */
    private $value;

    /**
     * @var bool
     *
     * @ORM\Column(name="serialized", type="boolean", precision=0, scale=0, nullable=false, unique=false)
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
     * Set code.
     *
     * @param string $code
     *
     * @return Setting
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code.
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set key.
     *
     * @param string $key
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
     * Set value.
     *
     * @param string $value
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
     * Set serialized.
     *
     * @param bool $serialized
     *
     * @return Setting
     */
    public function setSerialized($serialized)
    {
        $this->serialized = $serialized;

        return $this;
    }

    /**
     * Get serialized.
     *
     * @return bool
     */
    public function getSerialized()
    {
        return $this->serialized;
    }
}
