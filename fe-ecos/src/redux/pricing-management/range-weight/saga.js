import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  RANGE_WEIGHT_GET_LIST,
  RANGE_WEIGHT_ADD_ITEM,
  RANGE_WEIGHT_UPDATE_ITEM,
  RANGE_WEIGHT_DELETE_ITEM,
  SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
  CARRIER_GET_CODE_BY_CONDITION,
  SERVICE_GET_CODE_BY_CONDITION
} from "../../../constants/actionTypes";

import {
  toggleRangeWeightModal,
  getRangeWeightListSuccess,
  getRangeWeightListError,
  addRangeWeightItemSuccess,
  addRangeWeightItemError,
  updateRangeWeightItemSuccess,
  updateRangeWeightItemError,
  deleteRangeWeightItemSuccess,
  deleteRangeWeightItemError,
  getRangeWeightList,
  getShipmentTypeCodeByConditionSuccess,
  getShipmentTypeCodeByConditionError,
  getCarrierCodeByConditionSuccess,
  getCarrierCodeByConditionError,
  getServiceCodeByConditionSuccess,
  getServiceCodeByConditionError
} from "./actions";

import createNotification from '../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate

function validateRangeWeight(errors) {
  if (errors.code && errors.code.rangeweightExists) {
    return stopSubmit('range_weight_action_form', {
      code: 'range_weight.validate-code-exists'
    });
  }
}

//list rangeweight

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRangeWeightListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getRangeWeightListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRangeWeightListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getRangeWeightListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getRangeWeightListError(error));
  }
}

//add rangeweight

function addRangeWeightApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight/add`,
    headers: authHeader(),
    data: item
  });
}

const addRangeWeightItemRequest = async item => {
  return await addRangeWeightApi(item).then(res => res.data).catch(err => err)
};

function* addRangeWeightItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_action_form'));
  try {
    const response = yield call(addRangeWeightItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRangeWeightItemSuccess());
        yield put(getRangeWeightList());
        yield put(toggleRangeWeightModal());
        createNotification({ type: 'success', message: 'range_weight.add-success' });
        break;

      case EC_FAILURE:
        yield put(addRangeWeightItemError(response.data));
        yield put(validateRangeWeight(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addRangeWeightItemError(error));
  }
}

//update rangeweight

function updateRangeWeightApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateRangeWeightItemRequest = async item => {
  return await updateRangeWeightApi(item).then(res => res.data).catch(err => err)
};

function* updateRangeWeightItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_action_form'));
  try {
    const response = yield call(updateRangeWeightItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRangeWeightItemSuccess());
        yield put(getRangeWeightList());
        yield put(toggleRangeWeightModal());
        createNotification({ type: 'success', message: 'range_weight.update-success' });
        break;

      case EC_FAILURE:
        yield put(updateRangeWeightItemError(response.data));
        yield put(validateRangeWeight(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateRangeWeightItemError(error));
  }
}

//delete rangeweight

function deleteRangeWeightApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteRangeWeightItemRequest = async ids => {
  return await deleteRangeWeightApi(ids).then(res => res.data).catch(err => err)
};

function* deleteRangeWeightItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteRangeWeightItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteRangeWeightItemSuccess());
        yield put(getRangeWeightList());
        createNotification({ type: 'success', message: 'range_weight.delete-success'});
        break;

      case EC_FAILURE:
        yield put(deleteRangeWeightItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(deleteRangeWeightItemError(error));
  }
}

//list shipment_type code
function getCodeByConditionApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/codeByCondition`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getShipmentTypeCodeByConditionRequest = async (params) => {
  return await getCodeByConditionApi(params).then(res => res.data).catch(err => err)
};

function* getShipmentTypeCodeByCondition({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeCodeByConditionSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getShipmentTypeCodeByConditionError(response.data));
        break;
      
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getShipmentTypeCodeByConditionError(error));
  }
}

function* getCarrierCodeByCondition({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierCodeByConditionSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCarrierCodeByConditionError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getCarrierCodeByConditionError(error));
  }
}

function* getServiceCodeByCondition({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getServiceCodeByConditionSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getServiceCodeByConditionError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;

      default:
        break;
    }

  } catch (error) {
    yield put(getServiceCodeByConditionError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(RANGE_WEIGHT_GET_LIST, getRangeWeightListItems);
}

export function* watchAddItem() {
  yield takeEvery(RANGE_WEIGHT_ADD_ITEM, addRangeWeightItem);
}

export function* watchUpdateItem() {
  yield takeEvery(RANGE_WEIGHT_UPDATE_ITEM, updateRangeWeightItem);
}

export function* watchDeleteItem() {
  yield takeEvery(RANGE_WEIGHT_DELETE_ITEM, deleteRangeWeightItem);
}

export function* watchGetListCodeByCondition() {
  yield takeEvery(SHIPMENT_TYPE_GET_CODE_BY_CONDITION, getShipmentTypeCodeByCondition);
}

export function* watchGetListCarrierCodeByCondition() {
  yield takeEvery(CARRIER_GET_CODE_BY_CONDITION, getCarrierCodeByCondition);
}
export function* watchGetListServiceCodeByCondition() {
  yield takeEvery(SERVICE_GET_CODE_BY_CONDITION, getServiceCodeByCondition);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem),
    fork(watchGetListCodeByCondition),
    fork(watchGetListCarrierCodeByCondition),
    fork(watchGetListServiceCodeByCondition)]);
}
