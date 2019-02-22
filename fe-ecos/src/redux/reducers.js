import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import address from './master-data/address/reducers';
import hub from './master-data/hub/reducer';
import branch from './master-data/branch/reducer';
import users from './system/users/reducers';
import rangeWeight from './pricing-management/range-weight/reducer';
import zoneCode from './pricing-management/zone-code/reducer';
import customer from './pricing-management/customer/reducer';
import carrier from './master-data/service-shipment/carrier/reducer';
import service from './master-data/service-shipment/service/reducer';
import shipment_type from './master-data/service-shipment/shipmnet-type/reducer';
import setting from './system/setting/reducer';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
  setting,
  authUser,
  status,
  address,
  users,
  carrier,
  service,
  shipment_type,
  hub,
  branch,
  rangeWeight,
  zoneCode,
  customer
});

export default reducers;