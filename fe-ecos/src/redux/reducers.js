import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import address from './master-data/address/reducers';
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
});

export default reducers;