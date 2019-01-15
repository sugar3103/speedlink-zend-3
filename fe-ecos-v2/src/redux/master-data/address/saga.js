import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';

import {
  ADDRESS_GET_LIST,
  COUNTRY_GET_LIST,
  CITY_GET_LIST,
  DISTRICT_GET_LIST,
  WARD_GET_LIST,
  COUNTRY_ADD_ITEM,
  COUNTRY_UPDATE_ITEM
} from "../../../constants/actionTypes";

import {
  getAddressListSuccess,
  getAddressListError,

  toggleCountryModal,
  getCountryListSuccess,
  getCountryListError,
  addCountryItemSuccess,
  addCountryItemError,
  updateCountryItemSuccess,
  updateCountryItemError,
  getCountryList,

  getCityListSuccess,
  getCityListError,

  getDistrictListSuccess,
  getDistrictListError,

  getWardListSuccess,
  getWardListError
} from "./actions";

import { alertDanger, alertSuccess } from '../../../redux/actions';

//list address

function getAddressListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getAddressListRequest = async (params) => {
  return await getAddressListApi(params).then(res => res.data).catch(err => err)
};

function* getAddressListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getAddressListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getAddressListSuccess(response.result));
        break;

      case EC_FAILURE:
        yield put(getAddressListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getAddressListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ADDRESS_GET_LIST, getAddressListItems);
}

//Country

//list country
function getCountryListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCountryListRequest = async (params) => {
  return await getCountryListApi(params).then(res => res.data).catch(err => err)
};

function* getCountryListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getCountryListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCountryListSuccess(response.result));
        break;

      case EC_FAILURE:
        yield put(getCountryListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getCountryListError(error));
  }
}

export function* watchCountryGetList() {
  yield takeEvery(COUNTRY_GET_LIST, getCountryListItems);
}

//add country

function addCountryApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/country/add`,
    headers: authHeader(),
    data: item
  });
}

const addCountryItemRequest = async item => {
  return await addCountryApi(item).then(res => res.data).catch(err => err)
};

function* addCountryItem({ payload }) {
  const { item, history } = payload;
  
  try {
    const response = yield call(addCountryItemRequest, item);
    
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addCountryItemSuccess(response.result));
        yield put(getCountryList(history));
        yield put(toggleCountryModal());
        yield put(alertSuccess(response.result.message));
        break;

      case EC_FAILURE:
        yield put(addCountryItemError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addCountryItemError(error));
  }
}

export function* watchAddCountryItem() {
  yield takeEvery(COUNTRY_ADD_ITEM, addCountryItem);
}

//update country

function updateCountryApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/country/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateCountryItemRequest = async item => {
  return await updateCountryApi(item).then(res => res.data).catch(err => err)
};

function* updateCountryItem({ payload }) {
  const { item, history } = payload;
  try {
    const response = yield call(updateCountryItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateCountryItemSuccess(response.result));
        yield put(getCountryList(history));
        yield put(toggleCountryModal());
        yield put(alertSuccess(response.result.message));
        break;

      case EC_FAILURE:
        yield put(updateCountryItemError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateCountryItemError(error));
  }
}

export function* watchUpdateCountryItem() {
  yield takeEvery(COUNTRY_UPDATE_ITEM, updateCountryItem);
}

//City
function getCityListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCityListRequest = async (params) => {
  return await getCityListApi(params).then(res => res.data).catch(err => err)
};

function* getCityListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getCityListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityListSuccess(response.result));
        break;

      case EC_FAILURE:
        yield put(getCityListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getCityListError(error));
  }
}

export function* watchCityGetList() {
  yield takeEvery(CITY_GET_LIST, getCityListItems);
}

//District
function getDistrictListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDistrictListRequest = async (params) => {
  return await getDistrictListApi(params).then(res => res.data).catch(err => err)
};

function* getDistrictListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getDistrictListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDistrictListSuccess(response.result));
        break;

      case EC_FAILURE:
        yield put(getDistrictListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getDistrictListError(error));
  }
}

export function* watchDistrictGetList() {
  yield takeEvery(DISTRICT_GET_LIST, getDistrictListItems);
}


//Ward
function getWardListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getWardListRequest = async (params) => {
  return await getWardListApi(params).then(res => res.data).catch(err => err)
};

function* getWardListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getWardListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getWardListSuccess(response.result));
        break;

      case EC_FAILURE:
        yield put(getWardListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getWardListError(error));
  }
}

export function* watchWardGetList() {
  yield takeEvery(WARD_GET_LIST, getWardListItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchCountryGetList),
    fork(watchAddCountryItem),
    fork(watchUpdateCountryItem),
    fork(watchCityGetList),
    fork(watchDistrictGetList),
    fork(watchWardGetList),
  ]);
}
