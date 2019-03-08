<?php
namespace Log\Controller;

use Core\Controller\CoreController;
use Doctrine\ODM\MongoDB\DocumentManager;
use Log\Entity\Notification;
use Core\Utils\Utils;

class NotificationController extends CoreController {
    /**
     * @var DocumentManager
     */

    private $documentManager;

    public function __construct($entityManager, $documentManager) {
        parent::__construct($entityManager);
        $this->documentManager = $documentManager;
    }

    public function indexAction()
    {
        $this->apiResponse['message'] = 'Action notification';
        // var_dump($this->tokenPayload->id);die;
        if ($this->getRequest()->isPost()) {
            $notifications = $this->documentManager->getRepository(Notification::class)->findBy(array('user_id' => $this->tokenPayload->id));            
        }

        return $this->createResponse();
    }

    
    public function addNotification($user_id,$type,$text)
    {
        $notification = new Notification();
        $notification->setUserId($user_id);
        $notification->setType($type);
        $notification->setText($text);

        $this->documentManager->persist($notification);

        $this->docuementManager->flush();
    }

    public function sendAction()
    {
     
        Utils::Broadcast('1','notification','Nofitication for Adminsjhasdjkashdkjash');
        
        $this->apiResponse['message'] = 'Action send notification';
        return $this->createResponse();
    }
}