import { NotificationManager } from 'react-notifications';

export default function createNotification(noti) {
  switch (noti.type) {
    case 'info':
      NotificationManager.info(noti.message);
      break;
    case 'success':
      NotificationManager.success(noti.message, 'notification.success');
      break;
    case "warning":
      NotificationManager.warning(noti.message, 'notification.warning');
      break;
    case 'error':
      NotificationManager.error(noti.message, 'notification.error');
      break;
    default:
      return;
  }
};