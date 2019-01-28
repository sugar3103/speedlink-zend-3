import { NotificationManager } from 'react-notifications';

export default function createNotification(noti) {
  switch (noti.type) {
    case 'info':
      NotificationManager.info(noti.message);
      break;
    case 'success':
      NotificationManager.success(noti.message, noti.title);
      break;
    case "warning":
      NotificationManager.warning(noti.message, noti.title);
      break;
    case 'error':
      NotificationManager.error(noti.message, noti.title);
      break;
    default:
      return;
  }
};