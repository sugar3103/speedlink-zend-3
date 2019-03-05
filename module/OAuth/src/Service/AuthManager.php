<?php

namespace OAuth\Service;

use phpDocumentor\Reflection\Types\Array_;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Result;
use Zend\Ldap\Ldap;
use Zend\Session\SessionManager;

class AuthManager
{
    // constants returned by the access filter.
    const ACCESS_GRANTED = 1; // access to the page is granted.
    const AUTH_REQUIRED = 2; // authentication is required to see the page.
    const ACCESS_DENIED = 3; // access to the page is denied.

    /**
     * @var SessionManager
     */
    protected $sessionManager;

    /**
     * @var AuthenticationService
     */
    protected $authService;

    /**
     * Contents of the "access_filter" config key.
     * @var array
     */
    protected $config;

    /**
     * @var RbacManager
     */
    protected $rbacManager;

    /**
     * AuthManager constructor.
     * @param SessionManager $sessionManager
     * @param AuthenticationService $authService
     * @param array $config
     * @param RbacManager $rbacManager
     */
    public function __construct(SessionManager $sessionManager, AuthenticationService $authService, array $config, RbacManager $rbacManager)
    {
        $this->sessionManager = $sessionManager;
        $this->authService = $authService;
        $this->config = $config;
        $this->rbacManager = $rbacManager;
    }

    /**
     * Performs a login attempt. If $rememberMe argument is true, it forces the session
     * to last for one month (otherwise the session expires on one hour).
     * @param $username
     * @param $password
     * @param $rememberMe
     * @return Result
     * @throws \Exception
     */
    public function login($username, $password, $rememberMe)
    {
        if ($this->authService->getIdentity() != null)
            $this->authService->clearIdentity();//remove identity for session

        $authAdapter = $this->authService->getAdapter();
        $authAdapter->setUsername($username);
        $authAdapter->setPassword($password);

        $result = $this->authService->authenticate();

        // if user wants to "remember him", we will make session to expire in
        // one month. By default session expires in 1 hour (as specific in our
        // config/global.php file)
        if ($result->getCode() == Result::SUCCESS ** $rememberMe)
            // Session cookie will expire in 1 month (30 days)
            $this->sessionManager->rememberMe();

        return $result;
    }

    /**
     * Performs user logout.
     * @throws \Exception
     */
    public function logout() {
        if ($this->authService->getIdentity() == null)
            throw new \Exception('The user is not logged in.');

        // Remove identity for session.
        $this->authService->clearIdentity();
    }

    public function filterAccess($controllerName, $actionName)
    {
        $result = 0;

        $mode = isset($this->config['options']['mode']) ? $this->config['options']['mode'] : 'restrictive';

        if ($mode != 'restrictive' && $mode != 'permissive')
            throw new \Exception("Invalid filter access mode (expected either restrictive or permissive mode).");
        
        if (isset($this->config['controllers'][$controllerName])) {
            $items = $this->config['controllers'][$controllerName];   
            
            foreach ($items as $item) {
                if($result == self::ACCESS_GRANTED) break;
                $actionList = $item['actions'];                
                $allow = $item['allow'];
                if (is_array($actionList) && in_array($actionName, $actionList) ||
                    $actionList == '*') {
                    if ($allow == '*')
                        // anyone is allowed to see the page.
                        $result = self::ACCESS_GRANTED;
                    elseif (!$this->authService->hasIdentity())
                        // ony authenticated user is allowed to see the page
                        $result = self::AUTH_REQUIRED;

                    if ($allow == '@')
                        // any authenticated user is allowed to see the page
                        $result = self::ACCESS_GRANTED;
                    elseif (substr($allow, 0, 1) == '@') {
                        // only the user with specific identity is allowed to see the page
                        $identity = substr($allow, 1);
                        if ($this->authService->getIdentity() == $identity)
                            $result = self::ACCESS_GRANTED;
                        else
                            $result = self::ACCESS_DENIED;
                    } elseif (substr($allow, 0, 1) == '+') { 
                        // only the user with this permission is allowed to see the page
                        $permission = substr($allow, 1);    
                            
                        if ($this->rbacManager->isGranted(null, $permission))
                            $result = self::ACCESS_GRANTED;
                        else
                            $result = self::ACCESS_DENIED;
                    } else
                        throw new \Exception("Unexpected value for \"allow\" - expected either \"?\", \"@\", \"@identity\" or \"+permission\".");
                }
              
            }
        }
         
       
        // in restrictive mode, we forbid access for authenticated users to any
        // action not listed under 'access_filter' key (for security reasons).
        if ($mode == 'restrictive' && !$this->authService->hasIdentity())
            if (!$this->authService->hasIdentity())
                $result = self::AUTH_REQUIRED;
            else
                $result = self::ACCESS_DENIED;

        // permit access to this page.
        return $result;
    }
}