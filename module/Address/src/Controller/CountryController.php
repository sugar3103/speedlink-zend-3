<?php
namespace Address\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;
use Address\Entity\Country;

class CountryController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * Country Manager.
     * @var CountryManager
     */
    protected $countryManager;

    public function __construct($entityManager, $countryManager) {
            
        $this->entityManager = $entityManager;
        $this->countryManager = $countryManager;
    }


    public function indexAction()
    {
        $this->apiResponse['message'] = 'Country';

        return $this->createResponse();
    }

    public function listAction() {
        if ($this->getRequest()->isPost()) {
            $payload = file_get_contents('php://input');
            $params = json_decode($payload, true);
            
          
            //the current page number.
            $currentPage = isset($params['start']) ? $params['start'] : 0;
            
            //total number of pages available in the server.
            $totalPages = 1;
 
            //set limit
            $limit  = isset($params['length']) ? $params['length'] : 10;

            // get the filters
            $fieldsMap = [
                0 => 'name',                
                1 => 'status'
            ];

            $filters = $this->countryManager->getValueFiltersSearch($params,$fieldsMap);

            //get and set sortField,sortDirection
            $sortField = isset($params['sort']) ? $params['sort'] : $fieldsMap[0];
            $sortDirection = isset($params['order']) ? $params['order'] : 'ASC';

            //get list country by condition
            $dataCountry = $this->countryManager->getListCountryByCondition(
                $currentPage, $limit, $sortField, $sortDirection,$filters);
            
            $result = [
                "totalRecords" => $dataCountry['totalCountry'],
                "data" => ($dataCountry['listCountry']) ? $dataCountry['listCountry'] : []           
            ];
            
            $this->apiResponse = $result;
            return $this->createResponse();
        } else {
            $this->apiResponse['message'] = 'Country List';

            return $this->createResponse();
        }
    }
}