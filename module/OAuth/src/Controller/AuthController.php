<?php
namespace OAuth\Controller;

use Core\RestApi\ApiController;

class AuthController extends ApiController {
    
    public function indexAction()
    {
        return $this->createResponse();
    }

    public function loginAction()
    {
        return $this->createResponse();
    }
}