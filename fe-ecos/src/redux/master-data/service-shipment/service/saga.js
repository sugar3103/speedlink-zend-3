import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  SERVICE_GET_LIST,
  SERVICE_ADD_ITEM,
  SERVICE_UPDATE_ITEM,
  SERVICE_DELETE_ITEM ,
  SERVICE_CODE_GET_LIST
} from "../../../../constants/actionTypes";

import {
  toggleServiceModal,
  getServiceListSuccess,
  getServiceListError,
  addServiceItemSuccess,
  addServiceItemError,
  updateServiceItemSuccess,
  updateServiceItemError,
  deleteServiceItemSuccess,
  deleteServiceItemError,
  getServiceList,
  getServiceCodeList,
  getServiceCodeListSuccess,
  getServiceCodeListError,
} from "./actions";

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate
function validateService(errors) {
  if (errors.name && errors.name.serviceExists) {
    return stopSubmit('service_action_form', {
      name: 'service.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.serviceExists) {
    return stopSubmit('service_action_form', {
      name_en: 'service.validate-nameEn-exists'
    });
  }
}

//list service
function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getServiceListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getServiceListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getServiceListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getServiceListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getServiceListError(response.message));
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
    yield put(getServiceListError(error));
  }
}

//list service code
function getCodeListApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service/code`,
    headers: authHeader()
  });
}

const getServiceCodeListRequest = async () => {
  return await getCodeListApi().then(res => res.data).catch(err => err)
};

function* getServiceCodeListItems() {
  try {
    const response = yield call(getServiceCodeListRequest);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getServiceCodeListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getServiceCodeListError(response.message));
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getServiceCodeListError(error));
  }
}

//add service
function addServiceApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service/add`,
    headers: authHeader(),
    data: item
  });
}

const addServiceItemRequest = async item => {
  return await addServiceApi(item).then(res => res.data).catch(err => err)
};

function* addServiceItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('service_action_form'));
  try {
    const response = yield call(addServiceItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addServiceItemSuccess());
        yield put(getServiceList(null, messages));
        yield put(getServiceCodeList());
        yield put(toggleServiceModal());
        createNotification({
          type: 'success',
          message: messages['service.add-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addServiceItemError(response.message));
        yield put(validateService(response.data));
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
    yield put(addServiceItemError(error));
  }
}

//update service
function updateServiceApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateServiceItemRequest = async item => {
  return await updateServiceApi(item).then(res => res.data).catch(err => err)
};

function* updateServiceItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('service_action_form'));
  try {
    const response = yield call(updateServiceItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateServiceItemSuccess());
        yield put(getServiceList(null, messages));
        yield put(getServiceCodeList());
        yield put(toggleServiceModal());
        createNotification({
          type: 'success',
          message: messages['service.update-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateServiceItemError(response.message));
        yield put(validateService(response.data));
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
    yield put(updateServiceItemError(error));
  }
}

//delete service
function deleteServiceApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service/delete`,
    headers: authHeader(),
    data: {  ids: id }
  });
}

const deleteServiceItemRequest = async id => {
  return await deleteServiceApi(id).then(res => res.data).catch(err => err)
};

function* deleteServiceItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteServiceItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteServiceItemSuccess());
        yield put(getServiceList(null, messages));
        createNotification({
          type: 'success',
          message: messages['service.delete-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteServiceItemError(response.message));
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
    yield put(deleteServiceItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(SERVICE_GET_LIST, getServiceListItems);
}

export function* watchGetListCode() {
  yield takeEvery(SERVICE_CODE_GET_LIST, getServiceCodeListItems);
}

export function* watchAddItem() {
  yield takeEvery(SERVICE_ADD_ITEM, addServiceItem);
}

export function* watchUpdateItem() {
  yield takeEvery(SERVICE_UPDATE_ITEM, updateServiceItem);
}

export function* watchDeleteItem() {
  yield takeEvery(SERVICE_DELETE_ITEM, deleteServiceItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetListCode), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}