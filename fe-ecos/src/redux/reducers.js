import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import address from './master-data/address/reducers';
import hub from './master-data/hub/reducer';
import branch from './master-data/branch/reducer';
import users from './users/reducers';
import carrier from './master-data/service-shipment/carrier/reducer';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
  authUser,
  status,
  address,
  users,
  carrier
  hub,
  branch
});

export default reducers;