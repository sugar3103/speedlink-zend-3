import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  PRICING_CUSTOMER_GET_LIST,
  PRICING_SALEMAN_GET_LIST,
  PRICING_CARRIER_GET_LIST,
  PRICING_GET_LIST,
  PRICING_ADD_MASTER_DATA,

} from "../../../constants/actionTypes";

import {
  pricingError,
  getCustomerPricingListSuccess,
  getSalemanPricingListSuccess,
  getCarrierPricingListSuccess,
  getPricingListSuccess,
  addPricingMasterDataItemSuccess,
} from "./actions";

import createNotification from '../../../util/notifications';

/* GET LIST CODE CONDITIONS */

function getCodeByConditionApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/codeByCondition`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCodeByConditionListRequest = async (params) => {
  return await getCodeByConditionApi(params).then(res => res.data).catch(err => err)
};

/* GET CUSTOMER PRICING LIST */

function* getCustomerPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCodeByConditionListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

/* GET SALEMAN PRICING LIST */

function* getSalemanPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCodeByConditionListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSalemanPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

/* GET CARRIER PRICING LIST */

function* getCarrierPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCodeByConditionListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

/* GET LIST PRICING */

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getPricingListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

//add pricing master data

function addPricingMasterDataApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/add`,
    headers: authHeader(),
    data: item
  });
}

const addPricingMasterDataItemRequest = async item => {
  return await addPricingMasterDataApi(item).then(res => res.data).catch(err => err)
};

function* addPricingMasterDataItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addPricingMasterDataItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addPricingMasterDataItemSuccess());
        createNotification({
          type: 'success', 
          message: messages['pricing.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingError(error));
  }
}

export function* watchCustomerPricingGetList() {
  yield takeEvery(PRICING_CUSTOMER_GET_LIST, getCustomerPricingListItems);
}
export function* watchSalemanPricingGetList() {
  yield takeEvery(PRICING_SALEMAN_GET_LIST, getSalemanPricingListItems);
}
export function* watchCarrierPricingGetList() {
  yield takeEvery(PRICING_CARRIER_GET_LIST, getCarrierPricingListItems);
}
export function* watchPricingGetList() {
  yield takeEvery(PRICING_GET_LIST, getPricingListItems);
}
export function* watchPricingAddMasterData() {
  yield takeEvery(PRICING_ADD_MASTER_DATA, addPricingMasterDataItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchCustomerPricingGetList),
    fork(watchSalemanPricingGetList),
    fork(watchCarrierPricingGetList),
    fork(watchPricingGetList),
    fork(watchPricingAddMasterData)
  ]);
}
