<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Core\Controller;

use Core\RestApi\ApiController;
use Zend\View\Model\ViewModel;

class CoreController extends ApiController
{
    public function indexAction()
    {
        return $this->createResponse();
    }
}
