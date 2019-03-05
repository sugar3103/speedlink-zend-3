import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  CARRIER_GET_LIST,
  CARRIER_ADD_ITEM,
  CARRIER_UPDATE_ITEM,
  CARRIER_DELETE_ITEM ,
  CARRIER_CODE_GET_LIST
} from "../../../../constants/actionTypes";

import {
  toggleCarrierModal,
  getCarrierListSuccess,
  getCarrierListError,
  addCarrierItemSuccess,
  addCarrierItemError,
  updateCarrierItemSuccess,
  updateCarrierItemError,
  deleteCarrierItemSuccess,
  deleteCarrierItemError,
  getCarrierList,
  getCarrierCodeList,
  getCarrierCodeListSuccess,
  getCarrierCodeListError,
} from "./actions";

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate
function validateCarrier(errors) {
  if (errors.name && errors.name.carrierExists) {
    return stopSubmit('carrier_action_form', {
      name: 'carrier.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.carrierExists) {
    return stopSubmit('carrier_action_form', {
      name_en: 'carrier.validate-nameEn-exists'
    });
  }

  if (errors.code && errors.code.carrierExists) {
    return stopSubmit('carrier_action_form', {
      code: 'carrier.validate-code-exists'
    });
  }
}

//list carrier
function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCarrierListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getCarrierListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCarrierListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCarrierListError(response.message));
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
    yield put(getCarrierListError(error));
  }
}

//list carrier code
function getCodeListApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier/code`,
    headers: authHeader()
  });
}

const getCarrierCodeListRequest = async () => {
  return await getCodeListApi().then(res => res.data).catch(err => err)
};

function* getCarrierCodeListItems() {
  try {
    const response = yield call(getCarrierCodeListRequest);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierCodeListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCarrierCodeListError(response.data));
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getCarrierCodeListError(error));
  }
}

//add carrier
function addCarrierApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier/add`,
    headers: authHeader(),
    data: item
  });
}

const addCarrierItemRequest = async item => {
  return await addCarrierApi(item).then(res => res.data).catch(err => err)
};

function* addCarrierItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('carrier_action_form'));
  try {
    const response = yield call(addCarrierItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addCarrierItemSuccess());
        yield put(getCarrierList(null, messages));
        yield put(getCarrierCodeList());
        yield put(toggleCarrierModal());
        createNotification({
          type: 'success',
          message: messages['carrier.add-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addCarrierItemError(response.data));
        yield put(validateCarrier(response.data));
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
    yield put(addCarrierItemError(error));
  }
}

//update carrier
function updateCarrierApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateCarrierItemRequest = async item => {
  return await updateCarrierApi(item).then(res => res.data).catch(err => err)
};

function* updateCarrierItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('carrier_action_form'));
  try {
    const response = yield call(updateCarrierItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateCarrierItemSuccess());
        yield put(getCarrierList(null, messages));
        yield put(getCarrierCodeList());
        yield put(toggleCarrierModal());
        createNotification({
          type: 'success',
          message: messages['carrier.update-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateCarrierItemError(response.message));
        yield put(validateCarrier(response.data));
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
    yield put(updateCarrierItemError(error));
  }
}

//delete carrier
function deleteCarrierApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier/delete`,
    headers: authHeader(),
    data: {  ids: id }
  });
}

const deleteCarrierItemRequest = async id => {
  return await deleteCarrierApi(id).then(res => res.data).catch(err => err)
};

function* deleteCarrierItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteCarrierItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteCarrierItemSuccess());
        yield put(getCarrierList(null, messages));
        createNotification({
          type: 'success',
          message: messages['carrier.delete-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteCarrierItemError(response.data));
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
    yield put(deleteCarrierItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CARRIER_GET_LIST, getCarrierListItems);
}

export function* watchGetListCode() {
  yield takeEvery(CARRIER_CODE_GET_LIST, getCarrierCodeListItems);
}

export function* watchAddItem() {
  yield takeEvery(CARRIER_ADD_ITEM, addCarrierItem);
}

export function* watchUpdateItem() {
  yield takeEvery(CARRIER_UPDATE_ITEM, updateCarrierItem);
}

export function* watchDeleteItem() {
  yield takeEvery(CARRIER_DELETE_ITEM, deleteCarrierItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetListCode), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}