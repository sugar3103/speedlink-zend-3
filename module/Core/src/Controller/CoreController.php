<?php
namespace Core\Controller;

use Core\Controller\ApiController;
use Doctrine\ORM\EntityManager;

class CoreController extends ApiController
{
     /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager) {
        parent::__construct($entityManager);
        
        $this->entityManager = $entityManager;
    }

    public function indexAction()
    {
        $this->apiResponse = [
            'message' => 'ECos System Api'
        ];

        return $this->createResponse();
    }

    public function getRequestData()
    {
        
    }
}
