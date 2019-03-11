import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  HUB_GET_LIST,
  HUB_ADD_ITEM,
  HUB_UPDATE_ITEM,
  HUB_DELETE_ITEM,
  HUB_COUNTRY_GET_LIST,
  HUB_CITY_GET_LIST,
} from "../../../constants/actionTypes";

import {
  toggleHubModal,
  getHubListSuccess,
  getHubListError,
  addHubItemSuccess,
  addHubItemError,
  updateHubItemSuccess,
  updateHubItemError,
  deleteHubItemSuccess,
  deleteHubItemError,
  getHubList,
  getCountryHubListSuccess,
  getCountryHubListError,
  getCityHubListSuccess,
  getCityHubListError,

} from "./actions";

import createNotification from '../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

function validateHub(errors) {
  if (errors.name && errors.name.hubExists) {
    return stopSubmit('hub_action_form', {
      name: 'hub.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.hubExists) {
    return stopSubmit('hub_action_form', {
      name_en: 'hub.validate-nameEn-exists'
    });
  }
  if (errors.code && errors.code.hubExists) {
    return stopSubmit('hub_action_form', {
      code: 'hub.validate-code-exists'
    });
  }
}

//list hub

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}hub`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getHubListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getHubListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getHubListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getHubListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getHubListError(response.message));
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
    yield put(getHubListError(error));
  }
}

//add hub

function addHubApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}hub/add`,
    headers: authHeader(),
    data: item
  });
}

const addHubItemRequest = async item => {
  return await addHubApi(item).then(res => res.data).catch(err => err)
};

function* addHubItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('hub_action_form'));
  try {
    const response = yield call(addHubItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addHubItemSuccess());
        yield put(getHubList(null, messages));
        yield put(toggleHubModal());
        createNotification({
          type: 'success', 
          message: messages['hub.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addHubItemError(response.data));
        yield put(validateHub(response.data));
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
    yield put(addHubItemError(error));
  }
}

//update hub

function updateHubApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}hub/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateHubItemRequest = async item => {
  return await updateHubApi(item).then(res => res.data).catch(err => err)
};

function* updateHubItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('hub_action_form'));
  try {
    const response = yield call(updateHubItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateHubItemSuccess());
        yield put(getHubList(null, messages));
        yield put(toggleHubModal());
        createNotification({
          type: 'success', 
          message: messages['hub.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateHubItemError(response.data));
        yield put(validateHub(response.data));
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
    yield put(updateHubItemError(error));
  }
}

//delete hub

function deleteHubApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}hub/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteHubItemRequest = async ids => {
  return await deleteHubApi(ids).then(res => res.data).catch(err => err)
};

function* deleteHubItem({ payload }) {
  const { ids, messages } = payload;
  try {
    const response = yield call(deleteHubItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteHubItemSuccess());
        yield put(getHubList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['hub.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteHubItemError(response.data));
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
    yield put(deleteHubItemError(error));
  }
}


function getCountryHubListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCountryHubListRequest = async (params) => {
  return await getCountryHubListApi(params).then(res => res.data).catch(err => err)
};

function* getCountryHubListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getCountryHubListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCountryHubListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getCountryHubListError(response.data));
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
    yield put(getCountryHubListError(error));
  }
}

function getCityHubListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCityHubListRequest = async (params) => {
  return await getCityHubListApi(params).then(res => res.data).catch(err => err)
};

function* getCityHubListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCityHubListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityHubListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCityHubListError(response.message));
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
    yield put(getCityHubListError(error));
  }
}



export function* watchGetList() {
  yield takeEvery(HUB_GET_LIST, getHubListItems);
}

export function* watchAddItem() {
  yield takeEvery(HUB_ADD_ITEM, addHubItem);
}

export function* watchUpdateItem() {
  yield takeEvery(HUB_UPDATE_ITEM, updateHubItem);
}

export function* watchDeleteItem() {
  yield takeEvery(HUB_DELETE_ITEM, deleteHubItem);
}

export function* watchCountryHubGetList() {
  yield takeEvery(HUB_COUNTRY_GET_LIST, getCountryHubListItems);
}
export function* watchCityHubGetList() {
  yield takeEvery(HUB_CITY_GET_LIST, getCityHubListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem),
    fork(watchCountryHubGetList),  fork(watchCityHubGetList)
  ]);
}
