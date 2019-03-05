import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  WARD_GET_LIST,
  WARD_ADD_ITEM,
  WARD_UPDATE_ITEM,
  WARD_DELETE_ITEM 
} from "../../../../constants/actionTypes";

import {
  toggleWardModal,
  getWardListSuccess,
  getWardListError,
  addWardItemSuccess,
  addWardItemError,
  updateWardItemSuccess,
  updateWardItemError,
  deleteWardItemSuccess,
  deleteWardItemError,
  getWardList,
} from "./actions";

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate

function validateWard(errors) {
  if (errors.name && errors.name.wardExists) {
    return stopSubmit('ward_action_form', {
      name: 'ward.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.wardExists) {
    return stopSubmit('ward_action_form', {
      name_en: 'ward.validate-nameEn-exists'
    });
  }
}

//list ward

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getWardListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getWardListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getWardListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getWardListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getWardListError(response.message));
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
    yield put(getWardListError(error));
  }
}

//add ward

function addWardApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward/add`,
    headers: authHeader(),
    data: item
  });
}

const addWardItemRequest = async item => {
  return await addWardApi(item).then(res => res.data).catch(err => err)
};

function* addWardItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('ward_action_form'));
  try {
    const response = yield call(addWardItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addWardItemSuccess());
        yield put(getWardList(null, messages));
        yield put(toggleWardModal());
        createNotification({
          type: 'success', 
          message: messages['ward.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addWardItemError(response.message));
        yield put(validateWard(response.data));
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
    yield put(addWardItemError(error));
  }
}

//update ward

function updateWardApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateWardItemRequest = async item => {
  return await updateWardApi(item).then(res => res.data).catch(err => err)
};

function* updateWardItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('ward_action_form'));
  try {
    const response = yield call(updateWardItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateWardItemSuccess());
        yield put(getWardList(null, messages));
        yield put(toggleWardModal());
        createNotification({
          type: 'success', 
          message: messages['ward.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateWardItemError(response.message));
        yield put(validateWard(response.data));
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
    yield put(updateWardItemError(error));
  }
}

//delete ward

function deleteWardApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteWardItemRequest = async id => {
  return await deleteWardApi(id).then(res => res.data).catch(err => err)
};

function* deleteWardItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteWardItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteWardItemSuccess());
        yield put(getWardList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['ward.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteWardItemError(response.message));
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
    yield put(deleteWardItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(WARD_GET_LIST, getWardListItems);
}

export function* wathcAddItem() {
  yield takeEvery(WARD_ADD_ITEM, addWardItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(WARD_UPDATE_ITEM, updateWardItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(WARD_DELETE_ITEM, deleteWardItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem)]);
}
