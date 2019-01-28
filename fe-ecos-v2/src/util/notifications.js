import { NotificationManager } from 'react-notifications';

export default function createNotification(noti) {
  switch (noti.type) {
    case 'info':
      NotificationManager.info(noti.message);
      break;
    case 'success':
      NotificationManager.success(noti.message, 'Sucess');
      break;
    case "warning":
      NotificationManager.warning(noti.message, 'Warning');
      break;
    case 'error':
      NotificationManager.error(noti.message, 'Error');
      break;
    default:
      return;
  }
};