import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  BRANCH_GET_LIST,
  BRANCH_ADD_ITEM,
  BRANCH_UPDATE_ITEM,
  BRANCH_DELETE_ITEM,
  BRANCH_COUNTRY_GET_LIST,
  BRANCH_CITY_GET_LIST,
  BRANCH_DISTRICT_GET_LIST,
  BRANCH_WARD_GET_LIST,
} from "../../../constants/actionTypes";

import {
  toggleBranchModal,
  getBranchListSuccess,
  getBranchListError,
  addBranchItemSuccess,
  addBranchItemError,
  updateBranchItemSuccess,
  updateBranchItemError,
  deleteBranchItemSuccess,
  deleteBranchItemError,
  getBranchList,
  getCountryBranchListSuccess,
  getCountryBranchListError,
  getCityBranchListSuccess,
  getCityBranchListError,
  getDistrictBranchListSuccess,
  getDistrictBranchListError,
  getWardBranchListSuccess,
  getWardBranchListError,

} from "./actions";

import createNotification from '../../../util/notifications';

//list branch

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getBranchListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getBranchListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getBranchListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getBranchListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getBranchListError(response.data));
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
    yield put(getBranchListError(error));
  }
}

//add branch

function addBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch/add`,
    headers: authHeader(),
    data: item
  });
}

const addBranchItemRequest = async item => {
  return await addBranchApi(item).then(res => res.data).catch(err => err)
};

function* addBranchItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addBranchItemRequest, item);
    console.log(response);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addBranchItemSuccess());
        yield put(getBranchList(null, messages));
        yield put(toggleBranchModal());
        createNotification({
          type: 'success', 
          message: messages['branch.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addBranchItemError(response.data));
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
    yield put(addBranchItemError(error));
  }
}

//update branch

function updateBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateBranchItemRequest = async item => {
  return await updateBranchApi(item).then(res => res.data).catch(err => err)
};

function* updateBranchItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updateBranchItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateBranchItemSuccess());
        yield put(getBranchList(null, messages));
        yield put(toggleBranchModal());
        createNotification({
          type: 'success', 
          message: messages['branch.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateBranchItemError(response.data));
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
    yield put(updateBranchItemError(error));
  }
}

//delete branch

function deleteBranchApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteBranchItemRequest = async id => {
  return await deleteBranchApi(id).then(res => res.data).catch(err => err)
};

function* deleteBranchItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteBranchItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteBranchItemSuccess());
        yield put(getBranchList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['branch.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteBranchItemError(response.data));
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
    yield put(deleteBranchItemError(error));
  }
}


//list origin country

function getCountryListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCountryListRequest = async (params) => {
  return await getCountryListApi(params).then(res => res.data).catch(err => err)
};

function* getCountryBranchListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getCountryListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCountryBranchListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getCountryBranchListError(response.data));
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
    yield put(getCountryBranchListError(error));
  }
}

//list origin city

function getCityListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCityListRequest = async (params) => {
  return await getCityListApi(params).then(res => res.data).catch(err => err)
};

function* getCityBranchListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getCityListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityBranchListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getCityBranchListError(response.data));
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
    yield put(getCityBranchListError(error));
  }
}

//list origin district

function getDistrictListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDistrictListRequest = async (params) => {
  return await getDistrictListApi(params).then(res => res.data).catch(err => err)
};

function* getDistrictBranchListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getDistrictListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDistrictBranchListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getDistrictBranchListError(response.data));
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
    yield put(getDistrictBranchListError(error));
  }
}

//list origin ward

function getWardListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getWardListRequest = async (params) => {
  return await getWardListApi(params).then(res => res.data).catch(err => err)
};

function* getWardBranchListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getWardListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getWardBranchListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getWardBranchListError(response.data));
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
    yield put(getWardBranchListError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(BRANCH_GET_LIST, getBranchListItems);
}

export function* watchAddItem() {
  yield takeEvery(BRANCH_ADD_ITEM, addBranchItem);
}

export function* watchUpdateItem() {
  yield takeEvery(BRANCH_UPDATE_ITEM, updateBranchItem);
}

export function* watchDeleteItem() {
  yield takeEvery(BRANCH_DELETE_ITEM, deleteBranchItem);
}

export function* watchBranchCountryGetList() {
  yield takeEvery(BRANCH_COUNTRY_GET_LIST, getCountryBranchListItems);
}
export function* watchBranchCityGetList() {
  yield takeEvery(BRANCH_CITY_GET_LIST, getCityBranchListItems);
}
export function* watchBranchDistrictGetList() {
  yield takeEvery(BRANCH_DISTRICT_GET_LIST, getDistrictBranchListItems);
}
export function* watchBranchWardGetList() {
  yield takeEvery(BRANCH_WARD_GET_LIST, getWardBranchListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem),
    fork(watchBranchCountryGetList), fork(watchBranchCityGetList), fork(watchBranchDistrictGetList),
     fork(watchBranchWardGetList), 
  ]);
}
