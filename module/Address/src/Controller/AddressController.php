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
            
        $this->entityManager = $entityManager;
        $this->addressCodeManager = $addressCodeManager;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            $payload = file_get_contents('php://input');
            $params = json_decode($payload, true);
            
          
            //the current page number.
            $offset = isset($params['start']) ? $params['start'] : 0;
            
            //total number of pages available in the server.
            $totalPages = 1;
 
            //set limit
            $limit  = isset($params['length']) ? $params['length'] : 10;

            // get the filters
            $fieldsMap = [
                0 => 'code',
                1 => 'country',
                2 => 'city',
                4 => 'district',
                5 => 'ward',
                6 => 'brach',
                6 => 'hub'
            ];

            $filters = $this->addressCodeManager->getValueFiltersSearch($params,$fieldsMap);
            
            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';
            
            //get list code by condition
            $dataCode = $this->addressCodeManager->getListCodeByCondition(
                $offset, $limit, $sortField, $sortDirection,$filters);
                
            $result = [
                "totalRecords" => $dataCode['totalCode'],
                "data" => ($dataCode['listCode']) ? $dataCode['listCode'] : []           
            ];
            
            $this->apiResponse = $result;
        } else {
            $this->apiResponse['message'] = ['Address Code Manager'];
        }
        
        return $this->createResponse();
    }
}