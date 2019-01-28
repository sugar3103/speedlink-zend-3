import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';

import {
  ADDRESS_GET_LIST,
  COUNTRY_GET_LIST,
  CITY_GET_LIST,
  CITY_GET_LIST_SELECT,
  WARD_GET_LIST_SELECT,
  DISTRICT_GET_LIST_SELECT,
  COUNTRY_GET_LIST_SELECT,
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

  getCityListSelectSuccess,
  getCityListSelectError,

  getDistrictListSuccess,
  getDistrictListError,

  getDistrictListSelectSuccess,
  getDistrictListSelectError,

  getWardListSuccess,
  getWardListError,

  getWardListSelectSuccess,
  getWardListSelectError,

  getCountryListSelectSuccess,
  getCountryListSelectError,

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

//City Select
function getCitySelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/city/list`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCitySelectListRequest = async (params) => {
  return await getCitySelectListApi(params).then(res => res.data).catch(err => err)
};

function* getCitySelectListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getCitySelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityListSelectSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCityListSelectError(response.message));
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
    yield put(getCityListSelectError(error));
  }
}

export function* watchCityGetListSelect() {
  yield takeEvery(CITY_GET_LIST_SELECT, getCitySelectListItems);
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

//District Select
function getDistrictSelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/district/list`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDistrictSelectListRequest = async (params) => {
  return await getDistrictSelectListApi(params).then(res => res.data).catch(err => err)
};

function* getDistrictSelectListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getDistrictSelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDistrictListSelectSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getDistrictListSelectError(response.message));
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
    yield put(getDistrictListSelectError(error));
  }
}

export function* watchDistrictGetListSelect() {
  yield takeEvery(DISTRICT_GET_LIST_SELECT, getDistrictSelectListItems);
}


//Ward
function getWardListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/ward/list`,
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

//Ward Select
function getWardSelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/ward/list`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getWardSelectListRequest = async (params) => {
  return await getWardSelectListApi(params).then(res => res.data).catch(err => err)
};

function* getWardSelectListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getWardSelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getWardListSelectSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getWardListSelectError(response.message));
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
    yield put(getWardListSelectError(error));
  }
}

export function* watchWardGetListSelect() {
  yield takeEvery(WARD_GET_LIST_SELECT, getWardSelectListItems);
}

//Country Select
function getCountrySelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address/country/list`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCountrySelectListRequest = async (params) => {
  return await getCountrySelectListApi(params).then(res => res.data).catch(err => err)
};

function* getCountrySelectListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getCountrySelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCountryListSelectSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCountryListSelectError(response.message));
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
    yield put(getCountryListSelectError(error));
  }
}

export function* watchCountryGetListSelect() {
  yield takeEvery(COUNTRY_GET_LIST_SELECT, getCountrySelectListItems);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchCountryGetList),
    fork(watchAddCountryItem),
    fork(watchUpdateCountryItem),
    fork(watchCityGetList),
    fork(watchCityGetListSelect),
    fork(watchDistrictGetList),
    fork(watchDistrictGetListSelect),
    fork(watchWardGetList),
    fork(watchWardGetListSelect),
    fork(watchCountryGetListSelect)
  ]);
}
