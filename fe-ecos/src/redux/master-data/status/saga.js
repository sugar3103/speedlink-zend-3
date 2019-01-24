import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  STATUS_GET_LIST,
  STATUS_ADD_ITEM,
  STATUS_UPDATE_ITEM,
  STATUS_DELETE_ITEM 
} from "../../../constants/actionTypes";

import {
  toggleStatusModal,
  getStatusListSuccess,
  getStatusListError,
  addStatusItemSuccess,
  addStatusItemError,
  updateStatusItemSuccess,
  updateStatusItemError,
  deleteStatusItemSuccess,
  deleteStatusItemError,
  getStatusList,
} from "./actions";

import createNotification from '../../../util/notifications';

//list status

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}status`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getStatusListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getStatusListItems({ payload }) {
  try {
    const response = yield call(getStatusListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getStatusListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getStatusListError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({type: 'warning', message: 'login.login-again'});
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getStatusListError(error));
  }
}

//add status

function addStatusApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}status/add`,
    headers: authHeader(),
    data: item
  });
}

const addStatusItemRequest = async item => {
  return await addStatusApi(item).then(res => res.data).catch(err => err)
};

function* addStatusItem({ payload }) {
  try {
    const response = yield call(addStatusItemRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addStatusItemSuccess());
        yield put(getStatusList());
        yield put(toggleStatusModal());
        createNotification({type: 'success', message: 'status.add-success'});
        break;

      case EC_FAILURE:
        yield put(addStatusItemError(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({type: 'warning', message: 'login.login-again'});
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addStatusItemError(error));
  }
}

//update status

function updateStatusApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}status/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateStatusItemRequest = async item => {
  return await updateStatusApi(item).then(res => res.data).catch(err => err)
};

function* updateStatusItem({ payload }) {
  try {
    const response = yield call(updateStatusItemRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateStatusItemSuccess());
        yield put(getStatusList());
        yield put(toggleStatusModal());
        createNotification({type: 'success', message: 'status.update-success'});
        break;

      case EC_FAILURE:
        yield put(updateStatusItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({type: 'warning', message: 'login.login-again'});
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateStatusItemError(error));
  }
}

//delete status

function deleteStatusApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}status/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteStatusItemRequest = async id => {
  return await deleteStatusApi(id).then(res => res.data).catch(err => err)
};

function* deleteStatusItem({ payload }) {
  try {
    const response = yield call(deleteStatusItemRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteStatusItemSuccess());
        yield put(getStatusList());
        createNotification({type: 'success', message: 'status.delete-success'});
        break;

      case EC_FAILURE:
        yield put(deleteStatusItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({type: 'warning', message: 'login.login-again'});
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(deleteStatusItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(STATUS_GET_LIST, getStatusListItems);
}

export function* wathcAddItem() {
  yield takeEvery(STATUS_ADD_ITEM, addStatusItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(STATUS_UPDATE_ITEM, updateStatusItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(STATUS_DELETE_ITEM, deleteStatusItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem)]);
}
