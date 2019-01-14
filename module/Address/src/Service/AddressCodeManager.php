<?php
namespace Address\Service;

use Address\Entity\AddressCode;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

class AddressCodeManager  {
    
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;        
    }

    
    /**
     * Get list code by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListCodeByCondition(
        $currentPage,
        $limit,
        $sortField = '',
        $sortDirection = 'ASC',
        $filters = []
    ){
        
        $codes     = [];
        $totalCode = 0;  
        $offset = ($currentPage * $limit) - $limit;      
        
        //get orm code
        $ormCode = $this->entityManager->getRepository(AddressCode::class)
            ->getListCodeByCondition($sortField, $sortDirection, $filters,$offset,$limit);

        if($ormCode){
            $ormPaginator = new ORMPaginator($ormCode, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalCode = $ormPaginator->count();

            // $adapter = new DoctrineAdapter($ormPaginator);  
            $codes = $ormPaginator->getIterator()->getArrayCopy();
            
            foreach ($codes as &$code) {//loop
                //set created_at
                $code['createdAt'] =  ($code['createdAt']) ? $this->checkDateFormat($code['createdAt'],'d/m/Y') : '';                
            }
           
        }

        //set data code
        $dataCode = [
            'listCode' => $codes,
            'totalCode' => $totalCode,
        ];
        return $dataCode;
    }
    
    /**
     * Check date format
     *
     * @param $dateAction
     * @param $dateFormat
     * @return string
     */
    public function checkDateFormat($dateAction,$dateFormat)
    {
        $dateLast = '';
        $dateCheck = ! empty($dateAction) ? $dateAction->format('Y-m-d H:i:s') : '';
        if ($dateCheck) {
            $datetime = new \DateTime($dateCheck, new \DateTimeZone('UTC'));
            $laTime = new \DateTimeZone('Asia/Ho_Chi_Minh');
            $datetime->setTimezone($laTime);
            $dateLast = $datetime->format($dateFormat);
        }
        return $dateLast;
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