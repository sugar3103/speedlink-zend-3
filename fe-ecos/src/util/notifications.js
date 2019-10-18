import { NotificationManager } from 'react-notifications';
import AppLocale from '../lang';

export default function createNotification(noti) {
  const locale = localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage') : 'en';
  const currentAppLocale = AppLocale[locale]; 
  const { messages } = currentAppLocale;
  const message = messages[noti.message];
  
  switch (noti.type) {
    case 'info':
      NotificationManager.info(message);
      break;
    case 'success':
      NotificationManager.success(message, messages['notification.success']);
      break;
    case "warning":
      NotificationManager.warning(message, messages['notification.warning']);
      break;
    case 'error':
      NotificationManager.error(message, messages['notification.error']);
      break;
    default:
      return;
  }
};