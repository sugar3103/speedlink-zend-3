import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  ZONECODE_GET_LIST,
  ZONECODE_ADD_ITEM,
  ZONECODE_UPDATE_ITEM,
  ZONECODE_DELETE_ITEM 
} from "../../../../constants/actionTypes";

import {
  toggleZoneCodeModal,
  getZoneCodeListSuccess,
  getZoneCodeListError,
  addZoneCodeItemSuccess,
  addZoneCodeItemError,
  updateZoneCodeItemSuccess,
  updateZoneCodeItemError,
  deleteZoneCodeItemSuccess,
  deleteZoneCodeItemError,
  getZoneCodeList,
} from "./actions";

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate

function validateZoneCode(errors) {
  if (errors.name && errors.name.zonecodeExists) {
    return stopSubmit('zonecode_action_form', {
      name: 'zonecode.validate-name-exists'
    });
  }
}

//list zonecode

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zonecode`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getZoneCodeListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getZoneCodeListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getZoneCodeListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getZoneCodeListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getZoneCodeListError(response.data));
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
    yield put(getZoneCodeListError(error));
  }
}

//add zonecode

function addZoneCodeApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zonecode/add`,
    headers: authHeader(),
    data: item
  });
}

const addZoneCodeItemRequest = async item => {
  return await addZoneCodeApi(item).then(res => res.data).catch(err => err)
};

function* addZoneCodeItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('zonecode_action_form'));
  try {
    const response = yield call(addZoneCodeItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addZoneCodeItemSuccess());
        yield put(getZoneCodeList(null, messages));
        yield put(toggleZoneCodeModal());
        createNotification({
          type: 'success', 
          message: messages['zonecode.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addZoneCodeItemError(response.data));
        yield put(validateZoneCode(response.data));
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
    yield put(addZoneCodeItemError(error));
  }
}

//update zonecode

function updateZoneCodeApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zonecode/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateZoneCodeItemRequest = async item => {
  return await updateZoneCodeApi(item).then(res => res.data).catch(err => err)
};

function* updateZoneCodeItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('zonecode_action_form'));
  try {
    const response = yield call(updateZoneCodeItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateZoneCodeItemSuccess());
        yield put(getZoneCodeList(null, messages));
        yield put(toggleZoneCodeModal());
        createNotification({
          type: 'success', 
          message: messages['zonecode.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateZoneCodeItemError(response.data));
        yield put(validateZoneCode(response.data));
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
    yield put(updateZoneCodeItemError(error));
  }
}

//delete zonecode

function deleteZoneCodeApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zonecode/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteZoneCodeItemRequest = async id => {
  return await deleteZoneCodeApi(id).then(res => res.data).catch(err => err)
};

function* deleteZoneCodeItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteZoneCodeItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteZoneCodeItemSuccess());
        yield put(getZoneCodeList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['zonecode.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteZoneCodeItemError(response.data));
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
    yield put(deleteZoneCodeItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ZONECODE_GET_LIST, getZoneCodeListItems);
}

export function* watchAddItem() {
  yield takeEvery(ZONECODE_ADD_ITEM, addZoneCodeItem);
}

export function* watchUpdateItem() {
  yield takeEvery(ZONECODE_UPDATE_ITEM, updateZoneCodeItem);
}

export function* watchDeleteItem() {
  yield takeEvery(ZONECODE_DELETE_ITEM, deleteZoneCodeItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}
