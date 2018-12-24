<?php
namespace Core\Controller;

use Core\Controller\ApiController;

class CoreController extends ApiController
{
    public function indexAction()
    {
        $this->apiResponse = [
            'message' => 'ECos System Api'
        ];
        return $this->createResponse();
    }
}
