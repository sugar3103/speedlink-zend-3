<?php
namespace Address\Service;

use Address\Entity\AddressCode;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Core\Utils\Utils;

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
                $code['createdAt'] =  ($code['createdAt']) ? Utils::checkDateFormat($code['createdAt'],'d/m/Y') : '';                
            }
           
        }

        //set data code
        $dataCode = [
            'listCode' => $codes,
            'totalCode' => $totalCode,
        ];
        return $dataCode;
    }
}