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

    public function getPostData()
    {
        if ($this->getRequest()->isPost()) {
            $params = file_get_contents('php://input');
            $params = json_decode($params, true);
            
            return $params;
        }
    }
}
