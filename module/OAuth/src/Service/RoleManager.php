<?php
namespace OAuth\Service;

use OAuth\Entity\Permission;
use OAuth\Entity\Role;
use OAuth\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use Core\Utils\Utils;

/**
 * this service is responsible for adding/editing roles.
 * @package OAuth\Service
 */
class RoleManager {

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var RbacManager
     */
    private $rbacManager;

    /**
     * RoleManager constructor.
     * @param $entityManager
     * @param $rbacManager
     */
    public function __construct($entityManager, $rbacManager)
    {
        $this->entityManager = $entityManager;
        $this->rbacManager = $rbacManager;
    }

    private function getReferenced(&$role, $data, $user, $mode = '')
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $role->setJoinCreated($user_data);
        }

        $role->setJoinUpdated($user_data);

    }

    /**
     * Add new role.
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addRole($data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $role = new Role();
            $role->setName($data['name']);
            $role->setNameEn($data['name_en']);
            $role->setStatus($data['status']);
            $role->setDescription($data['description']);
            $role->setDescriptionEn($data['description_en']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $role->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $role->setCreatedBy($user->id);
            
            $this->getReferenced($role, $data, $user,'add');
            // add parent roles to inherit
            $inheritedRoles = $data['inherit_roles'];
            if (!empty($inheritedRoles)) {
                foreach ($inheritedRoles as $roleId) {
                    $parentRole = $this->entityManager->getRepository(Role::class)->findOneById($roleId);

                    if ($parentRole == null)
                        throw new \Exception("Role to inherit not found");

                    if (!$role->getParentRoles()->contains($parentRole))
                        $role->addParent($parentRole);
                }
            }

            foreach ($data['permissions'] as $permission) {
                $permisson = $this->entityManager->getRepository(Permission::class)
                    ->findOneById($permission);

                if ($permisson == null)
                    throw new \Exception("Permission with such name doesn't exist");

                $role->getPermissions()->add($permisson);
            }

            
            $this->entityManager->persist($role);

            // apply changes to database
            $this->entityManager->flush();

            // reload rbac container
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
     * Updates an existing role.
     * @param $role Role
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateRole($role, $data,$user) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $role->setName($data['name']);
            $role->setDescription($data['description']);
            $role->setNameEn($data['name_en']);
            $role->setDescriptionEn($data['description_en']);
            $role->setStatus($data['status']);

            // Set time UTC
            $updatedTime = new \DateTime('now', new \DateTimeZone('UTC'));
            
            $role->setUpdatedAt($updatedTime->format('Y-m-d H:i:s'));
            $role->setUpdatedBy($user->id);

            // clear parent roles so we don't populate database twice
            $role->clearParentRoles();

            // add the new parent roles to inherit
            $inheritedRoles = $data['inherit_roles'];
            if (!empty($inheritedRoles)) {
                foreach ($inheritedRoles as $roleId) {
                    $parentRole = $this->entityManager->getRepository(Role::class)->findOneById($roleId);

                    if ($parentRole == null)
                        throw new \Exception("Role to inherit not found");

                    if (!$role->getParentRoles()->contains($parentRole)) {
                        $role->addParent($parentRole);
                    }
                }
            }

            //Update Role Permission
            // remove old permissions.
            $role->getPermissions()->clear();
             // assign new permissions to role
            foreach ($data['permissions'] as $permission) {
                $permisson = $this->entityManager->getRepository(Permission::class)
                    ->findOneById($permission);

                if ($permisson == null)
                    throw new \Exception("Permission with such name doesn't exist");

                $role->getPermissions()->add($permisson);
            }

            $this->entityManager->flush();

            // reload rbac container.
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
     * Deletes the given role.
     *
     * @param $id
     * @return bool
     */
    public function deleteRole($id) {

        $this->entityManager->beginTransaction();
        try {

            // Delete record in tbl role
            $role = $this->entityManager->getRepository(Role::class)->find($id);

            $this->entityManager->remove($role);
            $this->entityManager->flush();

            // reload rbac container.
            $this->rbacManager->init(true);

            $this->entityManager->commit();
            return TRUE;
        } catch (ORMException $e) {

            $this->entityManager->rollback();
            return FALSE;
        }
    }

    /**
     * Create default roles if not exist
     *
     * @return bool
     * @throws ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createDefaultRolesIfNotExist() {
        $role = $this->entityManager->getRepository(Role::class)
            ->findOneBy([]);

        if ($role != null)
            return false; // some roles already exist; do nothing.

        $defaultRoles = [
            'Super Administrator' => [
                'description' => 'User group all rights',
                'parent' => null,
                'permission' => [],
            ],
            'Administrator' => [
                'description' => 'A person who managers users, roles, etc.',
                'parent' => null,
                'permission' => [],
            ],
            'Default' => [
                'description' => 'A person who can log in and view own profile',
                'parent' => null,
                'permission' => []
            ]
        ];

        foreach ($defaultRoles as $name => $info) {

            // create new role
            $role = new Role();
            $role->setName($name);
            $role->setNameEn($name);
            $role->setStatus(1);
            $role->setDescription($info['description']);
            $role->setDescriptionEn($info['description']);
            $role->setCreatedAt(date('Y-m-d H:i:s'));
            $role->setCreatedBy(1);
            // assign parent role
            if ($info['parent'] != null) {
                $parentRole = $this->entityManager->getRepository(Role::class)->findOneByName($info['parent']);

                if ($parentRole == null)
                    throw new \Exception("Parent role " . $info['parent'] . ' doesn\' t exist');

                $role->setParentRole($parentRole);
            }

            $this->entityManager->persist($role);
            
            // assign permissions to role
            $permissions = $this->entityManager->getRepository(Permission::class)->findByName($info['permission']);

            foreach ($permissions as $permission) {
                $role->getPermissions()->add($permission);
            }
        }

        // apply changes to database.
        $this->entityManager->flush();

        // reload rbac container
        $this->rbacManager->init(true);
    }

    /**
     * Retrieves all permissions form the given role and its child roles.
     * @param $role Role
     * @return array
     */
    public function getEffectivePermissions($role_id) {
        $role = $this->entityManager->getRepository(Role::class)->findOneById($role_id);

        $effectivePermissions = [];

        foreach ($role->getParentRoles() as $parentRole) {
            $parentPermissions = $this->getEffectivePermissions($parentRole);            
            foreach ($parentPermissions as $parentPermission) {
                $effectivePermissions[] = $parentPermission;                
            }
        }
        
        foreach ($role->getPermissions() as $permission) {            
            if (!isset($effectivePermissions[$permission->getId()])) {
                $effectivePermissions[] = $permission->getId();
            }
        }        
        
        return $effectivePermissions;
    }
    
    public function getInheritRoles($role_id) {
        $role = $this->entityManager->getRepository(Role::class)->findOneById($role_id);
        $roles = array();
        foreach ($role->getParentRoles() as $parentRole) {            
            $roles[] = $parentRole->getId();
        }        
        return $roles;
    }
    
    /**
     * update permissions of role.
     * @param $role Role
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateRolePermissions($role, $data) {
        // remove old permissions.
        $role->getPermissions()->clear();

        // assign new permissions to role
        foreach ($data['permissions'] as $name => $isChecked) {
            if (!$isChecked)
                continue;

            $permisson = $this->entityManager->getRepository(Permission::class)
                ->findOneByName($name);

            if ($permisson == null)
                throw new \Exception("Permission with such name doesn't exist");

            $role->getPermissions()->add($permisson);
        }

        // apply changes to database.
        $this->entityManager->flush();

        // reload rbac container.
        $this->rbacManager->init(true);
    }

    /**
     *
     * Get list role by condition
     *
     * @param $currentPage
     * @param $limit
     * @param string $sortField
     * @param string $sortDirection
     * @param array $filters
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function getListRoleByCondition(
        $start,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $roles     = [];
        $totalRole = 0;

        //get orm role
        $ormRole = $this->entityManager->getRepository(Role::class)
            ->getListRoleByCondition($start, $limit, $sortField, $sortDirection, $filters);

        if($ormRole){
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormRole, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalRole = $ormPaginator->count();            

            //get list
            $roles = $ormPaginator->getIterator()->getArrayCopy();
            foreach ($roles as &$role) {//loop
                 //set created_at to GMT +7
                 $role['permissions'] = $this->getEffectivePermissions($role['id']);                 
                 $role['inherit_roles'] = $this->getInheritRoles($role['id']);
                 $role['created_at'] =  ($role['created_at']) ? Utils::checkDateFormat($role['created_at'],'D M d Y H:i:s \G\M\T+0700') : '';
                 $role['updated_at'] =  ($role['updated_at']) ? Utils::checkDateFormat($role['updated_at'],'D M d Y H:i:s \G\M\T+0700') : '';
            }
        }

        //set data
        $dataRole = [
            'listRole' => $roles,
            'totalRole' => $totalRole,
        ];
        return $dataRole;
    }
}