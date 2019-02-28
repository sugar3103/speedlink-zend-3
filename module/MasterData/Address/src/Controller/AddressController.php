<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Uri\Uri;
use Address\Entity\Code;

class AddressController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * Code Manager.
     * @var addressCodeManager
     */
    protected $codeManager;

    public function __construct($entityManager, $addressCodeManager) {   
        parent::__construct($entityManager);    
         
        $this->entityManager = $entityManager;
        $this->addressCodeManager = $addressCodeManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'code',
                1 => 'country',
                2 => 'city',
                4 => 'district',
                5 => 'ward',
                6 => 'branch',
                6 => 'hub'
            ];

            list($start,$limit,$sortField,$sortDirection,$filters,$fields) = $this->getRequestData($fieldsMap);                        
            
            //get list User by condition
            $dataCode = $this->addressCodeManager->getListCodeByCondition($start, $limit, $sortField, $sortDirection,$filters);            
            
            $result = $this->filterByField($dataCode['listCode'],$fields);
            
            $this->apiResponse =  array(
                'message'   => "SUCCESS",
                'data'      => $result,
                'total'     => $dataCode['totalCode']
            ); 
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = ['Address Code Manager'];
        }
        
        return $this->createResponse();
    }
}