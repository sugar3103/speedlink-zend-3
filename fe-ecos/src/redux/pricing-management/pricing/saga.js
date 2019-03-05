import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  PRICING_COUNTRY_GET_LIST,
  PRICING_CITY_GET_LIST,
  PRICING_DISTRICT_GET_LIST,
  PRICING_WARD_GET_LIST,
  PRICING_SALEMAN_GET_LIST,
  PRICING_APPROVED_BY_GET_LIST,
  PRICING_GET_LIST,
  PRICING_ADD_MASTER_DATA,

} from "../../../constants/actionTypes";

import {
  getCountryPricingListSuccess,
  getCountryPricingListError,
  getCityPricingListSuccess,
  getCityPricingListError,
  getDistrictPricingListSuccess,
  getDistrictPricingListError,
  getWardPricingListSuccess,
  getWardPricingListError,
  getSalemanListSuccess,
  getSalemanListError,
  getApprovedByListSuccess,
  getApprovedByListError,
  getPricingListSuccess,
  getPricingListError,
  addPricingMasterDataItemSuccess,
  addPricingMasterDataItemError
} from "./actions";

import createNotification from '../../../util/notifications';

//list country

function getCountryPricingListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCountryPricingListRequest = async (params) => {
  return await getCountryPricingListApi(params).then(res => res.data).catch(err => err)
};

function* getCountryPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCountryPricingListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCountryPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCountryPricingListError(response.data));
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
    yield put(getCountryPricingListError(error));
  }
}

//list city

function getCityPricingListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCityPricingListRequest = async (params) => {
  return await getCityPricingListApi(params).then(res => res.data).catch(err => err)
};

function* getCityPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCityPricingListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCityPricingListError(response.data));
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
    yield put(getCityPricingListError(error));
  }
}

//list district

function getDistrictPricingListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDistrictPricingListRequest = async (params) => {
  return await getDistrictPricingListApi(params).then(res => res.data).catch(err => err)
};

function* getDistrictPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getDistrictPricingListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDistrictPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getDistrictPricingListError(response.data));
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
    yield put(getDistrictPricingListError(error));
  }
}

//list ward

function getWardPricingListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getWardPricingListRequest = async (params) => {
  return await getWardPricingListApi(params).then(res => res.data).catch(err => err)
};

function* getWardPricingListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getWardPricingListRequest, params);
    
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getWardPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getWardPricingListError(response.data));
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
    yield put(getWardPricingListError(error));
  }
}

//list saleman

function getUserListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getUserListRequest = async (params) => {
  return await getUserListApi(params).then(res => res.data).catch(err => err)
};

function* getSalemanListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getUserListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSalemanListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getSalemanListError(response.data));
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
    yield put(getSalemanListError(error));
  }
}

function* getApprovedByListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getUserListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getApprovedByListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getApprovedByListError(response.data));
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
    yield put(getSalemanListError(error));
  }
}


//list pricing

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
        yield put(getPricingListError(response.data));
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
    yield put(getPricingListError(error));
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
        yield put(addPricingMasterDataItemError(response.data));
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
    yield put(addPricingMasterDataItemError(error));
  }
}

export function* watchCountryPricingGetList() {
  yield takeEvery(PRICING_COUNTRY_GET_LIST, getCountryPricingListItems);
}
export function* watchCityPricingGetList() {
  yield takeEvery(PRICING_CITY_GET_LIST, getCityPricingListItems);
}
export function* watchDistrictPricingGetList() {
  yield takeEvery(PRICING_DISTRICT_GET_LIST, getDistrictPricingListItems);
}
export function* watchWardPricingGetList() {
  yield takeEvery(PRICING_WARD_GET_LIST, getWardPricingListItems);
}
export function* watchSalemanGetList() {
  yield takeEvery(PRICING_SALEMAN_GET_LIST, getSalemanListItems);
}
export function* watchApprovedByGetList() {
  yield takeEvery(PRICING_APPROVED_BY_GET_LIST, getApprovedByListItems);
}
export function* watchPricingGetList() {
  yield takeEvery(PRICING_GET_LIST, getPricingListItems);
}
export function* watchPricingAddMasterData() {
  yield takeEvery(PRICING_ADD_MASTER_DATA, addPricingMasterDataItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchCountryPricingGetList), 
    fork(watchCityPricingGetList), 
    fork(watchDistrictPricingGetList), 
    fork(watchWardPricingGetList),
    fork(watchSalemanGetList),
    fork(watchApprovedByGetList),
    fork(watchPricingGetList),
    fork(watchPricingAddMasterData)
  ]);
}
