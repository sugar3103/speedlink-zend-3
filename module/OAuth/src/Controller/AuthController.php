<?php
namespace OAuth\Controller;

use Core\Controller\CoreController;
use OAuth\Form\LoginForm;
use Doctrine\ORM\EntityManager;
use Zend\Authentication\Result;
use Zend\Cache\Storage\StorageInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Uri\Uri;
use OAuth\Entity\User;

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

    public function __construct(
        $entityManager,
        $authManager,  
        $userManager,      
        $cache
     ) {
        $this->entityManager = $entityManager;
        $this->authManager = $authManager;
        $this->userManager = $userManager;
        $this->cache = $cache;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'Action Auth';

        return $this->createResponse();
    }

    /**
     * Login Action
     * @throws \Exception
     */
    public function loginAction() {
        
        $this->apiResponse['message'] = 'Action Login';        

        // create login form
        $form = new LoginForm();

        // store login status.
        $isLoginError = false;

        // check if user has submitted the form.
        if ($this->getRequest()->isPost()) {
            // fill in the form with POST data.
            $payload = file_get_contents('php://input');
            $data = json_decode($payload, true);
            
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
                // Check result
                if ($result->getCode() == Result::SUCCESS) {
                  
                    //Create Token
                    $_user = $this->entityManager->getRepository(User::class)->findOneByUsername($data['username']);
                    
                    $payload  = [
                        'id'            => $_user->getId(),
                        'username'      => $_user->getUsername(),
                        'email'         => $_user->getEmail(),
                        'isActive'      => $_user->getIsActive(),
                        'isAdmin'       => $_user->getIsAdmin(),
                        'createAt'      => date('s')
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
                } else {
                    $this->apiResponse = $result->getMessages();                        
                }
            } else {
                $this->apiResponse = $form->getMessages();    
            }
            
        }
        return $this->createResponse();
    }
}