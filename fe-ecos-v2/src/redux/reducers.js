import { combineReducers } from 'redux';
import menu from './menu/reducer';
import alert from './alert/reducer';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import address from './master-data/address/reducer';

const reducers = combineReducers({
  menu,
  alert,
  settings,
  authUser,
  status,
  address
});

export default reducers;