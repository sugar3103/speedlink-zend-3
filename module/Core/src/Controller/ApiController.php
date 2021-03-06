<?php

namespace Core\Controller;

use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ORM\EntityManager;
use Firebase\JWT\JWT;
use OAuth\Entity\User;
use OAuth\Service\AuthManager;
use Zend\EventManager\EventManagerInterface;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\JsonModel;

class ApiController extends AbstractRestfulController
{

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var DocumentManager
     */

    private $documentManager;

    /**
     * @var Integer $httpStatusCode Define Api Response code.
     */
    public $httpStatusCode = 200;

    /**
     * @var array $apiResponse Define response for api
     */
    public $apiResponse = [];

    /**
     *
     * @var type string
     */
    public $token;

    /**
     *
     * @var type bool
     */

    public $error = false;

    /**
     *
     * @var type string
     */
    public $error_code = 1;

    /**
     *
     * @var type Object or Array
     */
    public $tokenPayload;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @var \Zend\EventManager\EventManagerInterface
     */

    public $event;

    /**
     * set Event Manager to check Authorization
     * @param \Zend\EventManager\EventManagerInterface $events
     */
    public function setEventManager(EventManagerInterface $events)
    {
        parent::setEventManager($events);
        $events->attach('dispatch', array($this, 'checkAuthorization'), 100);
    }

    public function getEvents()
    {
        return $this->event;
    }
    /**
     * This Function call from eventmanager to check authntication and token validation
     * @param type $event
     *
     */
    public function checkAuthorization($event)
    {
        $this->event = $event;
        $request = $event->getRequest();
        $response = $event->getResponse();
        $isAuthorizationRequired = $event->getRouteMatch()->getParam('isAuthorizationRequired');
        $config = $event->getApplication()->getServiceManager()->get('Config');

        $event->setParam('config', $config);

        if ($request->isOptions()) {
            $response->getHeaders()->addHeaderLine('Content-Type', 'application/json');
            $view = new JsonModel([]);
            $response->setContent($view->serialize());

            return $response;
        }
        
        if (!$isAuthorizationRequired) {
            return;
        }

        if (isset($config['ApiRequest'])) {
            $responseStatusKey = $config['ApiRequest']['responseFormat']['statusKey'];

            $jwtToken = $this->findJwtToken($request);

            if ($request->isPost()) {
                if ($jwtToken) {
                    $this->token = $jwtToken;
                    $this->decodeJwtToken();
                    if (is_object($this->tokenPayload) && !$this->checkAuthenticity()) {
                        $response->setStatusCode(200);
                        $jsonModelArr = [
                            $responseStatusKey => $config['ApiRequest']['responseFormat']['statusNokText'],
                            $config['ApiRequest']['responseFormat']['errorKey'] => -5,
                            $config['ApiRequest']['responseFormat']['dataKey'] => [],
                            $config['ApiRequest']['responseFormat']['messageKey'] => 'Your API key is wrong',
                        ];
                    } else {
                        if (!$this->accessFilter($event)) {
                            $response->setStatusCode(200);
                            $jsonModelArr = [
                                $responseStatusKey => $config['ApiRequest']['responseFormat']['statusNokText'],
                                $config['ApiRequest']['responseFormat']['errorKey'] => 0,
                                $config['ApiRequest']['responseFormat']['messageKey'] => 'ACCESS_DENIED',
                            ];
                        } else {
                            return;
                        }

                    }
                } else {
                    $response->setStatusCode(200);
                    $jsonModelArr = [
                        $responseStatusKey => $config['ApiRequest']['responseFormat']['statusNokText'],
                        $config['ApiRequest']['responseFormat']['errorKey'] => -5,
                        $config['ApiRequest']['responseFormat']['messageKey'] => $config['ApiRequest']['responseFormat']['authenticationRequireText']];
                }
            } else {
                $response->setStatusCode(200);
                $jsonModelArr = [
                    $responseStatusKey => $config['ApiRequest']['responseFormat']['statusNokText'],
                    $config['ApiRequest']['responseFormat']['errorKey'] => 405,
                    $config['ApiRequest']['responseFormat']['messageKey'] => $config['ApiRequest']['responseFormat']['methodNotAllowedKey'],
                ];
            }
        } else {
            $response->setStatusCode(400);
            $jsonModelArr = ['status' => 'NOK', 'result' => ['error' => 'Require copy this file vender\multidots\zf3-rest-api\config\restapi.global.php and paste to root config\autoload\restapi.global.php']];
        }
        
        $response->getHeaders()->addHeaderLine('Content-Type', 'application/json');
        $view = new JsonModel($jsonModelArr);
        $response->setContent($view->serialize());

        return $response;
    }

    /**
     * Check Request object have Authorization token or not
     * @param type $request
     * @return type String
     */
    public function findJwtToken($request)
    {
        $jwtToken = $request->getHeaders("Authorization") ? $request->getHeaders("Authorization")->getFieldValue() : '';

        if ($jwtToken) {
            $jwtToken = trim(trim($jwtToken, "Bearer"), " ");
            return $jwtToken;
        }

        if ($request->isGet()) {
            $jwtToken = $request->getQuery('token');
        }
        if ($request->isPost()) {
            $jwtToken = $request->getPost('token');
        }

        return $jwtToken;
    }

    /**
     * contain user information for createing JWT Token
     */
    protected function generateJwtToken($payload)
    {
        if (!is_array($payload) && !is_object($payload)) {
            $this->token = false;
            return false;
        }
        $this->tokenPayload = $payload;
        $config = $this->getEvent()->getParam('config', false);
        $cypherKey = $config['ApiRequest']['jwtAuth']['cypherKey'];
        $tokenAlgorithm = $config['ApiRequest']['jwtAuth']['tokenAlgorithm'];
        $this->token = JWT::encode($this->tokenPayload, $cypherKey, $tokenAlgorithm);
        return $this->token;
    }

    /**
     * contain encoded token for user.
     */
    protected function decodeJwtToken()
    {
        if (!$this->token) {
            $this->tokenPayload = false;
        }
        $config = $this->getEvent()->getParam('config', false);
        $cypherKey = $config['ApiRequest']['jwtAuth']['cypherKey'];
        $tokenAlgorithm = $config['ApiRequest']['jwtAuth']['tokenAlgorithm'];
        try {
            $decodeToken = JWT::decode($this->token, $cypherKey, [$tokenAlgorithm]);
            $this->tokenPayload = $decodeToken;
        } catch (\Exception $e) {
            $this->tokenPayload = $e->getMessage();
        }
    }

    /**
     * Create Response for api Assign require data for response and check is valid response or give error
     * @return \Zend\View\Model\JsonModel
     *
     */
    public function createResponse()
    {
        $config = $this->getEvent()->getParam('config', false);
        $event = $this->getEvent();
        $response = $event->getResponse();
        $errorKey = $config['ApiRequest']['responseFormat']['errorKey'];

        if (is_array($this->apiResponse)) {
            $response->setStatusCode($this->httpStatusCode);
        } else {
            $this->httpStatusCode = 500;
            $response->setStatusCode($this->httpStatusCode);
            $defaultErrorText = $config['ApiRequest']['responseFormat']['defaultErrorText'];
            $sendResponse[$errorKey] = $defaultErrorText;
        }
        $statusKey = $config['ApiRequest']['responseFormat']['statusKey'];
        if ($this->httpStatusCode == 200) {
            $sendResponse[$statusKey] = $config['ApiRequest']['responseFormat']['statusOkText'];
        } else {
            $sendResponse[$statusKey] = $config['ApiRequest']['responseFormat']['statusNokText'];
        }

        $sendResponse[$errorKey] = $this->error_code;
        $sendResponse = array_merge($sendResponse, $this->apiResponse);
        $this->errorCode();
        $sendResponse['error'] = $this->error;
        return new JsonModel($sendResponse);
    }

    private function checkAuthenticity()
    {
        $config = $this->getEvent()->getParam('config', false);
        //Find User By Token
        $user = $this->entityManager->getRepository(User::class)->find($this->tokenPayload->id);
        if ($user) {
            // Emtipy Token
            if ($this->token != $user->getLastToken()) {
                return false;
            } else {

                //Token expired
                $lastTokenAt = strtotime($user->getLastTokenCreatedAt()->format('Y-m-d H:i:s'));
                $timeNow = strtotime(date('Y-m-d H:i:s'));
                $differenceInSeconds = $timeNow - $lastTokenAt;

                if ($differenceInSeconds > $config['ApiRequest']['jwtAuth']['expired']) {
                    return false;
                } else {
                    return true;
                }
            }

        } else {
            return false;
        }

    }

    private function errorCode()
    {
        switch ($this->error_code) {
            case 0:
                $this->error = true;
                break;
            case -1:
                $this->error = true;
                break;
            default:
                $this->error = false;
                break;
        }
    }

    private function accessFilter(MvcEvent $event)
    {
        // get controller and action to which the HTTP request was dispatched.
        $controller = $event->getTarget();
        $controllerName = $event->getRouteMatch()->getParam('controller', null);
        $actionName = $event->getRouteMatch()->getParam('action', null);

        // convert dash-style action name to camel-case.
        $actionName = str_replace('-', '', lcfirst(ucwords($actionName, '-')));

        // get the instance of AuthManager service.
        $authManager = $event->getApplication()->getServiceManager()->get(AuthManager::class);

        $authManager->login($this->tokenPayload->username, $this->tokenPayload->password, $this->tokenPayload->remember_me);

        if ($authManager->filterAccess($controllerName, $actionName) == AuthManager::ACCESS_DENIED) {
            // redirect the user to the "Not Authorized" page.
            return false;
        } else {
            return true;
        }

    }
}
