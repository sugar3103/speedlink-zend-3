<?php
namespace Log\Entity;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Doctrine\ODM\MongoDB\Mapping\Annotations\Id;

/** @ODM\Document */

class Notification
{
     /**
     * @EmbedMany(targetDocument="ecos_system")
     */

   /**
     * @ODM\Id
     */
    protected $id;

    /**
     * @ODM\Field(type="int")
     */
    protected $user_id;

    /**
     * @ODM\Field(type="string")
     */
    protected $type;

     /**
     * @ODM\Field(type="string")
     */
    protected $text;

     /**
     * @ODM\Field(type="datetime")
     */
    protected $created_at;
    

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getUserId()
    {
        return $this->user_id;
    }

    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }
    
    public function setType($type)
    {
        $this->type = $type;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getText()
    {
        return $this->text;
    }

    public function setText($text)
    {
        $this->text = $text;
    }

    public function getCreatedAt()
    {
        return $this->created_at;
    }

    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }
}