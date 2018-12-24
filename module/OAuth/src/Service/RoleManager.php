<?php
namespace OAuth\Service;

use OAuth\Entity\Permission;
use OAuth\Entity\Role;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;

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

    /**
     * Add new role.
     * @param $data
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function addRole($data) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $role = new Role();
            $role->setName($data['name']);
            $role->setDescription($data['description']);
            $role->setCreatedAt(date('Y-m-d H:i:s'));

            // add parent roles to inherit
            $inheritedRoles = $data['inherit_roles'];
            if (!empty($inheritedRoles)) {
                foreach ($inheritedRoles as $roleId) {
                    $parentRole = $this->entityManager->getRepository(Role::class)
                        ->findOneById($roleId);

                    if ($parentRole == null)
                        throw new \Exception("Role to inherit not found");

                    if (!$role->getParentRoles()->contains($parentRole))
                        $role->addParent($parentRole);
                }
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
    public function updateRole($role, $data) {

        // begin transaction
        $this->entityManager->beginTransaction();
        try {

            $role->setName($data['name']);
            $role->setDescription($data['description']);

            // clear parent roles so we don't populate database twice
            $role->clearParentRoles();

            // add the new parent roles to inherit
            $inheritedRoles = $data['inherit_roles'];
            if (!empty($inheritedRoles)) {
                foreach ($inheritedRoles as $roleId) {
                    $parentRole = $this->entityManager->getRepository(Role::class)
                        ->findOneById($roleId);

                    if ($parentRole == null)
                        throw new \Exception("Role to inherit not found");

                    if (!$role->getParentRoles()->contains($parentRole)) {
                        $role->addParent($parentRole);
                    }
                }
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
            'Administrator' => [
                'description' => 'A person who managers users, roles, etc.',
                'parent' => null,
                'permission' => [
                    'user.manage',
                    'role.manage',
                    'permission.manage',
                    'profile.any.view',
                ],
            ],
            'Guest' => [
                'description' => 'A person who can log in and view own profile',
                'parent' => null,
                'permission' => [
                    'profile.own.view'
                ]
            ]
        ];

        foreach ($defaultRoles as $name => $info) {

            // create new role
            $role = new Role();
            $role->setName($name);
            $role->setDescription($info['description']);
            $role->setCreatedAt(date('Y-m-d H:i:s'));

            // assign parent role
            if ($info['parent'] != null) {
                $parentRole = $this->entityManager->getRepository(Role::class)
                    ->findOneByName($info['parent']);

                if ($parentRole == null)
                    throw new \Exception("Parent role " . $info['parent'] . ' doesn\' t exist');

                $role->setParentRole($parentRole);
            }

            $this->entityManager->persist($role);

            // assign permissions to role
            $permissions = $this->entityManager->getRepository(Permission::class)
                ->findByName($info['permissions']);

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
    public function getEffectivePermissions($role) {
        $effectivePermissions = [];

        foreach ($role->getParentRoles() as $parentRole) {
            $parentPermissions = $this->getEffectivePermissions($parentRole);
            foreach ($parentPermissions as $name => $inherited) {
                $effectivePermissions[$name] = 'inherited';
            }
        }

        foreach ($role->getPermissions() as $permission) {
            if (!isset($effectivePermissions[$permission->getName()])) {
                $effectivePermissions[$permission->getName()] = 'own';
            }
        }
        return $effectivePermissions;
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
        $currentPage,
        $limit,
        $sortField = '',
        $sortDirection = 'asc',
        $filters = []
    ){

        $roles     = [];
        $totalRole = 0;

        //get orm role
        $ormRole = $this->entityManager->getRepository(Role::class)
            ->getListRoleByCondition($sortField, $sortDirection, $filters);

        if($ormRole){

            //set offset,limit
            $ormPaginator = new ORMPaginator($ormRole, true);
            $ormPaginator->setUseOutputWalkers(false);
            $adapter = new DoctrineAdapter($ormPaginator);
            $paginator = new Paginator($adapter);

            //sets the current page number
            $paginator->setCurrentPageNumber($currentPage);

            //Sets the number of items per page
            $paginator->setItemCountPerPage($limit);

            //get list
            $roles = $paginator->getIterator()->getArrayCopy();

            //set countRow default
            $countRow = 1;

            foreach ($roles as &$role) {//loop
                //set created_at
                $role['created_at'] =  ($role['created_at']) ? $this->checkDateFormat($role['created_at'],'d/m/Y') : '';

                //set count row
                $role['count_row'] = $countRow;

                $countRow++;
            }

            //get and set total
            $totalRole = $paginator->getTotalItemCount();
        }

        //set data
        $dataRole = [
            'listRole' => $roles,
            'totalRole' => $totalRole,
        ];
        return $dataRole;
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
                if(isset($params['query'][$field]) && $params['query'][$field] != '')
                    $filters [$field] = trim($params['query'][$field]);
            }
        }
        return $filters;
    }

}