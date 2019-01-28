import { combineReducers } from 'redux';
import menu from './menu/reducer';
import alert from './alert/reducer';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import address from './master-data/address/reducer';
import hub from './master-data/hub/reducer';
import branch from './master-data/branch/reducer';

const reducers = combineReducers({
  menu,
  alert,
  settings,
  authUser,
  status,
  address,
  hub,
  branch
});

export default reducers;