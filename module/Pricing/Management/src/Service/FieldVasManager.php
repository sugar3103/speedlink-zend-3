<?php
namespace Management\Service;

use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Management\Entity\FieldVas;
use Doctrine\ORM\EntityManager;

/**
 * @package Management\Service
 */
class FieldVasManager {

    /**
     * @var EntityManager
     */
    private $entityManager;
   
    /**
     * BranchManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getListFieldVasByCondition($start, $limit, $sortField = '', $sortDirection = 'asc', $filters = [])
    {
        $fieldVas = [];
        $totalfieldVas = 0;

        //get orm carrier
        $ormFieldVas = $this->entityManager->getRepository(FieldVas::class)->getListFieldVasByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormFieldVas){
            $ormPaginator = new ORMPaginator($ormFieldVas, true);
            $ormPaginator->setUseOutputWalkers(false);
            $fieldVas = $ormPaginator->getIterator()->getArrayCopy();
            $ormPaginator->setUseOutputWalkers(false);
            $totalfieldVas = $ormPaginator->count();
        }

        $dataFieldVas = [
            'listFieldVas' => $fieldVas,
            'totalFieldVas' => $totalfieldVas
        ];
        return $dataFieldVas;
    }

}