<?php
namespace Core\Controller;

use Core\Controller\ApiController;
use Doctrine\ORM\EntityManager;
use Core\Entity\Notification;

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
            $params = !empty(json_decode($payload, true)) ? json_decode($payload, true) : array();

            if(empty($params)) {
                $params = $this->getRequest()->getPost() ? (array) $this->getRequest()->getPost() : array();                
                $params = $this->getRequest()->getFiles() ? array_merge($params, (array)$this->getRequest()->getFiles()) : $params;
            }
            
            if(!empty($fieldsMap)) {
                //the current page number.
                $start = isset( $params['offset']['start']) ? (int) $params['offset']['start'] : 1;

                //set limit
                $limit  = isset($params['offset']['limit']) ? (int) $params['offset']['limit'] : 10;
                
                $fields = isset($params['field']) ? $params['field'] : array();
                
                //get and set sortField,sortDirection
                $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
                $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';

                $filters = $this->getValueFiltersSearch($params,$fieldsMap);
                
                return array($start,$limit,$sortField,$sortDirection,$filters,$fields);    
            } else {                
                return $params;
            }            
        }        
    }

    public function getRequestDataSelect($fieldsMap = array())
    {
        
        if ($this->getRequest()->isPost()) {
            $payload = file_get_contents('php://input');
            
            $params = !empty(json_decode($payload, true)) ? json_decode($payload, true) : array();
            if(!empty($fieldsMap)) {
                
                //get and set sortField,sortDirection
                $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
                $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';

                $filters = $this->getValueFiltersSearch($params,$fieldsMap);
                
                return array($sortField,$sortDirection,$filters);    
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

    public function filterByField($data,$fields) {
        $results = array();
        if(!empty($fields)) {
            foreach ($data as $value) {            
                $result = array();
                foreach ($fields as $field) {
                    if(isset($value[$field]))
                        $result[$field] = $value[$field];
                }
                $results[] = $result;
            }
            return $results;            
        } else {
            return $data;
        }        
    }

    public function getDeleted()
    {
        return $this->tokenPayload->is_admin ? false : true;
    }
}
