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
            $payload = file_get_contents('php://input');
            $params = json_decode($payload, true);
          
            //the current page number.
            $currentPage = isset( $params['pagination']) ? (int) $params['pagination']['page'] : 1;

            //total number of pages available in the server.
            $totalPages = isset($params['pagination']['pages']) ? (int) $params['pagination']['pages'] : 1;
 
            //set limit
            $limit  = !empty($params['pagination']['perpage'])
                         && $params['pagination']['perpage'] > 10 ? $params['pagination']['perpage'] : 10;
          
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

            $filters = $this->addressCodeManager->getValueFiltersSearch($params,$fieldsMap);
            
            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';
            
            //get list code by condition
            $dataCode = $this->addressCodeManager->getListCodeByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);

            $result = [
                "meta" => [
                    "page" => $currentPage,
                    "pages" => $totalPages,
                    "from" => ($currentPage - 1) * $limit + 1,
                    "to" => ($currentPage * $limit) > $dataCode['totalCode'] ? $dataCode['totalCode'] : ($currentPage * $limit),
                    "perpage"=> $limit,
                    "totalItems" => $dataCode['totalCode'],
                    "totalPage" => ceil($dataCode['totalCode']/$limit)
                ],
                "data" => ($dataCode['listCode']) ? $dataCode['listCode'] : []           
            ];

            $this->error_code = 1;
            $this->apiResponse = $result;
        } else {
            $this->error_code = 0;
            $this->apiResponse['message'] = ['Address Code Manager'];
        }
        
        return $this->createResponse();
    }
}