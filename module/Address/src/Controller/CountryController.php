<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\Uri\Uri;
use Address\Entity\Country;

class CountryController extends CoreController {
    public function indexAction()
    {
        $this->apiResponse['message'] = 'Country';

        return $this->createResponse();
    }
}