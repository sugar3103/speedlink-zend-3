import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  SHIPMENT_TYPE_GET_LIST,
  SHIPMENT_TYPE_ADD_ITEM,
  SHIPMENT_TYPE_UPDATE_ITEM,
  SHIPMENT_TYPE_DELETE_ITEM ,
  SHIPMENT_TYPE_CODE_GET_LIST,
  SHIPMENT_TYPE_GET_CODE_BY_CONDITION
} from "../../../../constants/actionTypes";

import {
  toggleShipmentTypeModal,
  getShipmentTypeListSuccess,
  getShipmentTypeListError,
  addShipmentTypeItemSuccess,
  addShipmentTypeItemError,
  updateShipmentTypeItemSuccess,
  updateShipmentTypeItemError,
  deleteShipmentTypeItemSuccess,
  deleteShipmentTypeItemError,
  getShipmentTypeList,
  getShipmentTypeCodeList,
  getShipmentTypeCodeListSuccess,
  getShipmentTypeCodeListError,
  getShipmentTypeCodeByConditionSuccess,
  getShipmentTypeCodeByConditionError
} from "./actions";

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate
function validateShipmentType(errors) {
  if (errors.name && errors.name.shipmentTypeExists) {
    return stopSubmit('shipment_type_action_form', {
      name: 'shipment_type.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.shipmentTypeExists) {
    return stopSubmit('shipment_type_action_form', {
      name_en: 'shipment_type.validate-nameEn-exists'
    });
  }
}

//list shipment_type
function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getShipmentTypeListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getShipmentTypeListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getShipmentTypeListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getShipmentTypeListError(response.data));
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
    yield put(getShipmentTypeListError(error));
  }
}

//list shipment_type code
function getCodeListApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/code`,
    headers: authHeader()
  });
}

const getShipmentTypeCodeListRequest = async () => {
  return await getCodeListApi().then(res => res.data).catch(err => err)
};

function* getShipmentTypeCodeListItems() {
  try {
    const response = yield call(getShipmentTypeCodeListRequest);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeCodeListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getShipmentTypeCodeListError(response.data));
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getShipmentTypeCodeListError(error));
  }
}

//add shipment_type
function addShipmentTypeApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/add`,
    headers: authHeader(),
    data: item
  });
}

const addShipmentTypeItemRequest = async item => {
  return await addShipmentTypeApi(item).then(res => res.data).catch(err => err)
};

function* addShipmentTypeItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('shipment_type_action_form'));
  try {
    const response = yield call(addShipmentTypeItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addShipmentTypeItemSuccess());
        yield put(getShipmentTypeList(null, messages));
        yield put(getShipmentTypeCodeList());
        yield put(toggleShipmentTypeModal());
        createNotification({
          type: 'success',
          message: messages['shipment_type.add-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addShipmentTypeItemError(response.data));
        yield put(validateShipmentType(response.data));
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
    yield put(addShipmentTypeItemError(error));
  }
}

//update shipment_type
function updateShipmentTypeApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateShipmentTypeItemRequest = async item => {
  return await updateShipmentTypeApi(item).then(res => res.data).catch(err => err)
};

function* updateShipmentTypeItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('shipment_type_action_form'));
  try {
    const response = yield call(updateShipmentTypeItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateShipmentTypeItemSuccess());
        yield put(getShipmentTypeList(null, messages));
        yield put(getShipmentTypeCodeList());
        yield put(toggleShipmentTypeModal());
        createNotification({
          type: 'success',
          message: messages['shipment_type.update-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateShipmentTypeItemError(response.data));
        yield put(validateShipmentType(response.data));
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
    yield put(updateShipmentTypeItemError(error));
  }
}

//delete shipment_type
function deleteShipmentTypeApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteShipmentTypeItemRequest = async id => {
  return await deleteShipmentTypeApi(id).then(res => res.data).catch(err => err)
};

function* deleteShipmentTypeItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteShipmentTypeItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteShipmentTypeItemSuccess());
        yield put(getShipmentTypeList(null, messages));
        createNotification({
          type: 'success',
          message: messages['shipment_type.delete-success'],
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteShipmentTypeItemError(response.data));
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
    yield put(deleteShipmentTypeItemError(error));
  }
}

//list shipment_type code
function getCodeByConditionApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/codeByCondition`,
    headers: authHeader()
  });
}

const getShipmentTypeCodeByConditionRequest = async () => {
  return await getCodeByConditionApi().then(res => res.data).catch(err => err)
};

function* getShipmentTypeCodeByCondition() {
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeCodeByConditionSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getShipmentTypeCodeByConditionError(response.data));
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getShipmentTypeCodeByConditionError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(SHIPMENT_TYPE_GET_LIST, getShipmentTypeListItems);
}

export function* watchGetListCode() {
  yield takeEvery(SHIPMENT_TYPE_CODE_GET_LIST, getShipmentTypeCodeListItems);
}

export function* watchAddItem() {
  yield takeEvery(SHIPMENT_TYPE_ADD_ITEM, addShipmentTypeItem);
}

export function* watchUpdateItem() {
  yield takeEvery(SHIPMENT_TYPE_UPDATE_ITEM, updateShipmentTypeItem);
}

export function* watchDeleteItem() {
  yield takeEvery(SHIPMENT_TYPE_DELETE_ITEM, deleteShipmentTypeItem);
}

export function* watchGetListCodeByCondition() {
  yield takeEvery(SHIPMENT_TYPE_GET_CODE_BY_CONDITION, getShipmentTypeCodeByCondition);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetListCode), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem),
     fork(watchGetListCodeByCondition)]);
}