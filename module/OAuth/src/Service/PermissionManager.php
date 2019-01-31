<?php
namespace OAuth\Service;

use OAuth\Entity\Permission;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Core\Utils\Utils;

class PermissionManager {

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var RbacManager
     */
    private $rbacManager;

    /**
     * PermissionManager constructor.
     * @param $entityManager
     * @param $rbacManager
     */
    public function __construct($entityManager, $rbacManager)
    {
        $this->entityManager = $entityManager;
        $this->rbacManager = $rbacManager;
    }

    /**
     * Add new permission.
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addPermission($data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $permission = new Permission();
            $permission->setName($data['name']);
            $permission->setDescription($data['description']);
            $permission->setDescriptionEn($data['description_en']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $permission->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $permission->setCreatedBy($user->id);

            $this->entityManager->persist($permission);

            $this->entityManager->flush();

            // reload RBAC container.
            $this->rbacManager->init(true);

            $this->entityManager->commit();
            return TRUE;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }

    }

    /**
     * Updates an existing permission.
     * @param $permission Permission
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updatePermission($permission, $data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $permission->setName($data['name']);
            $permission->setDescription($data['description']);
            $permission->setDescriptionEn($data['description_en']);

            // Set time UTC
            $updatedTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $permission->setUpdatedAt($updatedTime->format('Y-m-d H:i:s'));
            $permission->setUpdatedBy($user->id);

            $this->entityManager->flush();

            // reload RBAC container.
            $this->rbacManager->init(true);

            $this->entityManager->commit();
            return TRUE;
        }
        catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Delete Permission base on id
     *
     * @param $id
     * @return bool
     */
    public function deletePermission($permission) {
        $this->entityManager->beginTransaction();
        try {

            $this->entityManager->remove($permission);
            $this->entityManager->flush();

            $this->entityManager->commit();
            return TRUE;
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * this method creates the default set of permission if no permission exist at all.
     * @return bool
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createDefaultPermissionsIfNotExist() {
        $permission = $this->entityManager->getRepository(Permission::class)
            ->findOneBy([]);

        if ($permission != null)
            return false; // some permission already exist; do nothing.

        $defaultPermissions = [
            'user.manage' => 'Manage users',
            'permission.manage' => 'Manage permissions',
            'role.manage' => 'Manage roles',
            'profile.any.view' => 'View anyone profile',
            'profile.own.view' => 'View own profile'
        ];

        foreach ($defaultPermissions as $name => $description) {
            $permission = new Permission();
            $permission->setName($name);
            $permission->setDescription($description);
            $permission->setDescriptionEn($description);
            $permission->setCreatedAt(date('Y-m-d H:i:s'));
            $permission->setCreatedBy(1);

            $this->entityManager->persist($permission);
        }

        $this->entityManager->flush();

        // reload rbac container.
        $this->rbacManager->init(true);
    }

    /**
     * Get list permission by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return array
     * @throws ORMException
     */
    public function getListPermissionByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){
        $permissions = [];
        $totalPermission = 0;

        $ormPermission = $this->entityManager->getRepository(Permission::class)
            ->getListPermissionByCondition($start,$limit,$sortField, $sortDirection, $filters);

        if($ormPermission){
           //set offset,limit
            $ormPaginator = new ORMPaginator($ormPermission, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalPermission = $ormPaginator->count();

            //get permission list
            $permissions = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($permissions as &$permission) {//loop

                //set created_at to GMT +7
                $permission['created_at'] =  ($permission['created_at']) ? Utils::checkDateFormat($permission['created_at'],'d/m/Y') : '';
            }
            
        }

        // Get data permission
        $dataPermission = [
            'listPermissions' => $permissions,
            'totalRecord' => $totalPermission,
        ];
        return $dataPermission;
    }
}