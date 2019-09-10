import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import customer from './master-data/customer/reducer';
import address from './master-data/address/reducers';
import hub from './master-data/hub/reducer';
import branch from './master-data/branch/reducer';
import users from './system/users/reducers';
import carrier from './master-data/service-shipment/carrier/reducer';
import service from './master-data/service-shipment/service/reducer';
import shipment_type from './master-data/service-shipment/shipmnet-type/reducer';
import setting from './system/setting/reducer';
import system from './system/reducer';
import pricingDomestic from './pricing-domestic/reducer';
import pricingSpecial from './pricing-special/reducer';
import pricingInternational from './pricing-international/reducer';
import { LOGOUT_USER } from '../constants/actionTypes';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
  setting,
  authUser,
  status,
  customer,
  address,
  users,
  carrier,
  service,
  shipment_type,
  hub,
  branch,
  system,
  pricingDomestic,
  pricingSpecial,
  pricingInternational
});

const initialState = reducers({}, {})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
      state = initialState
  }
  return reducers(state, action);
}

export default rootReducer;