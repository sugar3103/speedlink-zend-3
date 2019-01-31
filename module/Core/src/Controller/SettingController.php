<?php
namespace Core\Controller;

use Core\Controller\ApiController;
use Doctrine\ORM\EntityManager;

class SettingController extends ApiController
{
     /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var SettingManager
     */
    private $settingManager;

    public function __construct($entityManager,$settingManager) {
        parent::__construct($entityManager);        
        $this->entityManager = $entityManager;
        $this->settingManager = $settingManager;
    }

    public function indexAction()
    {
        $this->apiResponse = [
            'message' => 'ECos System Setting'
        ];

        return $this->createResponse();
    }
}
