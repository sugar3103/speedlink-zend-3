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

    public function getRequestData($fieldsMap = array())
    {
        if ($this->getRequest()->isPost()) {
            $payload = file_get_contents('php://input');
            $params = json_decode($payload, true);
            if(!empty($fieldsMap)) {
                //the current page number.
                $currentPage = isset( $params['pagination']) ? (int) $params['pagination']['page'] : 1;

                //total number of pages available in the server.
                $totalPages = isset($params['pagination']['pages']) ? (int) $params['pagination']['pages'] : 1;
    
                //set limit
                $limit  = !empty($params['pagination']['perpage'])
                            && $params['pagination']['perpage'] > 10 ? $params['pagination']['perpage'] : 10;
                
                //get and set sortField,sortDirection
                $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
                $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';

                $filters = $this->getValueFiltersSearch($params,$fieldsMap);
                return array($currentPage,$totalPages,$limit,$sortField,$sortDirection,$filters);    
            } else {
                return $params;
            }
            
        }
        
    }

     /**
     * Get value filters search
     *
     * @param $params
     * @param $fieldsMap
     * @return array
     */
    public function getValueFiltersSearch($params,$fieldsMap)
    {
        $filters = [];

        if (isset($params['query']) && !empty($params['query'])){
          
            foreach ($fieldsMap as $field)
            {
                if(isset($params['query'][$field]) && $params['query'][$field] != -1)
                    $filters [$field] = trim($params['query'][$field]);
            }
        }
       
        return $filters;
    }
}
