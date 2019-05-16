<?php
namespace OAuth\Controller;

use Core\Controller\CoreController;
use OAuth\Form\LoginForm;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;

use OAuth\Entity\User;
use Core\Utils\Utils;

class AuthController extends CoreController {
    /**
     * EntityManager.
     * @var EntityManager
    */
    protected $entityManager;
    
      /**
     * Auth Manager.
     * @var AuthManager
     */
    protected $authManager;

    /**
     * User Manager.
     * @var UserManager
     */
    protected $userManager;

    /**
     * Filesystem cache.
     *
     * @var StorageInterface
     */
    protected $cache;

    /**
     * AuthController constructor.
     * @param $entityManager
     * @param $authManager
     * @param $userManager
     */

    public function __construct($entityManager,$authManager,$userManager,$cache) {

        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->authManager = $authManager;
        $this->userManager = $userManager;
        $this->cache = $cache;
    }

    /**
     * Login Action
     * @throws \Exception
     */
    public function loginAction() {
        
        if ($this->getRequest()->isPost()) {
            
            // check if user has submitted the form.

            // check if we do not have users in database at all. If so, create
            // the 'Admin' user.
            $this->userManager->createAdminUserIfNotExists();

            // create login form
            $form = new LoginForm();

            $data = $this->getRequestData();  
            
            $data['remember_me'] = $data['remember_me'] ? 1 : 0;          
            $form->setData($data);            

            // Validate From
            if ($form->isValid()) {
                // get filters and validated data.
                $data = $form->getData();                
                //clear cache
                $this->cache->removeItem('rbac_container');
                // Perform login attempt.
                $result = $this->authManager->login(
                    $data['username'],
                    $data['password'],
                    $data['remember_me']
                );                
                
                $this->error_code = $result->getCode();

                $this->apiResponse['message'] = $result->getMessages();                        

                // Check result
                if ($result->getCode() == Result::SUCCESS) {                  
                    //Create Token
                    $_user = $this->entityManager->getRepository(User::class)->findOneByUsername($data['username']);
                    
                    $payload  = [
                        'id'            => $_user->getId(),  
                        'is_admin'      => $_user->getIsAdmin(),
                        'username'      => $data['username'],
                        'password'      => $data['password'],
                        'remember_me'              => $data['remember_me'],                 
                        'createAt'      => date('Y-m-d H:i:s')
                    ];
                    
                    $token = $this->generateJwtToken($payload);

                    $this->apiResponse['token'] = $token;
                    // begin transaction
                    $this->entityManager->beginTransaction();
                    try {
                        //Update Last Token
                        $_user->setLastToken($token);
                        $_user->setLastTokenCreatedAt(date('Y-m-d H:i:s'));

                        // apply changes to database.
                        $this->entityManager->flush();
                        $this->entityManager->commit();

                    }
                    catch (ORMException $e) {            
                        $this->entityManager->rollback();
                        return FALSE;
                    }                  

                    $this->apiResponse['message'] = $result->getMessages();                      
                } 
            } else {
                $this->apiResponse['message'] = $form->getMessages();    
            }
            
        }
        return $this->createResponse();
    }
}